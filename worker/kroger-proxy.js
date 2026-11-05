// FoodBudge Kroger price server (Cloudflare Worker).
// Keeps the Kroger API secret off the phone and turns Kroger products into FoodBudge pack prices.
//
//   GET  /stores?zip=45202                 -> { stores: [{ id, name, address }] }
//   POST /prices { location, items: [...] } -> { items: { ingredientId: { p, s, d } } }
//        each item: { id, q (search words), qty, unit ('oz' or 'ct'), eachOz (weight of one, if sold by count) }
//        p = regular price for that pack, s = sale price (if on sale), d = product matched
//
// Secrets (set with `npx wrangler secret put ...`): KROGER_CLIENT_ID, KROGER_CLIENT_SECRET
// Optional variable: ALLOWED_ORIGIN (for example https://you.github.io). Defaults to any site.

const API = 'https://api.kroger.com/v1';
const STORE_BRANDS = ['kroger', 'simple truth', 'simple truth organic', 'private selection', 'smart way', 'heritage farm', 'home chef'];
const CACHE_SECONDS = 6 * 60 * 60;
let token = null; // { value, expires }

export default {
  async fetch(request, env, ctx) {
    const cors = {
      'Access-Control-Allow-Origin': env.ALLOWED_ORIGIN || '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json'
    };
    if (request.method === 'OPTIONS') return new Response(null, { headers: cors });
    const reply = (body, status) => new Response(JSON.stringify(body), { status: status || 200, headers: cors });
    try {
      const url = new URL(request.url);
      if (url.pathname === '/stores' && request.method === 'GET') {
        const zip = (url.searchParams.get('zip') || '').trim();
        if (!/^\d{5}$/.test(zip)) return reply({ error: 'Enter a 5-digit ZIP code' }, 400);
        return reply({ stores: await findStores(env, zip) });
      }
      if (url.pathname === '/prices' && request.method === 'POST') {
        const body = await request.json();
        if (!/^[A-Za-z0-9]{8}$/.test(body.location || '')) return reply({ error: 'Unknown store' }, 400);
        const items = (body.items || []).slice(0, 40).filter(validItem);
        const out = {};
        await Promise.all(items.map(async (it) => {
          const products = await searchProducts(env, ctx, body.location, it.q);
          const best = bestMatch(products, it);
          if (best) out[it.id] = best;
        }));
        return reply({ items: out });
      }
      return reply({ error: 'Not found' }, 404);
    } catch (err) {
      return reply({ error: 'Kroger prices are not available right now' }, 502);
    }
  }
};

function validItem(it) {
  return it && /^\w{1,40}$/.test(it.id) && typeof it.q === 'string' && it.q.length >= 3 && it.q.length <= 60 &&
    (it.unit === 'oz' || it.unit === 'ct') && it.qty > 0 && it.qty < 1000;
}

async function getToken(env) {
  if (token && token.expires > Date.now() + 60000) return token.value;
  const res = await fetch(API + '/connect/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + btoa(env.KROGER_CLIENT_ID + ':' + env.KROGER_CLIENT_SECRET)
    },
    body: 'grant_type=client_credentials&scope=product.compact'
  });
  if (!res.ok) throw new Error('token ' + res.status);
  const j = await res.json();
  token = { value: j.access_token, expires: Date.now() + j.expires_in * 1000 };
  return token.value;
}

async function krogerGet(env, path) {
  const res = await fetch(API + path, { headers: { Authorization: 'Bearer ' + (await getToken(env)), Accept: 'application/json' } });
  if (!res.ok) throw new Error(path + ' ' + res.status);
  return res.json();
}

async function findStores(env, zip) {
  const j = await krogerGet(env, '/locations?filter.zipCode.near=' + zip + '&filter.limit=8&filter.radiusInMiles=25');
  return (j.data || []).map((l) => ({
    id: l.locationId,
    name: l.name || l.chain,
    address: [l.address && l.address.addressLine1, l.address && l.address.city].filter(Boolean).join(', ')
  }));
}

// Product searches are cached for a few hours per store, so many phones share one lookup.
async function searchProducts(env, ctx, location, q) {
  const path = '/products?filter.term=' + encodeURIComponent(q) + '&filter.locationId=' + location + '&filter.limit=25';
  const key = new Request('https://cache.foodbudge' + path);
  const cache = caches.default;
  const hit = await cache.match(key);
  if (hit) return hit.json();
  let data = [];
  try { data = (await krogerGet(env, path)).data || []; } catch (e) { return []; }
  ctx.waitUntil(cache.put(key, new Response(JSON.stringify(data), { headers: { 'Cache-Control': 'max-age=' + CACHE_SECONDS } })));
  return data;
}

// "3 lb", "16 oz", "64 fl oz", "1/2 gal", "12 ct", "1 dozen", "each" -> { qty, unit }
export function parseSize(text) {
  const s = String(text || '').toLowerCase().replace(/(\d)\s*\/\s*(\d)/, (m, a, b) => String(a / b));
  let m;
  if ((m = s.match(/([\d.]+)\s*(lb|lbs|pound)/))) return { qty: parseFloat(m[1]) * 16, unit: 'oz' };
  if ((m = s.match(/([\d.]+)\s*(fl\.?\s*)?oz/))) return { qty: parseFloat(m[1]), unit: 'oz' };
  if ((m = s.match(/([\d.]+)\s*gal/))) return { qty: parseFloat(m[1]) * 128, unit: 'oz' };
  if ((m = s.match(/([\d.]+)\s*(qt|quart)/))) return { qty: parseFloat(m[1]) * 32, unit: 'oz' };
  if ((m = s.match(/([\d.]+)\s*(dozen|doz)/))) return { qty: parseFloat(m[1]) * 12, unit: 'ct' };
  if ((m = s.match(/([\d.]+)\s*(ct|count|pk|pack)/))) return { qty: parseFloat(m[1]), unit: 'ct' };
  if (/each|^\s*1\s*$/.test(s)) return { qty: 1, unit: 'ct' };
  return null;
}

// Pick the product that best matches the pack FoodBudge wants, and price that pack.
export function bestMatch(products, want) {
  const words = want.q.toLowerCase().split(/\s+/).filter((w) => w.length > 2 && !/^\d/.test(w));
  let best = null;
  for (const p of products || []) {
    const desc = (p.description || '').toLowerCase();
    const hits = words.filter((w) => desc.includes(w.replace(/s$/, ''))).length;
    const relevance = words.length ? hits / words.length : 1;
    if (relevance < 0.5) continue;
    const storeBrand = STORE_BRANDS.includes((p.brand || '').toLowerCase());
    for (const item of p.items || []) {
      const price = item.price || {};
      const regular = price.regular;
      if (!(regular > 0)) continue;
      const promo = price.promo > 0 && price.promo < regular ? price.promo : 0;
      // How many of this product's units make one FoodBudge pack.
      let factor = null, sizeGap = 0;
      if (item.soldBy === 'WEIGHT') {
        // Priced per lb, so any amount can be bought.
        const oz = want.unit === 'oz' ? want.qty : want.eachOz * want.qty;
        if (oz > 0) factor = oz / 16;
      } else {
        const size = parseSize(item.size);
        if (size && size.unit === want.unit) factor = want.qty / size.qty;
        else if (size && size.unit === 'oz' && want.unit === 'ct' && want.eachOz) factor = (want.eachOz * want.qty) / size.qty;
        else if (!size && want.unit === 'ct' && want.qty === 1) factor = 1;
        if (!factor || factor < 0.3 || factor > 3.5) continue;
        sizeGap = Math.abs(Math.log(factor));
      }
      if (!factor) continue;
      const score = sizeGap + (storeBrand ? 0 : 0.25) + (1 - relevance) * 1.5;
      const pack = Math.round(regular * factor * 100) / 100;
      if (!best || score < best.score - 0.05 || (Math.abs(score - best.score) <= 0.05 && pack < best.p)) {
        best = {
          score: score,
          p: pack,
          s: promo ? Math.round(promo * factor * 100) / 100 : 0,
          d: (p.description || '') + (item.size ? ', ' + item.size : '')
        };
      }
    }
  }
  if (!best) return null;
  delete best.score;
  if (!best.s) delete best.s;
  return best;
}

// Updates js/prices-data.js with current grocery prices from the U.S. Bureau of Labor
// Statistics (BLS). No key or account needed. Run it with:  node tools/update-prices.js
// A GitHub Action (.github/workflows/update-prices.yml) runs it every month.
//
// How each ingredient gets its price:
//  1. If BLS publishes a national average price for that food (eggs, ground beef, milk...),
//     the pack price comes straight from it.
//  2. Otherwise the price in js/ingredients.js (which describes BASE_MONTH) is moved by how much
//     that food group's Consumer Price Index has changed since BASE_MONTH.
// It also records how much each price changed in a year, overall food inflation (to project
// to the current month) and how each US region's food prices have moved.
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'js', 'prices-data.js');
const BASE_MONTH = '2025-12'; // month the prices in js/ingredients.js describe

// Ingredient -> [BLS average-price item code, multiplier from the BLS unit to our pack].
// BLS units: most are per lb; eggs per dozen; milk per gallon.
const MEASURED = {
  eggs: ['708111', 1],                 // dozen
  milk: ['709112', 0.5 * 1.12],        // half gallon (costs a bit more per ounce than a gallon)
  butter: ['FS1101', 1],               // 1 lb
  cheddar: ['710212', 0.5],            // 8 oz
  mozzarella: ['710212', 0.5],         // 8 oz, priced like cheddar
  groundbeef: ['703112', 1],           // 1 lb
  leanbeef: ['703113', 1.05],          // 1 lb of 96/4, a little above the lean average
  chickenbreast: ['FF1101', 3 * 0.92], // ~3 lb family pack
  chickenthigh: ['FF1101', 3 * 0.85],  // ~3 lb family pack, usually below breasts
  drumsticks: ['706212', 3],           // ~3 lb
  porkchop: ['704212', 2],             // ~2 lb
  bacon: ['704111', 0.75],             // 12 oz
  bread: ['702111', 1.25],             // 20 oz loaf
  flour: ['701111', 5],                // 5 lb
  rice: ['701312', 2],                 // 2 lb
  brownrice: ['701312', 2 * 1.12],
  spaghetti: ['701322', 1],            // 1 lb
  penne: ['701322', 1],
  elbow: ['701322', 1],
  wwpasta: ['701322', 1.15],
  sugar: ['715211', 2],                // 2 lb
  brownsugar: ['715211', 2 * 1.3],
  potato: ['712112', 5 * 0.85],        // 5 lb bag, cheaper per lb than loose
  tomato: ['712311', 0.25],            // one roma, about 4 oz
  lettuce: ['FL2101', 1.25],           // romaine hearts 3 pack
  lemon: ['711412', 0.3],              // one lemon
  lentils: ['714233', 1]               // 1 lb dry
};

// Consumer Price Index groups (U.S. city average, not seasonally adjusted).
const GROUPS = {
  SEFA: 'Cereals and cereal products', SEFB: 'Bakery products', SEFC: 'Beef', SEFD: 'Pork',
  SEFF: 'Poultry', SEFG: 'Fish and seafood', SEFH: 'Eggs', SEFJ: 'Dairy', SEFK: 'Fresh fruits',
  SEFL: 'Fresh vegetables', SEFM: 'Canned and frozen fruits and vegetables', SEFR: 'Sugar and sweets',
  SEFS: 'Fats and oils', SEFT: 'Other foods (sauces, spices, snacks)'
};
const AISLE_GROUP = {
  'Produce': 'SEFL', 'Meat & Seafood': 'SEFF', 'Dairy & Eggs': 'SEFJ', 'Bakery': 'SEFB',
  'Canned & Jarred': 'SEFT', 'Pasta, Rice & Grains': 'SEFA', 'Baking': 'SEFT',
  'Oils, Sauces & Spices': 'SEFT', 'Frozen': 'SEFM'
};
const ID_GROUP = {
  lime: 'SEFK', lemon: 'SEFK', avocado: 'SEFK',
  groundbeef: 'SEFC', leanbeef: 'SEFC', meatballs: 'SEFC',
  porkchop: 'SEFD', porkshoulder: 'SEFD', sausage: 'SEFD', italiansausage: 'SEFD', bacon: 'SEFD',
  salmon: 'SEFG', tilapia: 'SEFG', shrimp: 'SEFG', tuna: 'SEFG', eggs: 'SEFH',
  tofu: 'SEFT', pizzadough: 'SEFB', breadcrumbs: 'SEFB', nachochips: 'SEFT', tortillachips: 'SEFT',
  dicedtom: 'SEFM', crushedtom: 'SEFM', tomatopaste: 'SEFM', blackbeans: 'SEFM', kidneybeans: 'SEFM',
  chickpeas: 'SEFM', whitebeans: 'SEFM', pintobeans: 'SEFM', refried: 'SEFM', greenchiles: 'SEFM',
  coconutmilk: 'SEFM', flour: 'SEFA',
  sugar: 'SEFR', brownsugar: 'SEFR', syrup: 'SEFR', honey: 'SEFR',
  oliveoil: 'SEFS', vegoil: 'SEFS', mayo: 'SEFS', butter: 'SEFJ'
};
const REGIONS = { NE: '0100', MW: '0200', S: '0300', W: '0400' };

function loadIngredients() {
  const ctx = {};
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'js', 'ingredients.js'), 'utf8') + '\nthis.INGREDIENTS = INGREDIENTS;', ctx);
  return ctx.INGREDIENTS;
}

async function fetchSeries(ids) {
  const year = new Date().getFullYear();
  const out = {};
  for (let i = 0; i < ids.length; i += 25) { // keyless API: 25 series per request
    const res = await fetch('https://api.bls.gov/publicAPI/v1/timeseries/data/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'User-Agent': 'FoodBudge price updater' },
      body: JSON.stringify({ seriesid: ids.slice(i, i + 25), startyear: String(year - 2), endyear: String(year) })
    });
    const json = await res.json();
    if (json.status !== 'REQUEST_SUCCEEDED') throw new Error('BLS: ' + json.status + ' ' + (json.message || []).join(' '));
    for (const s of json.Results.series) {
      const m = {};
      for (const d of s.data) {
        const v = parseFloat(d.value);
        if (/^M(0[1-9]|1[0-2])$/.test(d.period) && isFinite(v)) m[d.year + '-' + d.period.slice(1)] = v;
      }
      out[s.seriesID] = m;
    }
  }
  return out;
}

function shift(month, n) {
  const [y, m] = month.split('-').map(Number);
  const d = new Date(Date.UTC(y, m - 1 + n, 1));
  return d.getUTCFullYear() + '-' + String(d.getUTCMonth() + 1).padStart(2, '0');
}
// Value for a month, or the nearest month within `reach` (BLS skips some months).
function at(series, month, reach) {
  if (!series) return null;
  for (let k = 0; k <= (reach || 1); k++) {
    if (series[shift(month, -k)] != null) return series[shift(month, -k)];
    if (k && series[shift(month, k)] != null) return series[shift(month, k)];
  }
  return null;
}
const round = (x, d) => Math.round(x * Math.pow(10, d)) / Math.pow(10, d);

async function main() {
  const ING = loadIngredients();
  const apu = [...new Set(Object.values(MEASURED).map(x => 'APU0000' + x[0]))];
  const cpi = ['CUUR0000SAF11', ...Object.keys(GROUPS).map(g => 'CUUR0000' + g), ...Object.values(REGIONS).map(r => 'CUUR' + r + 'SAF11')];
  const data = await fetchSeries(apu.concat(cpi));

  const food = data.CUUR0000SAF11;
  const month = Object.keys(food || {}).sort().pop();
  if (!month) throw new Error('No food-at-home index returned');
  const yearAgo = shift(month, -12);
  const ratio = (id, from, to) => { const a = at(data[id], from, 2), b = at(data[id], to, 2); return a && b ? b / a : null; };

  const groupSince = {}, groupYear = {};
  for (const g of Object.keys(GROUPS)) {
    groupSince[g] = ratio('CUUR0000' + g, BASE_MONTH, month) || ratio('CUUR0000SAF11', BASE_MONTH, month);
    groupYear[g] = ratio('CUUR0000' + g, yearAgo, month) || 1;
  }

  const items = {};
  let measured = 0;
  for (const id of Object.keys(ING)) {
    const g = ID_GROUP[id] || AISLE_GROUP[ING[id].aisle] || 'SEFT';
    const trended = ING[id].price * groupSince[g];
    let price = trended, change = groupYear[g] - 1, direct = 0;
    const m = MEASURED[id];
    if (m) {
      const s = data['APU0000' + m[0]];
      const now = at(s, month, 3), before = at(s, yearAgo, 2);
      const p = now != null ? now * m[1] : null;
      // Guard against a unit mix-up: ignore a measured price wildly off from the trend estimate.
      if (p && p / trended > 0.4 && p / trended < 2.5) {
        price = p; direct = 1; measured++;
        if (before) change = now / before - 1;
      } else if (p) {
        console.warn('Skipped measured price for ' + id + ': ' + p.toFixed(2) + ' vs estimate ' + trended.toFixed(2));
      }
    }
    items[id] = [round(price, 2), round(change, 3), direct];
  }

  const national = ratio('CUUR0000SAF11', BASE_MONTH, month);
  const regions = {};
  for (const [k, code] of Object.entries(REGIONS)) {
    const r = ratio('CUUR' + code + 'SAF11', BASE_MONTH, month);
    regions[k] = r ? round(r / national, 3) : 1;
  }

  const out = {
    month: month,
    generated: new Date().toISOString().slice(0, 10),
    baseMonth: BASE_MONTH,
    yearlyChange: round((ratio('CUUR0000SAF11', yearAgo, month) || 1) - 1, 4),
    groups: Object.fromEntries(Object.keys(GROUPS).map(g => [g, [GROUPS[g], round(groupYear[g] - 1, 3)]])),
    regions: regions,
    items: items
  };
  const text = '// Generated by tools/update-prices.js from U.S. Bureau of Labor Statistics data. Do not edit by hand.\n' +
    '// items: ingredient -> [pack price at a typical US supermarket, change over the past year, 1 if measured directly]\n' +
    'var PRICE_DATA = ' + JSON.stringify(out, null, 1).replace(/\n\s+(?=[\d\-\]"])/g, ' ').replace(/\[ /g, '[').replace(/ \]/g, ']') + ';\n';

  const old = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : '';
  const strip = s => s.replace(/"generated": "[^"]*",?/, '');
  if (strip(old) === strip(text)) { console.log('Prices unchanged (data for ' + month + ').'); return; }
  fs.writeFileSync(OUT, text);
  console.log('Updated prices to ' + month + ': ' + measured + ' measured, ' + (Object.keys(items).length - measured) + ' from price indexes. Food at home ' + (out.yearlyChange * 100).toFixed(1) + '% vs a year ago.');
}

main().catch(err => { console.error(err.message || err); process.exit(1); });

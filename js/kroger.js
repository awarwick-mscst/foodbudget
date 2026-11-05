// Live prices from Kroger-family stores (Kroger, Ralphs, Fred Meyer, King Soopers, Fry's, Smith's...).
// Talks to the small price server in worker/, which holds the Kroger API key.
// Off unless FOODBUDGE_CONFIG.krogerProxy is set in js/config.js.
var Kroger = (function () {
  // Better search words and typical weights for items sold one at a time.
  var SEARCH = {
    onion: 'yellow onions', redonion: ['red onion', 10], garlic: ['garlic', 2], potato: 'russet potatoes',
    sweetpotato: 'sweet potatoes', carrot: 'carrots', celery: 'celery', bellpepper: ['green bell pepper', 6],
    jalapeno: ['jalapeno peppers', 1], tomato: ['roma tomatoes', 4], lettuce: 'romaine hearts', spinach: 'baby spinach',
    broccoli: 'broccoli crowns', zucchini: ['zucchini', 8], cabbage: ['green cabbage', 40], cilantro: 'cilantro',
    greenonion: 'green onions', lime: ['limes', 2.5], lemon: ['lemons', 4], mushroom: 'white mushrooms',
    cucumber: ['cucumber', 10], avocado: ['avocado', 6], cauliflower: ['cauliflower', 32], ginger: ['ginger root', 2],
    chickenthigh: 'boneless skinless chicken thighs', chickenbreast: 'boneless skinless chicken breasts',
    drumsticks: 'chicken drumsticks', groundbeef: 'ground beef 80/20', groundturkey: 'ground turkey',
    porkchop: 'boneless pork chops', porkshoulder: 'pork shoulder roast', sausage: 'smoked sausage',
    italiansausage: 'italian sausage', leanbeef: 'ground beef 96/4', rotisserie: 'rotisserie chicken', bacon: 'bacon',
    eggs: 'large eggs', milk: '2% milk', butter: 'salted butter', cheddar: 'shredded cheddar cheese',
    mozzarella: 'shredded mozzarella cheese', parmesan: 'grated parmesan cheese', sourcream: 'sour cream',
    heavycream: 'heavy whipping cream', greekyogurt: 'plain nonfat greek yogurt', creamcheese: 'neufchatel cream cheese',
    ricotta: 'ricotta cheese', feta: 'crumbled feta', tofu: 'firm tofu', pizzadough: 'pizza dough',
    tortillas: 'flour tortillas', corntortillas: 'corn tortillas', bread: 'white sandwich bread', buns: 'hamburger buns',
    tuna: 'chunk light tuna', marinara: 'marinara sauce', crushedtom: 'crushed tomatoes', dicedtom: 'diced tomatoes',
    tomatopaste: 'tomato paste', blackbeans: 'black beans', kidneybeans: 'kidney beans', chickpeas: 'garbanzo beans',
    whitebeans: 'cannellini beans', pintobeans: 'pinto beans', greenchiles: 'diced green chiles',
    enchiladasauce: 'red enchilada sauce', alfredo: 'alfredo sauce', beefbroth: 'beef broth', refried: 'refried beans',
    chickenbroth: 'chicken broth', lsbroth: 'low sodium chicken broth', vegbroth: 'vegetable broth',
    coconutmilk: 'coconut milk', pickledjalapenos: 'jalapeno slices', tacosauce: 'taco sauce', salsa: 'salsa',
    peanutbutter: 'creamy peanut butter', pesto: 'basil pesto', rice: 'long grain white rice', spaghetti: 'spaghetti',
    penne: 'penne pasta', elbow: 'elbow macaroni', eggnoodles: 'egg noodles', ramen: 'ramen noodles',
    lentils: 'lentils', brownrice: 'brown rice', wwpasta: 'whole wheat pasta', gnocchi: 'potato gnocchi',
    proteinpasta: 'protein pasta', nachochips: 'nacho cheese tortilla chips', tortillachips: 'tortilla chips',
    breadcrumbs: 'bread crumbs', flour: 'all purpose flour', brownsugar: 'light brown sugar', sugar: 'granulated sugar',
    bakingpowder: 'baking powder', cornstarch: 'corn starch', syrup: 'pancake syrup', oliveoil: 'olive oil',
    vegoil: 'vegetable oil', soysauce: 'soy sauce', lssoy: 'less sodium soy sauce', honey: 'honey',
    ricevinegar: 'rice vinegar', bbqsauce: 'bbq sauce', sriracha: 'sriracha', dijon: 'dijon mustard', mayo: 'mayonnaise',
    tacoseasoning: 'taco seasoning', salt: 'salt', pepper: 'ground black pepper', garlicpowder: 'garlic powder',
    chilipowder: 'chili powder', cumin: 'ground cumin', paprika: 'paprika', italianseasoning: 'italian seasoning',
    curry: 'curry powder', redpepperflakes: 'crushed red pepper', salmon: 'frozen salmon fillets',
    tilapia: 'frozen tilapia fillets', shrimp: 'frozen cooked shrimp', meatballs: 'frozen meatballs',
    frozenpeas: 'frozen peas', frozencorn: 'frozen corn', greenbeans: 'frozen green beans',
    stirfryveg: 'frozen stir fry vegetables'
  };

  function base() {
    return (typeof FOODBUDGE_CONFIG !== 'undefined' && FOODBUDGE_CONFIG.krogerProxy || '').replace(/\/+$/, '');
  }
  function enabled() { return !!base(); }

  // What one pack is, from the label in js/ingredients.js: an amount in oz (weight or fluid) or a count.
  function packSize(i) {
    var l = i.label.toLowerCase(), m;
    if (/half gallon/.test(l)) return { qty: 64, unit: 'oz' };
    if (/dozen/.test(l)) return { qty: 12, unit: 'ct' };
    if ((m = l.match(/([\d.]+)\s*lb/))) return { qty: parseFloat(m[1]) * 16, unit: 'oz' };
    if ((m = l.match(/([\d.]+)\s*oz/))) return { qty: parseFloat(m[1]), unit: 'oz' };
    if ((m = l.match(/([\d.]+)\s*(count|pack)/))) return { qty: parseFloat(m[1]), unit: 'ct' };
    if (/per lb/.test(l)) return { qty: 16, unit: 'oz' };
    return { qty: 1, unit: 'ct' };
  }

  function specs() {
    return Object.keys(SEARCH).filter(function (id) { return INGREDIENTS[id]; }).map(function (id) {
      var s = SEARCH[id], size = packSize(INGREDIENTS[id]);
      return { id: id, q: typeof s === 'string' ? s : s[0], qty: size.qty, unit: size.unit, eachOz: typeof s === 'string' ? 0 : s[1] };
    });
  }

  function getJSON(url, opts) {
    return fetch(url, opts).then(function (r) {
      return r.json().then(function (j) {
        if (!r.ok) throw new Error(j.error || 'Kroger prices are not available right now');
        return j;
      });
    });
  }

  // Kroger-family stores near a ZIP code: [{id, name, address}]
  function stores(zip) {
    return getJSON(base() + '/stores?zip=' + encodeURIComponent(zip)).then(function (j) { return j.stores || []; });
  }

  // Current prices at one store: {ingredientId: {p: regular pack price, s: sale pack price, d: product}}
  function prices(locationId) {
    var all = specs(), batches = [];
    for (var i = 0; i < all.length; i += 40) batches.push(all.slice(i, i + 40));
    return Promise.all(batches.map(function (b) {
      return getJSON(base() + '/prices', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ location: locationId, items: b })
      });
    })).then(function (parts) {
      var items = {};
      parts.forEach(function (j) { Object.assign(items, j.items || {}); });
      return items;
    });
  }

  return { enabled: enabled, stores: stores, prices: prices, specs: specs, packSize: packSize };
})();

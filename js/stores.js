// Stores people can pick during setup, with a rough price level relative to a
// typical US supermarket's store brand (1.0). These are estimates, not live prices.
var COUNTRIES = {
  US: { name: 'United States', postal: 'ZIP code', example: '46204', currency: '$', note: 'Prices in US dollars' },
  CA: { name: 'Canada', postal: 'Postal code', example: 'M5V 2T6', currency: '$', note: 'Prices in Canadian dollars' },
  OTHER: { name: 'Somewhere else', postal: 'Postal code', example: '', currency: '$', note: 'Prices start from US estimates. Set your own on the grocery list.' }
};

var STORES = {
  US: [
    { id: 'aldi', name: 'Aldi', level: 0.84 },
    { id: 'walmart', name: 'Walmart', level: 0.88 },
    { id: 'lidl', name: 'Lidl', level: 0.86 },
    { id: 'winco', name: 'WinCo Foods', level: 0.85 },
    { id: 'heb', name: 'H-E-B', level: 0.93 },
    { id: 'kroger', name: 'Kroger (and Ralphs, Fred Meyer, King Soopers…)', level: 0.98 },
    { id: 'meijer', name: 'Meijer', level: 0.96 },
    { id: 'foodlion', name: 'Food Lion', level: 0.97 },
    { id: 'target', name: 'Target', level: 1.0 },
    { id: 'traderjoes', name: "Trader Joe's", level: 1.0 },
    { id: 'hyvee', name: 'Hy-Vee', level: 1.03 },
    { id: 'wegmans', name: 'Wegmans', level: 1.03 },
    { id: 'publix', name: 'Publix', level: 1.12 },
    { id: 'safeway', name: 'Safeway / Albertsons', level: 1.12 },
    { id: 'sprouts', name: 'Sprouts', level: 1.15 },
    { id: 'wholefoods', name: 'Whole Foods', level: 1.3 }
  ],
  CA: [
    { id: 'nofrills', name: 'No Frills', level: 0.88 },
    { id: 'foodbasics', name: 'Food Basics', level: 0.88 },
    { id: 'freshco', name: 'FreshCo', level: 0.89 },
    { id: 'gianttiger', name: 'Giant Tiger', level: 0.9 },
    { id: 'walmartca', name: 'Walmart', level: 0.9 },
    { id: 'maxi', name: 'Maxi', level: 0.9 },
    { id: 'superstore', name: 'Real Canadian Superstore', level: 0.94 },
    { id: 'loblaws', name: 'Loblaws', level: 1.08 },
    { id: 'metro', name: 'Metro', level: 1.08 },
    { id: 'iga', name: 'IGA', level: 1.08 },
    { id: 'sobeys', name: 'Sobeys / Safeway', level: 1.1 },
    { id: 'saveon', name: 'Save-On-Foods', level: 1.1 }
  ],
  OTHER: [
    { id: 'discount', name: 'A discount grocery store', level: 0.86 },
    { id: 'supermarket', name: 'A regular supermarket', level: 1.0 },
    { id: 'premium', name: 'A pricier or specialty store', level: 1.2 }
  ]
};
var STORE_UNSURE = { id: 'unsure', name: "Not sure / somewhere else", level: 1.0 };

// Canadian dollars per US dollar of grocery prices, before regional differences.
var CAD_FACTOR = 1.32;

// Rough cost-of-groceries adjustment by area.
function regionFactor(country, postal) {
  var p = String(postal || '').trim().toUpperCase();
  if (country === 'US') {
    var zip3 = parseInt(p.slice(0, 3), 10);
    if (isNaN(zip3)) return 1;
    if ((zip3 >= 995 && zip3 <= 999) || zip3 === 967 || zip3 === 968) return 1.3; // Alaska, Hawaii
    return [1.06, 1.07, 1.0, 0.97, 0.97, 0.98, 0.97, 0.97, 1.02, 1.08][Math.floor(zip3 / 100)];
  }
  if (country === 'CA') {
    var byLetter = { A: 1.08, B: 1.04, C: 1.04, E: 1.03, G: 0.98, H: 0.98, J: 0.98, K: 1, L: 1, M: 1, N: 1, P: 1, R: 1, S: 1, T: 1, V: 1.05, X: 1.4, Y: 1.4 };
    return CAD_FACTOR * (byLetter[p.charAt(0)] || 1);
  }
  return 1;
}

function findStore(country, id) {
  var list = STORES[country] || STORES.OTHER;
  for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
  return STORE_UNSURE;
}

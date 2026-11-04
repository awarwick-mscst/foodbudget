// Approximate carbohydrate and fiber in grams per recipe unit (see ingredients.js),
// from typical USDA values. These are estimates for planning, not medical advice.
var NUTRITION = {
  onion: [10, 2], redonion: [10, 2], garlic: [1, 0.1], potato: [79, 6], sweetpotato: [91, 14],
  carrot: [44, 13], celery: [1, 0.6], bellpepper: [7, 2.5], jalapeno: [1, 0.4], tomato: [2.4, 0.7],
  lettuce: [5, 3], spinach: [1, 0.6], broccoli: [30, 12], zucchini: [6, 2], cabbage: [52, 22],
  cilantro: [1, 1], greenonion: [7, 2.6], lime: [4, 1], lemon: [5, 1], mushroom: [1, 0.3],
  cucumber: [11, 1.5], avocado: [12, 10], ginger: [2, 0.2], cauliflower: [30, 12],

  chickenthigh: [0, 0], chickenbreast: [0, 0], drumsticks: [0, 0], groundbeef: [0, 0], groundturkey: [0, 0],
  porkchop: [0, 0], porkshoulder: [0, 0], sausage: [0.6, 0], italiansausage: [4, 0], bacon: [0.1, 0],

  eggs: [0.4, 0], milk: [12, 0], butter: [0, 0], cheddar: [1.5, 0], mozzarella: [2.5, 0], parmesan: [4, 0],
  sourcream: [7, 0], heavycream: [7, 0], pizzadough: [230, 8],

  tortillas: [25, 1.5], corntortillas: [11, 1.5], bread: [13, 1], buns: [22, 1],

  tuna: [0, 0], marinara: [2.5, 0.5], crushedtom: [56, 14], dicedtom: [17, 4], tomatopaste: [3, 0.6],
  blackbeans: [63, 23], kidneybeans: [60, 20], chickpeas: [60, 17], refried: [60, 20],
  chickenbroth: [1, 0], vegbroth: [3, 0], coconutmilk: [11, 4], salsa: [16, 4], peanutbutter: [3.5, 1], pesto: [1, 0.3],

  rice: [148, 2], spaghetti: [21, 1], penne: [21, 1], elbow: [21, 1], eggnoodles: [20, 1], ramen: [52, 2],
  lentils: [115, 21], breadcrumbs: [78, 5],

  flour: [95, 3.4], brownsugar: [13, 0], sugar: [12.5, 0], bakingpowder: [1.3, 0], cornstarch: [7, 0], syrup: [210, 0],

  oliveoil: [0, 0], vegoil: [0, 0], soysauce: [1, 0], honey: [17, 0], ricevinegar: [0, 0], bbqsauce: [128, 1],
  sriracha: [3, 0], dijon: [0.3, 0], mayo: [0, 0], tacoseasoning: [16, 2], salt: [0, 0], pepper: [1.4, 0.6],
  garlicpowder: [2.2, 0.3], chilipowder: [1.4, 0.9], cumin: [0.9, 0.2], paprika: [1.2, 0.8],
  italianseasoning: [0.6, 0.4], curry: [1.2, 1], redpepperflakes: [1, 0.5],

  salmon: [0, 0], tilapia: [0, 0], shrimp: [0, 0], meatballs: [30, 2],
  frozenpeas: [21, 7], frozencorn: [25, 3], greenbeans: [8, 3.5], stirfryveg: [10, 3]
};

// Starchy sides whose portion can shrink to bring a dinner's carbs down.
var STARCHES = ['rice', 'spaghetti', 'penne', 'elbow', 'eggnoodles', 'ramen', 'tortillas', 'corntortillas', 'bread', 'buns', 'potato', 'sweetpotato'];

// Ingredients whose carbs are mostly added sugar.
var ADDED_SUGAR = ['brownsugar', 'sugar', 'syrup', 'honey', 'bbqsauce'];

// Approximate nutrition per recipe unit (see ingredients.js), from typical USDA values:
// [calories, protein g, fat g, carbs g, fiber g, sodium mg, saturated fat g, cholesterol mg]
// These are estimates for planning, not medical advice. Salt added "to taste" isn't counted.
var NUTRITION = {
  // Produce
  onion: [44, 1.2, 0.1, 10, 2, 4, 0, 0],
  redonion: [44, 1.2, 0.1, 10, 2, 4, 0, 0],
  garlic: [4, 0.2, 0, 1, 0.1, 1, 0, 0],
  potato: [350, 9.5, 0.4, 79, 6, 27, 0.1, 0],
  sweetpotato: [390, 7, 0.2, 91, 14, 250, 0.1, 0],
  carrot: [186, 4.2, 1, 44, 13, 315, 0.2, 0],
  celery: [6, 0.3, 0.1, 1, 0.6, 32, 0, 0],
  bellpepper: [31, 1, 0.3, 7, 2.5, 5, 0, 0],
  jalapeno: [4, 0.1, 0, 1, 0.4, 0, 0, 0],
  tomato: [11, 0.5, 0.1, 2.4, 0.7, 3, 0, 0],
  lettuce: [26, 1.8, 0.4, 5, 3, 12, 0.1, 0],
  spinach: [7, 0.8, 0.1, 1, 0.6, 22, 0, 0],
  broccoli: [154, 12.8, 1.7, 30, 12, 150, 0.3, 0],
  zucchini: [34, 2.4, 0.6, 6, 2, 16, 0.2, 0],
  cabbage: [225, 11.5, 0.9, 52, 22, 160, 0.1, 0],
  cilantro: [9, 0.8, 0.2, 1, 1, 18, 0, 0],
  greenonion: [32, 1.8, 0.2, 7, 2.6, 16, 0, 0],
  lime: [11, 0.2, 0, 4, 1, 1, 0, 0],
  lemon: [12, 0.2, 0.1, 5, 1, 1, 0, 0],
  mushroom: [6, 0.9, 0.1, 1, 0.3, 1, 0, 0],
  cucumber: [45, 2, 0.3, 11, 1.5, 6, 0.1, 0],
  avocado: [240, 3, 22, 12, 10, 10, 3.2, 0],
  ginger: [8, 0.2, 0.1, 2, 0.2, 1, 0, 0],
  cauliflower: [150, 11.5, 1.7, 30, 12, 180, 0.4, 0],

  // Meat & seafood (raw weight as bought)
  chickenthigh: [545, 89, 19, 0, 0, 430, 5, 425],
  chickenbreast: [545, 102, 12, 0, 0, 330, 3, 330],
  drumsticks: [520, 58, 31, 0, 0, 300, 8.5, 330],
  groundbeef: [1040, 78, 80, 0, 0, 300, 30, 320],
  groundturkey: [750, 80, 45, 0, 0, 320, 12, 350],
  porkchop: [640, 98, 25, 0, 0, 220, 8.5, 280],
  porkshoulder: [900, 75, 65, 0, 0, 340, 23, 320],
  sausage: [90, 4, 8, 0.6, 0, 260, 2.8, 20],
  italiansausage: [1360, 64, 118, 4, 0, 3300, 42, 300],
  bacon: [43, 3, 3.3, 0.1, 0, 137, 1.1, 9],
  rotisserie: [265, 38, 12, 0, 0, 550, 3.4, 120],
  leanbeef: [520, 96, 18, 0, 0, 300, 8, 280],

  // Dairy & eggs
  eggs: [72, 6.3, 4.8, 0.4, 0, 71, 1.6, 186],
  milk: [122, 8, 4.8, 12, 0, 115, 3, 20],
  butter: [102, 0.1, 11.5, 0, 0, 91, 7.3, 31],
  cheddar: [455, 26, 37, 1.5, 0, 700, 21, 110],
  mozzarella: [340, 27, 22, 2.5, 0, 720, 13, 75],
  parmesan: [430, 29, 28, 4, 0, 1500, 17, 90],
  sourcream: [450, 5, 44, 7, 0, 80, 20, 120],
  heavycream: [810, 6.7, 86, 7, 0, 64, 55, 270],
  ricotta: [340, 28, 19, 13, 0, 300, 12, 75],
  feta: [400, 21, 32, 6, 0, 1700, 22, 135],
  tofu: [350, 40, 20, 8, 3, 40, 3, 0],
  creamcheese: [70, 2.6, 6, 1.2, 0, 100, 3.5, 20],
  pizzadough: [1200, 36, 16, 230, 8, 2200, 3, 0],

  // Bakery
  tortillas: [146, 3.9, 3.6, 25, 1.5, 330, 1.3, 0],
  corntortillas: [57, 1.5, 0.7, 11, 1.5, 10, 0.1, 0],
  bread: [75, 2.6, 1, 13, 1, 140, 0.2, 0],
  buns: [140, 4.5, 2, 22, 1, 240, 0.5, 0],

  // Canned & jarred
  tuna: [116, 26, 1, 0, 0, 300, 0.3, 45],
  marinara: [15, 0.4, 0.5, 2.5, 0.5, 110, 0.1, 0],
  crushedtom: [260, 13, 1.5, 56, 14, 1200, 0.2, 0],
  dicedtom: [80, 3.5, 0.4, 17, 4, 630, 0, 0],
  tomatopaste: [13, 0.7, 0.1, 3, 0.6, 9, 0, 0],
  blackbeans: [330, 21, 1.3, 63, 23, 900, 0.2, 0],
  kidneybeans: [320, 21, 1, 60, 20, 900, 0.2, 0],
  chickpeas: [350, 17, 5.5, 60, 17, 800, 0.6, 0],
  whitebeans: [300, 20, 0.8, 55, 14, 800, 0.2, 0],
  pintobeans: [320, 19, 1.5, 58, 17, 800, 0.3, 0],
  refried: [410, 24, 5, 60, 20, 1900, 2, 5],
  greenchiles: [20, 0.6, 0.1, 4, 2, 400, 0, 0],
  enchiladasauce: [80, 2, 3, 12, 2, 1200, 0.5, 0],
  alfredo: [46, 0.8, 4.3, 1, 0, 190, 2.7, 13],
  beefbroth: [15, 2.5, 0.5, 0.5, 0, 890, 0.2, 0],
  chickenbroth: [15, 1.5, 0.5, 1, 0, 860, 0.2, 0],
  vegbroth: [15, 0.5, 0, 3, 0, 650, 0, 0],
  coconutmilk: [790, 8, 85, 11, 4, 50, 75, 0],
  salsa: [70, 4, 0.5, 16, 4, 1800, 0, 0],
  pickledjalapenos: [3, 0.1, 0.1, 0.6, 0.3, 170, 0, 0],
  tacosauce: [5, 0.1, 0, 1, 0.2, 100, 0, 0],
  peanutbutter: [94, 3.5, 8, 3.5, 1, 70, 1.6, 0],
  pesto: [70, 1.5, 7, 1, 0.3, 150, 1.2, 3],

  // Pasta, rice & grains (dry)
  rice: [675, 13, 1.2, 148, 2, 9, 0.3, 0],
  spaghetti: [100, 3.6, 0.4, 21, 1, 1, 0.1, 0],
  penne: [100, 3.6, 0.4, 21, 1, 1, 0.1, 0],
  elbow: [100, 3.6, 0.4, 21, 1, 1, 0.1, 0],
  eggnoodles: [108, 4, 1.2, 20, 1, 6, 0.3, 15],
  ramen: [380, 8, 14, 52, 2, 1000, 6.5, 0],
  lentils: [680, 46, 2, 115, 21, 10, 0.3, 0],
  breadcrumbs: [425, 14, 5.5, 78, 5, 790, 1.2, 0],
  tortillachips: [140, 2, 7, 18, 1.5, 120, 0.8, 0],
  nachochips: [150, 2, 8, 18, 1, 210, 1, 0],
  gnocchi: [57, 1.3, 0.2, 12.5, 0.6, 150, 0, 0],
  proteinpasta: [100, 5, 0.6, 19, 2, 2, 0.1, 0],

  // Baking
  flour: [455, 13, 1.2, 95, 3.4, 2, 0.2, 0],
  brownsugar: [52, 0, 0, 13, 0, 4, 0, 0],
  sugar: [48, 0, 0, 12.5, 0, 0, 0, 0],
  bakingpowder: [2, 0, 0, 1.3, 0, 480, 0, 0],
  cornstarch: [30, 0, 0, 7, 0, 1, 0, 0],
  syrup: [840, 0, 0, 210, 0, 200, 0, 0],

  // Oils, sauces & spices
  oliveoil: [119, 0, 13.5, 0, 0, 0, 1.9, 0],
  vegoil: [120, 0, 13.6, 0, 0, 0, 1, 0],
  soysauce: [9, 1.3, 0, 1, 0, 880, 0, 0],
  honey: [64, 0.1, 0, 17, 0, 1, 0, 0],
  ricevinegar: [0, 0, 0, 0, 0, 0, 0, 0],
  bbqsauce: [480, 2, 1.5, 128, 1, 2800, 0.2, 0],
  sriracha: [15, 0.3, 0.1, 3, 0, 300, 0, 0],
  dijon: [15, 0.9, 0.8, 0.3, 0.2, 360, 0, 0],
  mayo: [94, 0.1, 10.3, 0, 0, 88, 1.6, 6],
  tacoseasoning: [85, 1.5, 1, 16, 2, 2300, 0.2, 0],
  salt: [0, 0, 0, 0, 0, 2325, 0, 0],
  pepper: [6, 0.2, 0.1, 1.4, 0.6, 0, 0, 0],
  garlicpowder: [10, 0.5, 0, 2.2, 0.3, 2, 0, 0],
  chilipowder: [8, 0.4, 0.4, 1.4, 0.9, 77, 0.1, 0],
  cumin: [8, 0.4, 0.5, 0.9, 0.2, 4, 0, 0],
  paprika: [6, 0.3, 0.3, 1.2, 0.8, 1, 0, 0],
  italianseasoning: [3, 0.1, 0.1, 0.6, 0.4, 0, 0, 0],
  curry: [7, 0.3, 0.3, 1.2, 1, 1, 0, 0],
  redpepperflakes: [6, 0.2, 0.3, 1, 0.5, 1, 0, 0],

  // Frozen
  salmon: [680, 92, 32, 0, 0, 300, 5, 250],
  tilapia: [435, 91, 7.7, 0, 0, 240, 2.6, 230],
  shrimp: [386, 91, 2.3, 0, 0, 540, 0.7, 730],
  meatballs: [1250, 60, 95, 30, 2, 2600, 36, 250],
  // Healthier swaps used by health goals
  greekyogurt: [130, 23, 0.7, 9, 0, 80, 0.2, 10],
  brownrice: [685, 14, 5.4, 143, 6.5, 13, 1.1, 0],
  wwpasta: [100, 4, 0.8, 20, 3.5, 2, 0.1, 0],
  lsbroth: [15, 1.5, 0.5, 1, 0, 140, 0.2, 0],
  lssoy: [9, 1.3, 0, 1, 0, 550, 0, 0],

  frozenpeas: [105, 7, 0.5, 21, 7, 145, 0.1, 0],
  frozencorn: [120, 4, 1.2, 25, 3, 3, 0.2, 0],
  greenbeans: [35, 2, 0.2, 8, 3.5, 3, 0, 0],
  stirfryveg: [45, 2, 0.2, 10, 3, 30, 0, 0]
};

// Starchy sides whose portion can shrink to bring a dinner's carbs down.
var STARCHES = ['rice', 'spaghetti', 'penne', 'elbow', 'eggnoodles', 'ramen', 'tortillas', 'corntortillas', 'bread', 'buns', 'potato', 'sweetpotato', 'tortillachips', 'nachochips', 'gnocchi', 'proteinpasta', 'brownrice', 'wwpasta'];

// Ingredients whose carbs are mostly added sugar.
var ADDED_SUGAR = ['brownsugar', 'sugar', 'syrup', 'honey', 'bbqsauce'];

// Ingredient changes made for each health goal. A list replaces the ingredient
// (same amount times the factor given); a number scales the ingredient's amount.
var HEALTH_SWAPS = {
  heart: {
    groundbeef: [['leanbeef', 1]], butter: [['oliveoil', 1]], sourcream: [['greekyogurt', 1]],
    cheddar: 0.6, mozzarella: 0.6, parmesan: 0.6, feta: 0.6
  },
  calories: {
    groundbeef: [['leanbeef', 1]], sourcream: [['greekyogurt', 1]], cheddar: 0.75, mozzarella: 0.75,
    oliveoil: 0.6, vegoil: 0.6, mayo: 0.5
  },
  sodium: {
    chickenbroth: [['lsbroth', 1]], beefbroth: [['lsbroth', 1]], soysauce: [['lssoy', 1]],
    tacoseasoning: [['chilipowder', 3], ['cumin', 1.5], ['garlicpowder', 1], ['paprika', 1]]
  },
  fiber: {
    rice: [['brownrice', 1]], spaghetti: [['wwpasta', 1]], penne: [['wwpasta', 1]], elbow: [['wwpasta', 1]]
  }
};

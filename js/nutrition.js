// Approximate nutrition per recipe unit (see ingredients.js), from typical USDA values:
// [calories, protein g, fat g, carbs g, fiber g, sodium mg]
// These are estimates for planning, not medical advice. Salt added "to taste" isn't counted.
var NUTRITION = {
  // Produce
  onion: [44, 1.2, 0.1, 10, 2, 4],
  redonion: [44, 1.2, 0.1, 10, 2, 4],
  garlic: [4, 0.2, 0, 1, 0.1, 1],
  potato: [350, 9.5, 0.4, 79, 6, 27],
  sweetpotato: [390, 7, 0.2, 91, 14, 250],
  carrot: [186, 4.2, 1, 44, 13, 315],
  celery: [6, 0.3, 0.1, 1, 0.6, 32],
  bellpepper: [31, 1, 0.3, 7, 2.5, 5],
  jalapeno: [4, 0.1, 0, 1, 0.4, 0],
  tomato: [11, 0.5, 0.1, 2.4, 0.7, 3],
  lettuce: [26, 1.8, 0.4, 5, 3, 12],
  spinach: [7, 0.8, 0.1, 1, 0.6, 22],
  broccoli: [154, 12.8, 1.7, 30, 12, 150],
  zucchini: [34, 2.4, 0.6, 6, 2, 16],
  cabbage: [225, 11.5, 0.9, 52, 22, 160],
  cilantro: [9, 0.8, 0.2, 1, 1, 18],
  greenonion: [32, 1.8, 0.2, 7, 2.6, 16],
  lime: [11, 0.2, 0, 4, 1, 1],
  lemon: [12, 0.2, 0.1, 5, 1, 1],
  mushroom: [6, 0.9, 0.1, 1, 0.3, 1],
  cucumber: [45, 2, 0.3, 11, 1.5, 6],
  avocado: [240, 3, 22, 12, 10, 10],
  ginger: [8, 0.2, 0.1, 2, 0.2, 1],
  cauliflower: [150, 11.5, 1.7, 30, 12, 180],

  // Meat & seafood (raw weight as bought)
  chickenthigh: [545, 89, 19, 0, 0, 430],
  chickenbreast: [545, 102, 12, 0, 0, 330],
  drumsticks: [520, 58, 31, 0, 0, 300],
  groundbeef: [1040, 78, 80, 0, 0, 300],
  groundturkey: [750, 80, 45, 0, 0, 320],
  porkchop: [640, 98, 25, 0, 0, 220],
  porkshoulder: [900, 75, 65, 0, 0, 340],
  sausage: [90, 4, 8, 0.6, 0, 260],
  italiansausage: [1360, 64, 118, 4, 0, 3300],
  bacon: [43, 3, 3.3, 0.1, 0, 137],
  rotisserie: [265, 38, 12, 0, 0, 550],
  leanbeef: [520, 96, 18, 0, 0, 300],

  // Dairy & eggs
  eggs: [72, 6.3, 4.8, 0.4, 0, 71],
  milk: [122, 8, 4.8, 12, 0, 115],
  butter: [102, 0.1, 11.5, 0, 0, 91],
  cheddar: [455, 26, 37, 1.5, 0, 700],
  mozzarella: [340, 27, 22, 2.5, 0, 720],
  parmesan: [430, 29, 28, 4, 0, 1500],
  sourcream: [450, 5, 44, 7, 0, 80],
  heavycream: [810, 6.7, 86, 7, 0, 64],
  ricotta: [340, 28, 19, 13, 0, 300],
  feta: [400, 21, 32, 6, 0, 1700],
  tofu: [350, 40, 20, 8, 3, 40],
  creamcheese: [70, 2.6, 6, 1.2, 0, 100],
  pizzadough: [1200, 36, 16, 230, 8, 2200],

  // Bakery
  tortillas: [146, 3.9, 3.6, 25, 1.5, 330],
  corntortillas: [57, 1.5, 0.7, 11, 1.5, 10],
  bread: [75, 2.6, 1, 13, 1, 140],
  buns: [140, 4.5, 2, 22, 1, 240],

  // Canned & jarred
  tuna: [116, 26, 1, 0, 0, 300],
  marinara: [15, 0.4, 0.5, 2.5, 0.5, 110],
  crushedtom: [260, 13, 1.5, 56, 14, 1200],
  dicedtom: [80, 3.5, 0.4, 17, 4, 630],
  tomatopaste: [13, 0.7, 0.1, 3, 0.6, 9],
  blackbeans: [330, 21, 1.3, 63, 23, 900],
  kidneybeans: [320, 21, 1, 60, 20, 900],
  chickpeas: [350, 17, 5.5, 60, 17, 800],
  whitebeans: [300, 20, 0.8, 55, 14, 800],
  pintobeans: [320, 19, 1.5, 58, 17, 800],
  refried: [410, 24, 5, 60, 20, 1900],
  greenchiles: [20, 0.6, 0.1, 4, 2, 400],
  enchiladasauce: [80, 2, 3, 12, 2, 1200],
  alfredo: [46, 0.8, 4.3, 1, 0, 190],
  beefbroth: [15, 2.5, 0.5, 0.5, 0, 890],
  chickenbroth: [15, 1.5, 0.5, 1, 0, 860],
  vegbroth: [15, 0.5, 0, 3, 0, 650],
  coconutmilk: [790, 8, 85, 11, 4, 50],
  salsa: [70, 4, 0.5, 16, 4, 1800],
  pickledjalapenos: [3, 0.1, 0.1, 0.6, 0.3, 170],
  tacosauce: [5, 0.1, 0, 1, 0.2, 100],
  peanutbutter: [94, 3.5, 8, 3.5, 1, 70],
  pesto: [70, 1.5, 7, 1, 0.3, 150],

  // Pasta, rice & grains (dry)
  rice: [675, 13, 1.2, 148, 2, 9],
  spaghetti: [100, 3.6, 0.4, 21, 1, 1],
  penne: [100, 3.6, 0.4, 21, 1, 1],
  elbow: [100, 3.6, 0.4, 21, 1, 1],
  eggnoodles: [108, 4, 1.2, 20, 1, 6],
  ramen: [380, 8, 14, 52, 2, 1000],
  lentils: [680, 46, 2, 115, 21, 10],
  breadcrumbs: [425, 14, 5.5, 78, 5, 790],
  tortillachips: [140, 2, 7, 18, 1.5, 120],
  nachochips: [150, 2, 8, 18, 1, 210],
  gnocchi: [57, 1.3, 0.2, 12.5, 0.6, 150],
  proteinpasta: [100, 5, 0.6, 19, 2, 2],

  // Baking
  flour: [455, 13, 1.2, 95, 3.4, 2],
  brownsugar: [52, 0, 0, 13, 0, 4],
  sugar: [48, 0, 0, 12.5, 0, 0],
  bakingpowder: [2, 0, 0, 1.3, 0, 480],
  cornstarch: [30, 0, 0, 7, 0, 1],
  syrup: [840, 0, 0, 210, 0, 200],

  // Oils, sauces & spices
  oliveoil: [119, 0, 13.5, 0, 0, 0],
  vegoil: [120, 0, 13.6, 0, 0, 0],
  soysauce: [9, 1.3, 0, 1, 0, 880],
  honey: [64, 0.1, 0, 17, 0, 1],
  ricevinegar: [0, 0, 0, 0, 0, 0],
  bbqsauce: [480, 2, 1.5, 128, 1, 2800],
  sriracha: [15, 0.3, 0.1, 3, 0, 300],
  dijon: [15, 0.9, 0.8, 0.3, 0.2, 360],
  mayo: [94, 0.1, 10.3, 0, 0, 88],
  tacoseasoning: [85, 1.5, 1, 16, 2, 2300],
  salt: [0, 0, 0, 0, 0, 2325],
  pepper: [6, 0.2, 0.1, 1.4, 0.6, 0],
  garlicpowder: [10, 0.5, 0, 2.2, 0.3, 2],
  chilipowder: [8, 0.4, 0.4, 1.4, 0.9, 77],
  cumin: [8, 0.4, 0.5, 0.9, 0.2, 4],
  paprika: [6, 0.3, 0.3, 1.2, 0.8, 1],
  italianseasoning: [3, 0.1, 0.1, 0.6, 0.4, 0],
  curry: [7, 0.3, 0.3, 1.2, 1, 1],
  redpepperflakes: [6, 0.2, 0.3, 1, 0.5, 1],

  // Frozen
  salmon: [680, 92, 32, 0, 0, 300],
  tilapia: [435, 91, 7.7, 0, 0, 240],
  shrimp: [386, 91, 2.3, 0, 0, 540],
  meatballs: [1250, 60, 95, 30, 2, 2600],
  frozenpeas: [105, 7, 0.5, 21, 7, 145],
  frozencorn: [120, 4, 1.2, 25, 3, 3],
  greenbeans: [35, 2, 0.2, 8, 3.5, 3],
  stirfryveg: [45, 2, 0.2, 10, 3, 30]
};

// Starchy sides whose portion can shrink to bring a dinner's carbs down.
var STARCHES = ['rice', 'spaghetti', 'penne', 'elbow', 'eggnoodles', 'ramen', 'tortillas', 'corntortillas', 'bread', 'buns', 'potato', 'sweetpotato', 'tortillachips', 'nachochips', 'gnocchi', 'proteinpasta'];

// Ingredients whose carbs are mostly added sugar.
var ADDED_SUGAR = ['brownsugar', 'sugar', 'syrup', 'honey', 'bbqsauce'];

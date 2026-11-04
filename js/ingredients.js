// Ingredient catalog. Prices are estimated US regular (non-sale) store-brand prices
// for one whole pack. Users can override any price for their own store.
// Fields: name, aisle, unit (recipe unit), pack (units per pack), label (how the pack is sold),
// price, life ('days' | 'weeks' | 'months'), freeze (can freeze extras), flags:
//   d dairy, g gluten, e egg, n nuts/peanuts, f fish, s shellfish, m meat, p pork, b beef
var AISLES = [
  'Produce', 'Meat & Seafood', 'Dairy & Eggs', 'Bakery', 'Canned & Jarred',
  'Pasta, Rice & Grains', 'Baking', 'Oils, Sauces & Spices', 'Frozen'
];

var INGREDIENTS = {
  // Produce
  onion:        { name: 'Yellow onions', aisle: 'Produce', unit: 'each', pack: 6, label: '3 lb bag', price: 3.49, life: 'weeks' },
  redonion:     { name: 'Red onion', aisle: 'Produce', unit: 'each', pack: 1, label: '1 onion', price: 1.19, life: 'weeks' },
  garlic:       { name: 'Garlic', aisle: 'Produce', unit: 'clove', pack: 10, label: '1 head', price: 0.69, life: 'weeks' },
  potato:       { name: 'Russet potatoes', aisle: 'Produce', unit: 'lb', pack: 5, label: '5 lb bag', price: 4.49, life: 'weeks' },
  sweetpotato:  { name: 'Sweet potatoes', aisle: 'Produce', unit: 'lb', pack: 1, label: 'per lb', price: 1.29, life: 'weeks' },
  carrot:       { name: 'Carrots', aisle: 'Produce', unit: 'lb', pack: 2, label: '2 lb bag', price: 2.29, life: 'weeks' },
  celery:       { name: 'Celery', aisle: 'Produce', unit: 'stalk', pack: 8, label: '1 bunch', price: 1.99, life: 'days' },
  bellpepper:   { name: 'Bell pepper', aisle: 'Produce', unit: 'each', pack: 1, label: '1 pepper', price: 1.29, life: 'days' },
  jalapeno:     { name: 'Jalapeño', aisle: 'Produce', unit: 'each', pack: 1, label: '1 pepper', price: 0.25, life: 'days' },
  tomato:       { name: 'Roma tomatoes', aisle: 'Produce', unit: 'each', pack: 1, label: '1 tomato', price: 0.40, life: 'days' },
  lettuce:      { name: 'Romaine hearts', aisle: 'Produce', unit: 'head', pack: 3, label: '3 pack', price: 3.99, life: 'days' },
  spinach:      { name: 'Baby spinach', aisle: 'Produce', unit: 'oz', pack: 5, label: '5 oz box', price: 2.99, life: 'days' },
  broccoli:     { name: 'Broccoli crowns', aisle: 'Produce', unit: 'lb', pack: 1, label: 'about 1 lb', price: 1.99, life: 'days' },
  zucchini:     { name: 'Zucchini', aisle: 'Produce', unit: 'each', pack: 1, label: '1 zucchini', price: 1.00, life: 'days' },
  cabbage:      { name: 'Green cabbage', aisle: 'Produce', unit: 'head', pack: 1, label: '1 head', price: 2.49, life: 'weeks' },
  cilantro:     { name: 'Cilantro', aisle: 'Produce', unit: 'bunch', pack: 1, label: '1 bunch', price: 0.99, life: 'days' },
  greenonion:   { name: 'Green onions', aisle: 'Produce', unit: 'bunch', pack: 1, label: '1 bunch', price: 0.99, life: 'days' },
  lime:         { name: 'Lime', aisle: 'Produce', unit: 'each', pack: 1, label: '1 lime', price: 0.33, life: 'weeks' },
  lemon:        { name: 'Lemon', aisle: 'Produce', unit: 'each', pack: 1, label: '1 lemon', price: 0.69, life: 'weeks' },
  mushroom:     { name: 'White mushrooms', aisle: 'Produce', unit: 'oz', pack: 8, label: '8 oz pack', price: 2.29, life: 'days' },
  cucumber:     { name: 'Cucumber', aisle: 'Produce', unit: 'each', pack: 1, label: '1 cucumber', price: 0.79, life: 'days' },
  avocado:      { name: 'Avocado', aisle: 'Produce', unit: 'each', pack: 1, label: '1 avocado', price: 1.25, life: 'days' },
  cauliflower:  { name: 'Cauliflower', aisle: 'Produce', unit: 'head', pack: 1, label: '1 head', price: 2.99, life: 'days' },
  ginger:       { name: 'Fresh ginger', aisle: 'Produce', unit: 'inch', pack: 4, label: 'small knob', price: 0.80, life: 'weeks', freeze: true },

  // Meat & Seafood
  chickenthigh: { name: 'Boneless chicken thighs', aisle: 'Meat & Seafood', unit: 'lb', pack: 3, label: 'family pack, ~3 lb', price: 8.99, life: 'days', freeze: true, flags: 'm' },
  chickenbreast:{ name: 'Boneless chicken breasts', aisle: 'Meat & Seafood', unit: 'lb', pack: 3, label: 'family pack, ~3 lb', price: 9.99, life: 'days', freeze: true, flags: 'm' },
  drumsticks:   { name: 'Chicken drumsticks', aisle: 'Meat & Seafood', unit: 'lb', pack: 3, label: 'family pack, ~3 lb', price: 4.99, life: 'days', freeze: true, flags: 'm' },
  groundbeef:   { name: 'Ground beef 80/20', aisle: 'Meat & Seafood', unit: 'lb', pack: 1, label: '1 lb', price: 5.49, life: 'days', freeze: true, flags: 'mb' },
  groundturkey: { name: 'Ground turkey', aisle: 'Meat & Seafood', unit: 'lb', pack: 1, label: '1 lb', price: 4.29, life: 'days', freeze: true, flags: 'm' },
  porkchop:     { name: 'Boneless pork chops', aisle: 'Meat & Seafood', unit: 'lb', pack: 2, label: '~2 lb pack', price: 7.49, life: 'days', freeze: true, flags: 'mp' },
  porkshoulder: { name: 'Pork shoulder', aisle: 'Meat & Seafood', unit: 'lb', pack: 3, label: '~3 lb roast', price: 8.99, life: 'days', freeze: true, flags: 'mp' },
  sausage:      { name: 'Smoked sausage', aisle: 'Meat & Seafood', unit: 'oz', pack: 13, label: '13 oz rope', price: 3.49, life: 'weeks', freeze: true, flags: 'mp' },
  italiansausage:{ name: 'Italian sausage', aisle: 'Meat & Seafood', unit: 'lb', pack: 1, label: '1 lb', price: 4.49, life: 'days', freeze: true, flags: 'mp' },
  bacon:        { name: 'Bacon', aisle: 'Meat & Seafood', unit: 'slice', pack: 14, label: '12 oz pack', price: 5.49, life: 'weeks', freeze: true, flags: 'mp' },

  // Dairy & Eggs
  eggs:         { name: 'Eggs', aisle: 'Dairy & Eggs', unit: 'each', pack: 12, label: '1 dozen', price: 3.29, life: 'weeks', flags: 'e' },
  milk:         { name: 'Milk', aisle: 'Dairy & Eggs', unit: 'cup', pack: 8, label: 'half gallon', price: 2.79, life: 'days', flags: 'd' },
  butter:       { name: 'Butter', aisle: 'Dairy & Eggs', unit: 'tbsp', pack: 32, label: '1 lb (4 sticks)', price: 4.99, life: 'months', freeze: true, flags: 'd' },
  cheddar:      { name: 'Shredded cheddar', aisle: 'Dairy & Eggs', unit: 'cup', pack: 2, label: '8 oz bag', price: 2.69, life: 'weeks', freeze: true, flags: 'd' },
  mozzarella:   { name: 'Shredded mozzarella', aisle: 'Dairy & Eggs', unit: 'cup', pack: 2, label: '8 oz bag', price: 2.69, life: 'weeks', freeze: true, flags: 'd' },
  parmesan:     { name: 'Grated parmesan', aisle: 'Dairy & Eggs', unit: 'cup', pack: 2, label: '8 oz canister', price: 3.99, life: 'months', flags: 'd' },
  sourcream:    { name: 'Sour cream', aisle: 'Dairy & Eggs', unit: 'cup', pack: 2, label: '16 oz tub', price: 2.29, life: 'weeks', flags: 'd' },
  heavycream:   { name: 'Heavy cream', aisle: 'Dairy & Eggs', unit: 'cup', pack: 2, label: '16 oz carton', price: 3.99, life: 'weeks', flags: 'd' },
  pizzadough:   { name: 'Pizza dough', aisle: 'Dairy & Eggs', unit: 'each', pack: 1, label: '1 lb ball', price: 2.99, life: 'days', freeze: true, flags: 'g' },

  // Bakery
  tortillas:    { name: 'Flour tortillas', aisle: 'Bakery', unit: 'each', pack: 10, label: '10 count', price: 2.49, life: 'weeks', freeze: true, flags: 'g' },
  corntortillas:{ name: 'Corn tortillas', aisle: 'Bakery', unit: 'each', pack: 30, label: '30 count', price: 2.29, life: 'weeks', freeze: true },
  bread:        { name: 'Sandwich bread', aisle: 'Bakery', unit: 'slice', pack: 20, label: '1 loaf', price: 1.99, life: 'days', freeze: true, flags: 'g' },
  buns:         { name: 'Hamburger buns', aisle: 'Bakery', unit: 'each', pack: 8, label: '8 count', price: 1.99, life: 'days', freeze: true, flags: 'g' },

  // Canned & Jarred
  tuna:         { name: 'Canned tuna', aisle: 'Canned & Jarred', unit: 'can', pack: 1, label: '5 oz can', price: 1.29, life: 'months', flags: 'f' },
  marinara:     { name: 'Marinara sauce', aisle: 'Canned & Jarred', unit: 'oz', pack: 24, label: '24 oz jar', price: 2.29, life: 'months' },
  crushedtom:   { name: 'Crushed tomatoes', aisle: 'Canned & Jarred', unit: 'can', pack: 1, label: '28 oz can', price: 1.89, life: 'months' },
  dicedtom:     { name: 'Diced tomatoes', aisle: 'Canned & Jarred', unit: 'can', pack: 1, label: '14.5 oz can', price: 0.99, life: 'months' },
  tomatopaste:  { name: 'Tomato paste', aisle: 'Canned & Jarred', unit: 'tbsp', pack: 10, label: '6 oz can', price: 0.79, life: 'months' },
  blackbeans:   { name: 'Black beans', aisle: 'Canned & Jarred', unit: 'can', pack: 1, label: '15 oz can', price: 0.99, life: 'months' },
  kidneybeans:  { name: 'Kidney beans', aisle: 'Canned & Jarred', unit: 'can', pack: 1, label: '15 oz can', price: 0.99, life: 'months' },
  chickpeas:    { name: 'Chickpeas', aisle: 'Canned & Jarred', unit: 'can', pack: 1, label: '15 oz can', price: 0.99, life: 'months' },
  refried:      { name: 'Refried beans', aisle: 'Canned & Jarred', unit: 'can', pack: 1, label: '16 oz can', price: 1.49, life: 'months' },
  chickenbroth: { name: 'Chicken broth', aisle: 'Canned & Jarred', unit: 'cup', pack: 4, label: '32 oz carton', price: 2.29, life: 'months', flags: 'm' },
  vegbroth:     { name: 'Vegetable broth', aisle: 'Canned & Jarred', unit: 'cup', pack: 4, label: '32 oz carton', price: 2.29, life: 'months' },
  coconutmilk:  { name: 'Coconut milk', aisle: 'Canned & Jarred', unit: 'can', pack: 1, label: '13.5 oz can', price: 1.99, life: 'months' },
  salsa:        { name: 'Salsa', aisle: 'Canned & Jarred', unit: 'cup', pack: 2, label: '16 oz jar', price: 2.49, life: 'months' },
  peanutbutter: { name: 'Peanut butter', aisle: 'Canned & Jarred', unit: 'tbsp', pack: 28, label: '16 oz jar', price: 2.49, life: 'months', flags: 'n' },
  pesto:        { name: 'Basil pesto', aisle: 'Canned & Jarred', unit: 'tbsp', pack: 12, label: '6 oz jar', price: 2.99, life: 'weeks', flags: 'dn' },

  // Pasta, Rice & Grains
  rice:         { name: 'Long-grain white rice', aisle: 'Pasta, Rice & Grains', unit: 'cup', pack: 4.5, label: '2 lb bag', price: 2.29, life: 'months' },
  spaghetti:    { name: 'Spaghetti', aisle: 'Pasta, Rice & Grains', unit: 'oz', pack: 16, label: '1 lb box', price: 1.29, life: 'months', flags: 'g' },
  penne:        { name: 'Penne', aisle: 'Pasta, Rice & Grains', unit: 'oz', pack: 16, label: '1 lb box', price: 1.29, life: 'months', flags: 'g' },
  elbow:        { name: 'Elbow macaroni', aisle: 'Pasta, Rice & Grains', unit: 'oz', pack: 16, label: '1 lb box', price: 1.29, life: 'months', flags: 'g' },
  eggnoodles:   { name: 'Egg noodles', aisle: 'Pasta, Rice & Grains', unit: 'oz', pack: 12, label: '12 oz bag', price: 1.99, life: 'months', flags: 'ge' },
  ramen:        { name: 'Instant ramen', aisle: 'Pasta, Rice & Grains', unit: 'each', pack: 6, label: '6 pack', price: 1.99, life: 'months', flags: 'g' },
  lentils:      { name: 'Dry lentils', aisle: 'Pasta, Rice & Grains', unit: 'cup', pack: 2.25, label: '1 lb bag', price: 1.79, life: 'months' },
  breadcrumbs:  { name: 'Breadcrumbs', aisle: 'Pasta, Rice & Grains', unit: 'cup', pack: 3, label: '15 oz can', price: 2.29, life: 'months', flags: 'g' },

  // Baking
  flour:        { name: 'All-purpose flour', aisle: 'Baking', unit: 'cup', pack: 18, label: '5 lb bag', price: 3.49, life: 'months', flags: 'g' },
  brownsugar:   { name: 'Brown sugar', aisle: 'Baking', unit: 'tbsp', pack: 64, label: '2 lb bag', price: 2.99, life: 'months' },
  sugar:        { name: 'Sugar', aisle: 'Baking', unit: 'tbsp', pack: 64, label: '2 lb bag', price: 2.49, life: 'months' },
  bakingpowder: { name: 'Baking powder', aisle: 'Baking', unit: 'tsp', pack: 40, label: '8 oz can', price: 1.99, life: 'months' },
  cornstarch:   { name: 'Cornstarch', aisle: 'Baking', unit: 'tbsp', pack: 50, label: '16 oz box', price: 1.79, life: 'months' },
  syrup:        { name: 'Pancake syrup', aisle: 'Baking', unit: 'cup', pack: 3, label: '24 oz bottle', price: 2.99, life: 'months' },

  // Oils, Sauces & Spices
  oliveoil:     { name: 'Olive oil', aisle: 'Oils, Sauces & Spices', unit: 'tbsp', pack: 34, label: '17 oz bottle', price: 5.99, life: 'months' },
  vegoil:       { name: 'Vegetable oil', aisle: 'Oils, Sauces & Spices', unit: 'tbsp', pack: 96, label: '48 oz bottle', price: 4.49, life: 'months' },
  soysauce:     { name: 'Soy sauce', aisle: 'Oils, Sauces & Spices', unit: 'tbsp', pack: 30, label: '15 oz bottle', price: 2.49, life: 'months', flags: 'g' },
  honey:        { name: 'Honey', aisle: 'Oils, Sauces & Spices', unit: 'tbsp', pack: 21, label: '12 oz bottle', price: 3.99, life: 'months' },
  ricevinegar:  { name: 'Rice vinegar', aisle: 'Oils, Sauces & Spices', unit: 'tbsp', pack: 24, label: '12 oz bottle', price: 2.29, life: 'months' },
  bbqsauce:     { name: 'BBQ sauce', aisle: 'Oils, Sauces & Spices', unit: 'cup', pack: 1.75, label: '18 oz bottle', price: 1.99, life: 'months' },
  sriracha:     { name: 'Sriracha', aisle: 'Oils, Sauces & Spices', unit: 'tbsp', pack: 30, label: '17 oz bottle', price: 3.49, life: 'months' },
  dijon:        { name: 'Dijon mustard', aisle: 'Oils, Sauces & Spices', unit: 'tbsp', pack: 24, label: '12 oz jar', price: 1.99, life: 'months' },
  mayo:         { name: 'Mayonnaise', aisle: 'Oils, Sauces & Spices', unit: 'tbsp', pack: 60, label: '30 oz jar', price: 3.99, life: 'months', flags: 'e' },
  tacoseasoning:{ name: 'Taco seasoning', aisle: 'Oils, Sauces & Spices', unit: 'each', pack: 1, label: '1 oz packet', price: 0.79, life: 'months' },
  salt:         { name: 'Salt', aisle: 'Oils, Sauces & Spices', unit: 'tsp', pack: 150, label: '26 oz canister', price: 0.99, life: 'months' },
  pepper:       { name: 'Black pepper', aisle: 'Oils, Sauces & Spices', unit: 'tsp', pack: 50, label: '3 oz shaker', price: 2.49, life: 'months' },
  garlicpowder: { name: 'Garlic powder', aisle: 'Oils, Sauces & Spices', unit: 'tsp', pack: 50, label: '3 oz shaker', price: 1.49, life: 'months' },
  chilipowder:  { name: 'Chili powder', aisle: 'Oils, Sauces & Spices', unit: 'tsp', pack: 50, label: '2.5 oz shaker', price: 1.49, life: 'months' },
  cumin:        { name: 'Ground cumin', aisle: 'Oils, Sauces & Spices', unit: 'tsp', pack: 40, label: '1.5 oz shaker', price: 1.99, life: 'months' },
  paprika:      { name: 'Paprika', aisle: 'Oils, Sauces & Spices', unit: 'tsp', pack: 40, label: '2 oz shaker', price: 1.49, life: 'months' },
  italianseasoning:{ name: 'Italian seasoning', aisle: 'Oils, Sauces & Spices', unit: 'tsp', pack: 40, label: '0.75 oz shaker', price: 1.49, life: 'months' },
  curry:        { name: 'Curry powder', aisle: 'Oils, Sauces & Spices', unit: 'tsp', pack: 40, label: '1.75 oz shaker', price: 2.49, life: 'months' },
  redpepperflakes:{ name: 'Red pepper flakes', aisle: 'Oils, Sauces & Spices', unit: 'tsp', pack: 40, label: '1.5 oz shaker', price: 1.49, life: 'months' },

  // Frozen
  salmon:       { name: 'Salmon fillets (frozen)', aisle: 'Frozen', unit: 'lb', pack: 2, label: '2 lb bag', price: 12.99, life: 'months', flags: 'f' },
  tilapia:      { name: 'Tilapia fillets (frozen)', aisle: 'Frozen', unit: 'lb', pack: 2, label: '2 lb bag', price: 8.99, life: 'months', flags: 'f' },
  shrimp:       { name: 'Shrimp, peeled (frozen)', aisle: 'Frozen', unit: 'lb', pack: 1, label: '1 lb bag', price: 7.99, life: 'months', flags: 's' },
  meatballs:    { name: 'Meatballs (frozen)', aisle: 'Frozen', unit: 'lb', pack: 2, label: '32 oz bag', price: 7.99, life: 'months', flags: 'mbpgde' },
  frozenpeas:   { name: 'Frozen peas', aisle: 'Frozen', unit: 'cup', pack: 3.5, label: '12 oz bag', price: 1.49, life: 'months' },
  frozencorn:   { name: 'Frozen corn', aisle: 'Frozen', unit: 'cup', pack: 3.5, label: '12 oz bag', price: 1.49, life: 'months' },
  greenbeans:   { name: 'Frozen green beans', aisle: 'Frozen', unit: 'cup', pack: 3.5, label: '12 oz bag', price: 1.49, life: 'months' },
  stirfryveg:   { name: 'Frozen stir-fry vegetables', aisle: 'Frozen', unit: 'cup', pack: 4, label: '16 oz bag', price: 2.49, life: 'months' }
};

// Staples most kitchens already have; offered during setup.
var COMMON_STAPLES = [
  'salt', 'pepper', 'vegoil', 'oliveoil', 'flour', 'sugar', 'brownsugar', 'garlicpowder',
  'chilipowder', 'cumin', 'paprika', 'italianseasoning', 'redpepperflakes', 'soysauce',
  'honey', 'rice', 'butter', 'cornstarch', 'bakingpowder', 'dijon', 'mayo'
];

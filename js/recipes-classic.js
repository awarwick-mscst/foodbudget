// Classic American and Midwest home cooking. Same format as recipes.js.
RECIPES.push(
  {
    id: 'hotdish', name: 'Tater tot hotdish', cuisine: 'American', protein: 'Beef', min: 20, serves: 6,
    tags: ['kid', 'freezer'], note: 'A Minnesota church-basement classic.',
    ing: [['groundbeef', 1.5], ['onion', 1], ['creamofmushroom', 2], ['greenbeans', 3.5], ['cheddar', 1.5], ['tatertots', 28], ['salt', 0.5], ['pepper', 0.5]],
    steps: [
      'Heat the oven to 375°F.',
      'Brown the ground beef with the diced onion in a skillet. Drain the fat and season with salt and pepper.',
      'Stir in both cans of soup and the green beans, then spread it in a 9x13 pan.',
      'Sprinkle the cheddar over the top, then cover with a single layer of frozen tater tots.',
      'Bake 40 to 45 minutes until the tots are golden and crisp.'
    ]
  },
  {
    id: 'meatloaf', name: 'Meatloaf with mashed potatoes & green beans', cuisine: 'American', protein: 'Beef', min: 30, serves: 6,
    tags: ['kid', 'freezer'],
    ing: [['groundbeef', 2], ['eggs', 2], ['breadcrumbs', 0.75], ['milk', 1], ['onion', 1], ['ketchup', 8], ['brownsugar', 2], ['mustard', 1], ['garlicpowder', 1], ['salt', 1.5], ['pepper', 0.5], ['potato', 3], ['butter', 4], ['greenbeans', 3.5]],
    steps: [
      'Heat the oven to 350°F. Mix the beef, eggs, breadcrumbs, 1/2 cup milk, finely diced onion, 2 tbsp ketchup, garlic powder, 1 tsp salt and the pepper. Don\'t overmix.',
      'Shape into a loaf in a baking pan. Stir the rest of the ketchup with the brown sugar and mustard and spread it on top.',
      'Bake about 1 hour, until the center reaches 160°F. Let it rest 10 minutes before slicing.',
      'Meanwhile, boil the peeled, cubed potatoes until tender. Drain and mash with the butter, the rest of the milk and salt.',
      'Cook the green beans and serve everything together.'
    ]
  },
  {
    id: 'potroast', name: 'Slow-cooker pot roast with potatoes & carrots', cuisine: 'American', protein: 'Beef', min: 20, serves: 6,
    tags: ['slowcooker', 'freezer'],
    ing: [['chuckroast', 3], ['potato', 2], ['carrot', 1], ['onion', 1], ['beefbroth', 1], ['gravymix', 1], ['garlic', 3], ['salt', 1], ['pepper', 1], ['vegoil', 1], ['cornstarch', 2]],
    steps: [
      'Season the roast with salt and pepper. Brown it on all sides in the oil in a hot skillet (you can skip this if you\'re short on time).',
      'Put the cubed potatoes, carrot chunks and onion wedges in the slow cooker and set the roast on top.',
      'Whisk the broth with the gravy mix and garlic and pour it over.',
      'Cook on low 8 hours or high 5 hours, until the beef falls apart.',
      'For gravy, stir the cornstarch into 2 tbsp cold water, stir it into the juices and cook on high 10 minutes.'
    ]
  },
  {
    id: 'chickennoodles', name: 'Homestyle chicken & noodles over mashed potatoes', cuisine: 'American', protein: 'Chicken', min: 40, serves: 6,
    tags: ['onepot', 'kid', 'freezer'], note: 'Indiana and Ohio comfort food: noodles in thick broth, spooned over mashed potatoes.',
    ing: [['chickenthigh', 1.5], ['eggnoodles', 12], ['chickenbroth', 8], ['carrot', 0.5], ['celery', 2], ['onion', 1], ['butter', 6], ['potato', 3], ['milk', 0.5], ['salt', 1.5], ['pepper', 0.5], ['flour', 0.25]],
    steps: [
      'Simmer the chicken in the broth with the diced carrot, celery and onion for 25 minutes until tender. Take the chicken out and shred it.',
      'Meanwhile boil the cubed potatoes until tender, then mash with 4 tbsp butter, the milk and salt.',
      'Bring the broth back to a boil and add the egg noodles. Cook about 10 minutes until soft.',
      'Mash the flour into the rest of the butter and stir it in to thicken. Return the chicken and season with salt and pepper.',
      'Spoon the chicken and noodles over the mashed potatoes.'
    ]
  },
  {
    id: 'goulash', name: 'American goulash', cuisine: 'American', protein: 'Beef', min: 35, serves: 6,
    tags: ['onepot', 'kid', 'freezer'], note: 'Also called American chop suey or beefaroni.',
    ing: [['groundbeef', 1.5], ['onion', 1], ['garlic', 3], ['crushedtom', 1], ['dicedtom', 1], ['beefbroth', 2], ['elbow', 12], ['italianseasoning', 2], ['paprika', 1], ['cheddar', 1], ['salt', 1], ['pepper', 0.5]],
    steps: [
      'Brown the beef with the diced onion in a big pot. Drain the fat and stir in the garlic.',
      'Add both cans of tomatoes, the broth, Italian seasoning, paprika, salt and pepper. Bring to a boil.',
      'Stir in the dry macaroni. Cover and simmer about 15 minutes, stirring often, until the pasta is tender.',
      'Top with the cheddar, cover a minute to melt, and serve.'
    ]
  },
  {
    id: 'potpie', name: 'Chicken pot pie with biscuit topping', cuisine: 'American', protein: 'Chicken', min: 20, serves: 6,
    tags: ['kid', 'freezer'],
    ing: [['rotisserie', 3], ['mixedveg', 3.5], ['creamofchicken', 2], ['milk', 0.75], ['onion', 0.5], ['pepper', 0.5], ['garlicpowder', 0.5], ['biscuits', 8]],
    steps: [
      'Heat the oven to 375°F.',
      'Mix the shredded chicken, frozen vegetables, soup, milk, diced onion, pepper and garlic powder in a 9x13 pan.',
      'Bake 15 minutes until it starts to bubble.',
      'Set the biscuits on top and bake 18 to 20 minutes more, until they\'re golden and cooked through.'
    ]
  },
  {
    id: 'brats', name: 'Brats with peppers, onions & oven potatoes', cuisine: 'American', protein: 'Pork', min: 40, serves: 5,
    tags: ['sheetpan', 'kid'], note: 'Wisconsin style. Great on the grill, too.',
    ing: [['brats', 5], ['hotdogbuns', 5], ['onion', 1], ['bellpepper', 2], ['potato', 2], ['vegoil', 2], ['paprika', 1], ['garlicpowder', 1], ['salt', 1], ['mustard', 3]],
    steps: [
      'Heat the oven to 425°F. Toss the cubed potatoes with 1 tbsp oil, paprika, garlic powder and salt on a sheet pan. Roast 15 minutes.',
      'Add the brats and the sliced onion and peppers tossed in the rest of the oil. Roast 20 to 25 minutes more, turning the brats once, until browned and 160°F inside.',
      'Serve the brats in buns with the peppers, onions and mustard, with the potatoes on the side.'
    ]
  },
  {
    id: 'salisbury', name: 'Salisbury steak with mushroom gravy & mashed potatoes', cuisine: 'American', protein: 'Beef', min: 40, serves: 4,
    tags: ['kid'],
    ing: [['groundbeef', 1.5], ['breadcrumbs', 0.33], ['eggs', 1], ['ketchup', 1], ['onion', 1], ['mushroom', 8], ['beefbroth', 2], ['cornstarch', 1.5], ['garlicpowder', 1], ['potato', 2.5], ['butter', 4], ['milk', 0.5], ['salt', 1], ['pepper', 0.5], ['greenbeans', 3.5]],
    steps: [
      'Mix the beef, breadcrumbs, egg, ketchup, garlic powder, salt and pepper. Shape into 4 oval patties.',
      'Brown the patties 4 minutes a side in a large skillet, then set them aside.',
      'Cook the sliced onion and mushrooms in the same pan until soft. Add the broth, then stir in the cornstarch mixed with 2 tbsp water.',
      'Return the patties, cover and simmer 10 minutes in the gravy.',
      'Meanwhile boil and mash the potatoes with the butter and milk, and cook the green beans.'
    ]
  },
  {
    id: 'swedishmeatballs', name: 'Swedish meatballs over egg noodles', cuisine: 'American', protein: 'Beef', min: 30, serves: 4,
    tags: ['kid', 'onepot'],
    ing: [['meatballs', 1.5], ['butter', 3], ['flour', 0.25], ['beefbroth', 2], ['sourcream', 0.5], ['dijon', 1], ['garlicpowder', 0.5], ['eggnoodles', 12], ['pepper', 0.5], ['greenbeans', 3.5]],
    steps: [
      'Cook the egg noodles and drain.',
      'Melt the butter in a large skillet, whisk in the flour and cook 1 minute.',
      'Slowly whisk in the broth and simmer until thick. Stir in the frozen meatballs, garlic powder and pepper. Cover and simmer 12 to 15 minutes until hot.',
      'Take off the heat and stir in the sour cream and mustard.',
      'Serve over the noodles with green beans on the side.'
    ]
  },
  {
    id: 'scallopedham', name: 'Cheesy scalloped potatoes & ham', cuisine: 'American', protein: 'Pork', min: 25, serves: 6,
    tags: ['kid', 'freezer'],
    ing: [['potato', 3], ['ham', 16], ['onion', 1], ['butter', 4], ['flour', 0.25], ['milk', 2.5], ['cheddar', 1.5], ['garlicpowder', 0.5], ['salt', 1], ['pepper', 0.5], ['greenbeans', 3.5]],
    steps: [
      'Heat the oven to 375°F. Grease a 9x13 pan.',
      'Melt the butter in a saucepan, cook the diced onion 3 minutes, then stir in the flour. Slowly whisk in the milk and cook until thick. Stir in 1 cup cheddar, the garlic powder, salt and pepper.',
      'Layer the thinly sliced potatoes and ham in the pan and pour the sauce over.',
      'Cover with foil and bake 45 minutes. Uncover, add the rest of the cheese and bake 20 to 25 minutes more until the potatoes are tender.',
      'Serve with green beans.'
    ]
  },
  {
    id: 'ovenfriedchicken', name: 'Oven-fried chicken with mashed potatoes & corn', cuisine: 'American', protein: 'Chicken', min: 25, serves: 4,
    tags: ['kid'],
    ing: [['drumsticks', 2.5], ['flour', 0.5], ['eggs', 2], ['breadcrumbs', 1], ['paprika', 2], ['garlicpowder', 1], ['salt', 1.5], ['pepper', 1], ['vegoil', 3], ['potato', 2.5], ['butter', 3], ['milk', 0.5], ['frozencorn', 3.5]],
    steps: [
      'Heat the oven to 425°F and oil a sheet pan.',
      'Season the flour with half the salt and pepper. Mix the breadcrumbs with the paprika, garlic powder and the rest of the salt.',
      'Dip each drumstick in flour, then beaten egg, then the crumbs. Set on the pan and drizzle with the oil.',
      'Bake 40 to 45 minutes, turning once, until crisp and 175°F inside.',
      'Meanwhile boil and mash the potatoes with the butter and milk, and heat the corn.'
    ]
  },
  {
    id: 'ranchporkchops', name: 'Ranch pork chops & potatoes', cuisine: 'American', protein: 'Pork', min: 15, serves: 4,
    tags: ['sheetpan', 'kid'],
    ing: [['porkchop', 1.75], ['potato', 2], ['greenbeans', 3.5], ['ranchmix', 1], ['butter', 4], ['vegoil', 1], ['pepper', 0.5]],
    steps: [
      'Heat the oven to 400°F.',
      'Set the pork chops in the middle of a sheet pan, the cubed potatoes on one side and the green beans on the other.',
      'Drizzle everything with the oil and melted butter, then sprinkle with the ranch mix and pepper.',
      'Bake 30 to 35 minutes until the chops reach 145°F and the potatoes are tender.'
    ]
  },
  {
    id: 'beefnoodles', name: 'Slow-cooker beef & noodles', cuisine: 'American', protein: 'Beef', min: 20, serves: 6,
    tags: ['slowcooker', 'freezer'],
    ing: [['stewbeef', 2], ['onion', 1], ['beefbroth', 4], ['creamofmushroom', 1], ['gravymix', 1], ['garlicpowder', 1], ['pepper', 0.5], ['eggnoodles', 12], ['frozenpeas', 1.5]],
    steps: [
      'Put the beef and diced onion in the slow cooker.',
      'Whisk the broth, soup, gravy mix, garlic powder and pepper and pour it over.',
      'Cook on low 7 to 8 hours until the beef is tender.',
      'Turn to high, stir in the dry noodles and peas, cover and cook 20 to 30 minutes until the noodles are soft. Stir once or twice.'
    ]
  },
  {
    id: 'grilledcheese', name: 'Grilled cheese & tomato soup', cuisine: 'American', protein: 'Cheese', min: 20, serves: 4,
    tags: ['kid'],
    ing: [['bread', 8], ['cheeseslices', 8], ['butter', 4], ['tomatosoup', 2], ['milk', 2.5]],
    steps: [
      'Heat the soup with an equal amount of milk in a saucepan, stirring until smooth and hot.',
      'Butter one side of each bread slice. Make sandwiches with 2 cheese slices each, buttered sides out.',
      'Cook in a skillet over medium-low heat 3 to 4 minutes a side until golden and melted.',
      'Cut and serve with the soup for dipping.'
    ]
  },
  {
    id: 'potatosoup', name: 'Loaded baked potato soup', cuisine: 'American', protein: 'Pork', min: 40, serves: 6,
    tags: ['onepot', 'kid'],
    ing: [['potato', 3], ['bacon', 6], ['onion', 1], ['butter', 3], ['flour', 0.33], ['chickenbroth', 4], ['milk', 2], ['cheddar', 1.5], ['sourcream', 0.5], ['greenonion', 1], ['salt', 1], ['pepper', 0.5]],
    steps: [
      'Cook the chopped bacon in a large pot until crisp. Set it aside and pour off all but 1 tbsp of fat.',
      'Add the butter and diced onion and cook 4 minutes. Stir in the flour and cook 1 minute.',
      'Whisk in the broth, add the peeled, cubed potatoes and simmer 15 to 20 minutes until tender.',
      'Mash some of the potatoes right in the pot to thicken it. Stir in the milk and 1 cup cheddar until melted. Season with salt and pepper.',
      'Top bowls with the bacon, sour cream, the rest of the cheese and sliced green onion.'
    ]
  },
  {
    id: 'pepperonipizza', name: 'Homemade pepperoni pizza', cuisine: 'Italian', protein: 'Pork', min: 30, serves: 4,
    tags: ['kid'],
    ing: [['pizzadough', 1], ['marinara', 8], ['mozzarella', 2], ['pepperoni', 4], ['italianseasoning', 1], ['oliveoil', 1], ['lettuce', 1], ['cucumber', 1], ['tomato', 1]],
    steps: [
      'Heat the oven to 475°F. Let the dough sit out 20 minutes so it\'s easier to stretch.',
      'Stretch the dough on an oiled sheet pan. Spread with the sauce and sprinkle with the Italian seasoning.',
      'Top with the mozzarella and pepperoni.',
      'Bake 12 to 15 minutes until the crust is browned and the cheese bubbles.',
      'Serve with a simple salad of chopped romaine, cucumber and tomato.'
    ]
  },
  {
    id: 'walkingtacos', name: 'Walking tacos', cuisine: 'Mexican', protein: 'Beef', min: 20, serves: 4,
    tags: ['kid'], note: 'A potluck and ball-game favorite: taco fixings right in the chip bag.',
    ing: [['groundbeef', 1.25], ['tacoseasoning', 1], ['nachochips', 9.25], ['lettuce', 1], ['tomato', 2], ['cheddar', 1], ['sourcream', 0.5], ['salsa', 0.5]],
    steps: [
      'Brown the beef, drain, and stir in the taco seasoning with 2/3 cup water. Simmer 5 minutes.',
      'Divide the chips into 4 bowls or snack-size bags and crush them a little.',
      'Spoon the meat over the chips and top with shredded lettuce, diced tomato, cheese, sour cream and salsa.'
    ]
  },
  {
    id: 'tenderloin', name: 'Breaded pork tenderloin sandwiches', cuisine: 'American', protein: 'Pork', min: 35, serves: 4,
    tags: ['kid'], note: 'The Iowa and Indiana diner classic, bigger than the bun.',
    ing: [['porkchop', 1.25], ['flour', 0.5], ['eggs', 2], ['milk', 0.25], ['breadcrumbs', 1.5], ['salt', 1], ['pepper', 0.5], ['vegoil', 6], ['buns', 4], ['lettuce', 1], ['tomato', 1], ['onion', 0.5], ['mustard', 2], ['frozencorn', 3.5]],
    steps: [
      'Pound the pork chops between plastic wrap until about 1/4 inch thick. Season with salt and pepper.',
      'Dip each in flour, then the eggs beaten with the milk, then the breadcrumbs, pressing to coat.',
      'Fry in the hot oil in a large skillet over medium-high heat 3 to 4 minutes a side until golden and cooked through.',
      'Serve on buns with lettuce, tomato, onion and mustard, with corn on the side.'
    ]
  },
  {
    id: 'lasagna', name: 'Classic beef lasagna', cuisine: 'Italian', protein: 'Beef', min: 40, serves: 8,
    tags: ['kid', 'freezer'],
    ing: [['groundbeef', 1.5], ['onion', 1], ['garlic', 3], ['marinara', 48], ['italianseasoning', 2], ['lasagna', 12], ['ricotta', 1.75], ['eggs', 1], ['parmesan', 0.5], ['mozzarella', 4]],
    steps: [
      'Heat the oven to 375°F. Cook the noodles until just tender and drain.',
      'Brown the beef with the onion and garlic, drain, and stir in the sauce and Italian seasoning.',
      'Mix the ricotta, egg and half the parmesan.',
      'In a 9x13 pan, layer a little sauce, then noodles, ricotta, mozzarella and sauce. Repeat twice and finish with mozzarella and parmesan.',
      'Cover with foil and bake 25 minutes, then uncover and bake 20 minutes more. Let it rest 15 minutes before cutting.'
    ]
  },
  {
    id: 'beefchili', name: 'Classic beef chili', cuisine: 'American', protein: 'Beef', min: 45, serves: 6,
    tags: ['onepot', 'freezer', 'kid'],
    ing: [['groundbeef', 1.5], ['onion', 1], ['bellpepper', 1], ['garlic', 3], ['kidneybeans', 2], ['dicedtom', 1], ['crushedtom', 1], ['chilipowder', 6], ['cumin', 2], ['salt', 1], ['brownsugar', 1], ['cheddar', 1], ['sourcream', 0.5]],
    steps: [
      'Brown the beef with the diced onion and pepper in a big pot. Drain the fat and stir in the garlic.',
      'Add the drained beans, both cans of tomatoes, chili powder, cumin, salt and brown sugar.',
      'Simmer, partly covered, at least 30 minutes, stirring now and then.',
      'Serve topped with cheddar and sour cream. Saltines or cornbread are good on the side.'
    ]
  },
  {
    id: 'biscuitsgravy', name: 'Biscuits & sausage gravy with scrambled eggs', cuisine: 'American', protein: 'Pork', min: 30, serves: 4,
    tags: ['kid'], note: 'Breakfast for dinner.',
    ing: [['biscuits', 8], ['breakfastsausage', 1], ['flour', 0.33], ['milk', 3], ['pepper', 1], ['salt', 0.5], ['eggs', 8], ['butter', 1]],
    steps: [
      'Bake the biscuits as the can says.',
      'Brown the sausage in a large skillet, breaking it up. Don\'t drain it.',
      'Sprinkle the flour over and stir 1 minute. Slowly stir in the milk and simmer until thick, about 5 minutes. Season with plenty of pepper and the salt.',
      'Scramble the eggs in the butter in another pan.',
      'Split the biscuits and spoon the gravy over, with the eggs on the side.'
    ]
  },
  {
    id: 'beefstew', name: 'Slow-cooker beef stew', cuisine: 'American', protein: 'Beef', min: 25, serves: 6,
    tags: ['slowcooker', 'freezer'],
    ing: [['stewbeef', 2], ['flour', 0.25], ['potato', 2], ['carrot', 1], ['celery', 3], ['onion', 1], ['garlic', 3], ['beefbroth', 4], ['tomatopaste', 2], ['italianseasoning', 1], ['salt', 1], ['pepper', 0.5], ['frozenpeas', 1.5], ['bread', 6]],
    steps: [
      'Toss the beef with the flour, salt and pepper and put it in the slow cooker.',
      'Add the cubed potatoes, sliced carrots and celery, diced onion and garlic.',
      'Whisk the broth with the tomato paste and Italian seasoning and pour it over.',
      'Cook on low 8 hours or high 5 hours. Stir in the peas for the last 15 minutes.',
      'Serve with bread or toast for dunking.'
    ]
  },
  {
    id: 'dumplings', name: 'Chicken & dumplings', cuisine: 'American', protein: 'Chicken', min: 40, serves: 6,
    tags: ['onepot', 'kid'],
    ing: [['chickenthigh', 1.5], ['butter', 3], ['onion', 1], ['carrot', 0.5], ['celery', 2], ['flour', 0.25], ['chickenbroth', 6], ['milk', 1], ['frozenpeas', 1], ['biscuits', 8], ['salt', 1], ['pepper', 0.5]],
    steps: [
      'Melt the butter in a Dutch oven and cook the diced onion, carrot and celery 5 minutes.',
      'Stir in the flour, then slowly add the broth and milk. Add the chicken pieces, salt and pepper and simmer 15 minutes.',
      'Cut each biscuit into 4 pieces and drop them on the simmering stew with the peas.',
      'Cover and simmer on low 15 minutes without lifting the lid, until the dumplings are cooked through.'
    ]
  },
  {
    id: 'fishfry', name: 'Friday fish fry with fries & coleslaw', cuisine: 'American', protein: 'Fish', min: 35, serves: 4,
    tags: ['kid'], note: 'Wisconsin\'s Friday tradition, made in the oven.',
    ing: [['tilapia', 1.5], ['flour', 0.5], ['eggs', 2], ['breadcrumbs', 1.5], ['paprika', 1], ['garlicpowder', 1], ['salt', 1], ['vegoil', 3], ['fries', 24], ['cabbage', 0.5], ['carrot', 0.25], ['mayo', 5], ['sugar', 1], ['ricevinegar', 1], ['lemon', 1]],
    steps: [
      'Heat the oven to 425°F. Spread the fries on a sheet pan and start baking them as the bag says.',
      'For the coleslaw, mix the shredded cabbage and carrot with the mayo, sugar, vinegar and a pinch of salt. Chill.',
      'Pat the fish dry. Dip in flour, then beaten egg, then the breadcrumbs mixed with paprika, garlic powder and salt.',
      'Set the fish on an oiled pan, drizzle with oil and bake 12 to 15 minutes, until golden and it flakes easily.',
      'Serve with the fries, coleslaw and lemon wedges.'
    ]
  },
  {
    id: 'italianbeef', name: 'Slow-cooker Italian beef sandwiches', cuisine: 'Italian', protein: 'Beef', min: 15, serves: 6,
    tags: ['slowcooker', 'freezer'], note: 'Chicago style. Pickled pepper rings or giardiniera on top if you like it hot.',
    ing: [['chuckroast', 3], ['beefbroth', 2], ['italianseasoning', 3], ['garlic', 4], ['onion', 1], ['bellpepper', 2], ['redpepperflakes', 0.5], ['hoagies', 6], ['mozzarella', 1]],
    steps: [
      'Put the roast in the slow cooker with the broth, Italian seasoning, garlic, red pepper flakes and sliced onion.',
      'Cook on low 8 hours until it shreds easily. Shred it in the juices.',
      'Add the sliced bell peppers for the last 30 minutes.',
      'Pile the beef and peppers on the rolls, top with mozzarella, and spoon some juice over (or dip the whole sandwich).'
    ]
  },
  {
    id: 'blts', name: 'BLTs with oven fries', cuisine: 'American', protein: 'Pork', min: 30, serves: 4,
    tags: ['kid'],
    ing: [['bacon', 12], ['bread', 8], ['lettuce', 1], ['tomato', 2], ['mayo', 4], ['fries', 24]],
    steps: [
      'Bake the fries as the bag says.',
      'Lay the bacon on a sheet pan and bake at 400°F for 15 to 20 minutes until crisp. Drain on paper towels.',
      'Toast the bread and spread with mayo.',
      'Build sandwiches with 3 slices of bacon, lettuce and sliced tomato.'
    ]
  },
  {
    id: 'chickentenders', name: 'Homemade chicken tenders, fries & green beans', cuisine: 'American', protein: 'Chicken', min: 30, serves: 4,
    tags: ['kid'],
    ing: [['chickenbreast', 1.5], ['flour', 0.5], ['eggs', 2], ['breadcrumbs', 1.5], ['paprika', 1], ['garlicpowder', 1], ['salt', 1], ['vegoil', 3], ['fries', 24], ['greenbeans', 3.5], ['ketchup', 4], ['honey', 2], ['mustard', 2]],
    steps: [
      'Heat the oven to 425°F and start the fries as the bag says.',
      'Cut the chicken into strips. Dip in flour, then beaten egg, then breadcrumbs mixed with the paprika, garlic powder and salt.',
      'Set on an oiled sheet pan, drizzle with the oil and bake 15 to 18 minutes, turning once, until golden and cooked through.',
      'Mix the honey and mustard for dipping, and heat the green beans. Serve with ketchup too.'
    ]
  },
  {
    id: 'chickenspaghetti', name: 'Cheesy chicken spaghetti bake', cuisine: 'American', protein: 'Chicken', min: 20, serves: 6,
    tags: ['kid', 'freezer'],
    ing: [['spaghetti', 12], ['rotisserie', 3], ['creamofchicken', 1], ['dicedtom', 1], ['chickenbroth', 0.5], ['cheddar', 2], ['onion', 0.5], ['bellpepper', 1], ['garlicpowder', 1], ['pepper', 0.5]],
    steps: [
      'Heat the oven to 350°F. Cook the spaghetti until just tender and drain.',
      'Mix the soup, tomatoes with their juice, broth, 1 1/2 cups cheddar, the diced onion and pepper, garlic powder and pepper.',
      'Fold in the spaghetti and shredded chicken and spread in a 9x13 pan. Top with the rest of the cheese.',
      'Bake 30 minutes until bubbly.'
    ]
  },
  {
    id: 'hamburgergravy', name: 'Hamburger gravy over mashed potatoes', cuisine: 'American', protein: 'Beef', min: 30, serves: 4,
    tags: ['kid', 'onepot'], note: 'A cheap farmhouse supper.',
    ing: [['groundbeef', 1], ['onion', 1], ['flour', 0.25], ['beefbroth', 1], ['milk', 1.75], ['garlicpowder', 0.5], ['salt', 1], ['pepper', 1], ['potato', 2.5], ['butter', 3], ['frozencorn', 3.5]],
    steps: [
      'Boil the peeled, cubed potatoes until tender. Drain and mash with the butter, 1/2 cup milk and salt.',
      'Brown the beef with the diced onion. Don\'t drain it unless there\'s a lot of fat.',
      'Sprinkle the flour over and stir 1 minute. Slowly stir in the broth and the rest of the milk.',
      'Simmer until thick, 3 to 5 minutes. Season with garlic powder, salt and lots of pepper.',
      'Spoon over the mashed potatoes, with corn on the side.'
    ]
  },
  {
    id: 'baconranchchicken', name: 'Slow-cooker bacon ranch chicken sandwiches', cuisine: 'American', protein: 'Chicken', min: 15, serves: 6,
    tags: ['slowcooker', 'kid'],
    ing: [['chickenbreast', 2], ['creamcheese', 8], ['ranchmix', 1], ['bacon', 6], ['cheddar', 1], ['buns', 6], ['greenbeans', 3.5]],
    steps: [
      'Put the chicken in the slow cooker, sprinkle with the ranch mix and set the cream cheese on top.',
      'Cook on low 6 hours or high 3 hours.',
      'Cook the bacon until crisp and crumble it.',
      'Shred the chicken and stir everything together with the cheddar and bacon.',
      'Serve on buns, with green beans on the side.'
    ]
  },
  {
    id: 'cheeseburgermac', name: 'Cheeseburger macaroni', cuisine: 'American', protein: 'Beef', min: 25, serves: 4,
    tags: ['onepot', 'kid'], note: 'Like the boxed kind, made from scratch.',
    ing: [['groundbeef', 1], ['onion', 0.5], ['elbow', 8], ['beefbroth', 2], ['milk', 1], ['ketchup', 2], ['mustard', 1], ['cheddar', 1.5], ['garlicpowder', 0.5], ['paprika', 0.5], ['salt', 0.5], ['frozenpeas', 1.5]],
    steps: [
      'Brown the beef with the diced onion in a deep skillet and drain.',
      'Add the broth, milk, ketchup, mustard, garlic powder, paprika and salt and bring to a simmer.',
      'Stir in the dry macaroni. Cover and simmer about 12 minutes, stirring often, until tender.',
      'Stir in the cheddar until melted. Serve with peas.'
    ]
  }
);

// Dishes outside everyday American home cooking. With "Classic American" picked in Setup,
// these aren't planned. "Some new things" plans them now and then; "Anything goes" treats them
// like the rest. Tofu dinners are only planned for vegetarians or with "Anything goes".
(function () {
  var world = ['sweetpotatotacos', 'loadedsweetpotato', 'tuscanbeans', 'whitebeansoup', 'ricottapasta', 'pestozucchini',
    'salmonbowls', 'peanutnoodles', 'tofustirfry', 'tofucurry', 'peanutchicken', 'koreanbeef', 'lentilcurry',
    'chanamasala', 'chickencurry', 'shakshuka', 'greeksalad', 'greekwraps', 'chickpeasalad', 'caulichickpea',
    'lentilsoup', 'beanburgers', 'huevosrancheros'];
  RECIPES.forEach(function (r) { if (world.indexOf(r.id) >= 0) r.world = true; });
})();

// Built-in weeknight dinners. Quantities are for `serves` people and use each
// ingredient's unit from ingredients.js. `min` is hands-on time in minutes.
// Tags: sheetpan, slowcooker, onepot, kid, spicy, freezer (freezes well).
var RECIPES = [
  {
    id: 'fajitas', name: 'Sheet-pan chicken fajitas', cuisine: 'Mexican', protein: 'Chicken', min: 30, serves: 4,
    tags: ['sheetpan', 'kid'],
    ing: [['chickenbreast', 1.5], ['bellpepper', 3], ['onion', 1], ['tacoseasoning', 1], ['vegoil', 2], ['tortillas', 8], ['sourcream', 0.5], ['lime', 1]],
    steps: [
      'Heat the oven to 425°F. Slice the chicken, peppers and onion into thin strips.',
      'Toss everything on a sheet pan with the oil and taco seasoning. Spread it out in one layer.',
      'Roast 20 to 25 minutes, stirring once, until the chicken is cooked through.',
      'Squeeze lime over the pan. Warm the tortillas and serve with sour cream.'
    ]
  },
  {
    id: 'beeftacos', name: 'Ground beef tacos', cuisine: 'Mexican', protein: 'Beef', min: 20, serves: 4,
    tags: ['kid'],
    ing: [['groundbeef', 1], ['tacoseasoning', 1], ['corntortillas', 12], ['lettuce', 1], ['tomato', 2], ['cheddar', 1], ['salsa', 0.5], ['onion', 0.5]],
    steps: [
      'Brown the beef with the chopped onion in a skillet over medium-high heat. Drain the fat.',
      'Stir in the taco seasoning and 2/3 cup water. Simmer 5 minutes until thick.',
      'Shred the lettuce and dice the tomatoes. Warm the tortillas in a dry pan.',
      'Fill tortillas with beef, lettuce, tomato, cheese and salsa.'
    ]
  },
  {
    id: 'spagmeat', name: 'Spaghetti with meat sauce', cuisine: 'Italian', protein: 'Beef', min: 30, serves: 4,
    tags: ['kid', 'freezer'],
    ing: [['spaghetti', 16], ['groundbeef', 1], ['marinara', 24], ['onion', 1], ['garlic', 3], ['parmesan', 0.25], ['oliveoil', 1], ['italianseasoning', 1]],
    steps: [
      'Bring a big pot of salted water to a boil for the pasta.',
      'In a skillet, cook the chopped onion in oil 4 minutes. Add the beef and garlic and brown it. Drain.',
      'Add the marinara and Italian seasoning. Simmer 10 minutes.',
      'Cook the spaghetti, drain, and top with sauce and parmesan.'
    ]
  },
  {
    id: 'friedrice', name: 'Chicken fried rice', cuisine: 'Asian', protein: 'Chicken', min: 25, serves: 4,
    tags: ['onepot', 'kid'],
    ing: [['rice', 2], ['chickenthigh', 1], ['eggs', 3], ['frozenpeas', 1], ['carrot', 0.25], ['greenonion', 1], ['soysauce', 3], ['vegoil', 2], ['garlic', 2]],
    steps: [
      'Cook the rice (best done the day before and chilled so it fries instead of steaming).',
      'Dice the chicken and carrot. Stir-fry the chicken in hot oil until cooked, then push to the side.',
      'Scramble the eggs in the pan. Add the carrot, peas and garlic and cook 2 minutes.',
      'Add the rice and soy sauce. Fry 4 minutes, stirring. Top with sliced green onions.'
    ]
  },
  {
    id: 'beanquesadilla', name: 'Black bean & corn quesadillas', cuisine: 'Mexican', protein: 'Beans', min: 20, serves: 4,
    tags: ['kid'],
    ing: [['tortillas', 8], ['blackbeans', 2], ['cheddar', 2], ['frozencorn', 1], ['salsa', 0.5], ['cumin', 1], ['sourcream', 0.5]],
    steps: [
      'Drain and rinse the beans. Mash about half of them with the cumin.',
      'Spread beans on 4 tortillas. Add corn and cheese, then top with the other tortillas.',
      'Cook in a dry skillet over medium heat, 3 minutes a side, until crisp and melted.',
      'Cut into wedges. Serve with salsa and sour cream.'
    ]
  },
  {
    id: 'chickenchili', name: 'Slow-cooker chicken chili', cuisine: 'American', protein: 'Chicken', min: 15, serves: 4,
    tags: ['slowcooker', 'freezer', 'spicy'],
    ing: [['chickenthigh', 1.5], ['kidneybeans', 1], ['blackbeans', 1], ['dicedtom', 2], ['onion', 1], ['chilipowder', 3], ['cumin', 2], ['chickenbroth', 2], ['frozencorn', 1], ['cheddar', 0.5]],
    steps: [
      'Put the chicken, drained beans, tomatoes, chopped onion, spices and broth in the slow cooker.',
      'Cook on low 6 to 7 hours, or high 3 to 4 hours.',
      'Shred the chicken with two forks right in the pot. Stir in the corn and heat 10 minutes.',
      'Serve topped with cheese.'
    ]
  },
  {
    id: 'lemonsalmon', name: 'Lemon garlic salmon with rice', cuisine: 'American', protein: 'Fish', min: 25, serves: 4,
    tags: ['sheetpan'],
    ing: [['salmon', 1.5], ['lemon', 1], ['garlic', 3], ['butter', 3], ['rice', 1.5], ['broccoli', 1], ['oliveoil', 1]],
    steps: [
      'Thaw the salmon in the fridge overnight. Start the rice.',
      'Heat the oven to 400°F. Put the salmon and broccoli florets on a sheet pan and drizzle the broccoli with oil.',
      'Melt the butter with the minced garlic and lemon juice. Spoon it over the salmon.',
      'Bake 12 to 15 minutes until the salmon flakes. Serve over rice.'
    ]
  },
  {
    id: 'shrimpstirfry', name: 'Shrimp & vegetable stir-fry', cuisine: 'Asian', protein: 'Shrimp', min: 20, serves: 4,
    tags: ['onepot'],
    ing: [['shrimp', 1], ['stirfryveg', 4], ['rice', 1.5], ['soysauce', 3], ['honey', 1], ['garlic', 2], ['ginger', 1], ['cornstarch', 1], ['vegoil', 2]],
    steps: [
      'Start the rice. Thaw the shrimp in cold water for 10 minutes.',
      'Whisk the soy sauce, honey, cornstarch and 1/4 cup water.',
      'Stir-fry the vegetables in hot oil 4 minutes. Add the shrimp, garlic and grated ginger and cook 3 minutes.',
      'Pour in the sauce and stir until glossy. Serve over rice.'
    ]
  },
  {
    id: 'bakedziti', name: 'Cheesy baked ziti', cuisine: 'Italian', protein: 'Cheese', min: 40, serves: 4,
    tags: ['kid', 'freezer'],
    ing: [['penne', 16], ['marinara', 24], ['mozzarella', 2], ['parmesan', 0.25], ['sourcream', 0.5], ['italianseasoning', 1], ['garlic', 2]],
    steps: [
      'Heat the oven to 375°F. Boil the penne 2 minutes less than the box says. Drain.',
      'Stir the marinara, sour cream, minced garlic, seasoning and half the mozzarella into the pasta.',
      'Spread in a baking dish. Top with the rest of the mozzarella and the parmesan.',
      'Bake 20 minutes until bubbling.'
    ]
  },
  {
    id: 'lentilcurry', name: 'Red lentil coconut curry', cuisine: 'Indian', protein: 'Beans', min: 30, serves: 4,
    tags: ['onepot', 'freezer'],
    ing: [['lentils', 1.5], ['coconutmilk', 1], ['dicedtom', 1], ['onion', 1], ['garlic', 3], ['ginger', 1], ['curry', 4], ['rice', 1.5], ['spinach', 5], ['vegoil', 2], ['vegbroth', 2]],
    steps: [
      'Start the rice. Cook the chopped onion in oil 5 minutes.',
      'Add the garlic, grated ginger and curry powder. Stir 1 minute.',
      'Add the rinsed lentils, tomatoes, coconut milk and broth. Simmer 20 minutes until the lentils are soft.',
      'Stir in the spinach until it wilts. Salt to taste and serve over rice.'
    ]
  },
  {
    id: 'chanamasala', name: 'Chickpea tomato curry', cuisine: 'Indian', protein: 'Beans', min: 25, serves: 4,
    tags: ['onepot', 'freezer'],
    ing: [['chickpeas', 2], ['crushedtom', 1], ['onion', 1], ['garlic', 3], ['ginger', 1], ['curry', 3], ['cumin', 1], ['rice', 1.5], ['vegoil', 2], ['lemon', 1]],
    steps: [
      'Start the rice. Cook the chopped onion in oil until golden, about 7 minutes.',
      'Add the garlic, ginger, curry powder and cumin and stir 1 minute.',
      'Add the crushed tomatoes and drained chickpeas. Simmer 15 minutes.',
      'Finish with lemon juice and salt. Serve over rice.'
    ]
  },
  {
    id: 'sausagepotato', name: 'Sheet-pan sausage, potatoes & peppers', cuisine: 'American', protein: 'Pork', min: 35, serves: 4,
    tags: ['sheetpan', 'kid'],
    ing: [['sausage', 13], ['potato', 2], ['bellpepper', 2], ['onion', 1], ['oliveoil', 3], ['paprika', 1], ['garlicpowder', 1]],
    steps: [
      'Heat the oven to 425°F. Cut the potatoes into 1-inch cubes and the sausage into coins.',
      'Toss the potatoes with oil, paprika, garlic powder and salt. Roast 15 minutes.',
      'Add the sausage, sliced peppers and onion. Roast 15 to 20 minutes more until the potatoes are crisp.'
    ]
  },
  {
    id: 'honeygarlic', name: 'Honey garlic chicken thighs', cuisine: 'Asian', protein: 'Chicken', min: 35, serves: 4,
    tags: ['kid'],
    ing: [['chickenthigh', 2], ['honey', 4], ['soysauce', 3], ['garlic', 4], ['rice', 1.5], ['broccoli', 1], ['vegoil', 1]],
    steps: [
      'Start the rice. Season the chicken with salt and pepper.',
      'Brown the chicken in oil, 5 minutes a side. Add the broccoli florets around it with 2 tbsp water and cover 4 minutes.',
      'Mix the honey, soy sauce and minced garlic. Pour it in and simmer until sticky, about 4 minutes.',
      'Serve over rice.'
    ]
  },
  {
    id: 'burgers', name: 'Cheeseburgers & oven fries', cuisine: 'American', protein: 'Beef', min: 35, serves: 4,
    tags: ['kid'],
    ing: [['groundbeef', 1.5], ['buns', 4], ['cheddar', 0.5], ['lettuce', 1], ['tomato', 1], ['onion', 0.5], ['potato', 2], ['vegoil', 2]],
    steps: [
      'Heat the oven to 425°F. Cut the potatoes into wedges, toss with oil and salt, and roast 30 minutes.',
      'Shape the beef into 4 patties. Season well with salt and pepper.',
      'Cook in a hot skillet 4 minutes a side. Top with cheese for the last minute.',
      'Serve on buns with lettuce, tomato and onion.'
    ]
  },
  {
    id: 'chickensoup', name: 'Chicken noodle soup', cuisine: 'American', protein: 'Chicken', min: 40, serves: 4,
    tags: ['onepot', 'freezer', 'kid'],
    ing: [['chickenthigh', 1], ['carrot', 0.5], ['celery', 3], ['onion', 1], ['eggnoodles', 8], ['chickenbroth', 8], ['garlic', 2], ['italianseasoning', 1], ['butter', 1]],
    steps: [
      'Melt the butter in a big pot. Cook the chopped onion, carrot and celery 6 minutes.',
      'Add the garlic, seasoning, broth and whole chicken thighs. Simmer 20 minutes.',
      'Take out the chicken, shred it, and put it back.',
      'Add the noodles and cook 7 minutes. Salt to taste.'
    ]
  },
  {
    id: 'beefbroccoli', name: 'Ground beef & broccoli bowls', cuisine: 'Asian', protein: 'Beef', min: 25, serves: 4,
    tags: ['onepot'],
    ing: [['groundbeef', 1], ['broccoli', 1], ['soysauce', 4], ['brownsugar', 3], ['garlic', 3], ['ginger', 1], ['cornstarch', 1], ['rice', 1.5], ['greenonion', 1]],
    steps: [
      'Start the rice. Whisk the soy sauce, brown sugar, cornstarch and 1/2 cup water.',
      'Brown the beef in a large skillet. Drain. Add the garlic and grated ginger.',
      'Add the broccoli florets and the sauce. Cover and cook 5 minutes until the broccoli is tender.',
      'Serve over rice with green onions.'
    ]
  },
  {
    id: 'porkchops', name: 'Pork chops, mashed potatoes & green beans', cuisine: 'American', protein: 'Pork', min: 35, serves: 4,
    tags: ['kid'],
    ing: [['porkchop', 1.5], ['potato', 2], ['butter', 4], ['milk', 0.5], ['garlicpowder', 1], ['paprika', 1], ['greenbeans', 3], ['vegoil', 1]],
    steps: [
      'Peel and cube the potatoes. Boil 15 minutes until soft, then mash with butter, milk and salt.',
      'Rub the chops with paprika, garlic powder, salt and pepper.',
      'Sear in oil over medium-high heat, 4 to 5 minutes a side, until 145°F inside. Rest 5 minutes.',
      'Steam or microwave the green beans. Serve together.'
    ]
  },
  {
    id: 'eggfriedrice', name: 'Egg & veggie fried rice', cuisine: 'Asian', protein: 'Eggs', min: 20, serves: 4,
    tags: ['onepot'],
    ing: [['eggs', 5], ['rice', 2], ['stirfryveg', 3], ['soysauce', 3], ['greenonion', 1], ['garlic', 2], ['vegoil', 2]],
    steps: [
      'Cook the rice ahead and chill it if you can.',
      'Stir-fry the vegetables and garlic in hot oil 4 minutes. Push to one side.',
      'Scramble the eggs in the empty side. Add the rice and soy sauce.',
      'Fry 4 minutes, stirring. Top with green onions.'
    ]
  },
  {
    id: 'tunacasserole', name: 'Tuna noodle casserole', cuisine: 'American', protein: 'Fish', min: 40, serves: 4,
    tags: ['freezer'],
    ing: [['eggnoodles', 12], ['tuna', 3], ['frozenpeas', 1.5], ['butter', 3], ['flour', 0.25], ['milk', 2], ['cheddar', 1], ['breadcrumbs', 0.5], ['onion', 0.5]],
    steps: [
      'Heat the oven to 375°F. Boil the noodles 2 minutes short of done. Drain.',
      'Melt the butter, cook the chopped onion 3 minutes, then stir in the flour. Whisk in the milk and simmer until thick.',
      'Stir in the cheese, drained tuna, peas and noodles. Pour into a baking dish.',
      'Top with breadcrumbs. Bake 20 minutes until golden.'
    ]
  },
  {
    id: 'creamyspinachpasta', name: 'Creamy mushroom spinach pasta', cuisine: 'Italian', protein: 'Cheese', min: 25, serves: 4,
    tags: ['onepot'],
    ing: [['penne', 16], ['mushroom', 8], ['spinach', 5], ['garlic', 3], ['heavycream', 1], ['parmesan', 0.5], ['butter', 2]],
    steps: [
      'Boil the penne. Save 1/2 cup of pasta water before draining.',
      'Brown the sliced mushrooms in butter, about 6 minutes. Add the garlic.',
      'Add the cream and parmesan and simmer 2 minutes. Stir in the spinach until wilted.',
      'Toss with the pasta, loosening with pasta water as needed.'
    ]
  },
  {
    id: 'sloppyjoes', name: 'Sloppy joes', cuisine: 'American', protein: 'Beef', min: 20, serves: 4,
    tags: ['kid', 'freezer'],
    ing: [['groundbeef', 1], ['buns', 4], ['onion', 0.5], ['bellpepper', 1], ['tomatopaste', 3], ['brownsugar', 2], ['dijon', 1], ['chilipowder', 1], ['carrot', 0.5]],
    steps: [
      'Brown the beef with the chopped onion and pepper. Drain.',
      'Stir in the tomato paste, brown sugar, mustard, chili powder and 3/4 cup water.',
      'Simmer 10 minutes until thick.',
      'Pile onto buns. Serve with carrot sticks.'
    ]
  },
  {
    id: 'bbqdrumsticks', name: 'BBQ drumsticks with corn & potatoes', cuisine: 'American', protein: 'Chicken', min: 50, serves: 4,
    tags: ['sheetpan', 'kid'],
    ing: [['drumsticks', 3], ['bbqsauce', 1], ['frozencorn', 2], ['potato', 2], ['oliveoil', 2], ['garlicpowder', 1], ['paprika', 1]],
    steps: [
      'Heat the oven to 425°F. Season the drumsticks with paprika, garlic powder and salt.',
      'Cube the potatoes and toss with oil. Put the chicken and potatoes on a sheet pan and roast 35 minutes.',
      'Brush the chicken with BBQ sauce and roast 10 minutes more.',
      'Heat the corn with a little butter or salt. Serve.'
    ]
  },
  {
    id: 'pulledpork', name: 'Slow-cooker pulled pork sandwiches', cuisine: 'American', protein: 'Pork', min: 15, serves: 4,
    tags: ['slowcooker', 'freezer'],
    ing: [['porkshoulder', 2.5], ['bbqsauce', 1.5], ['onion', 1], ['buns', 4], ['cabbage', 0.5], ['mayo', 3], ['ricevinegar', 1], ['brownsugar', 1]],
    steps: [
      'Put the sliced onion in the slow cooker. Salt the pork and set it on top with 1 cup of the BBQ sauce.',
      'Cook on low 8 hours until it falls apart. Shred and stir in the rest of the sauce.',
      'For slaw, shred the cabbage and toss with mayo, vinegar, brown sugar and salt.',
      'Serve on buns with the slaw. Extra pork freezes well.'
    ]
  },
  {
    id: 'blackbeansoup', name: 'Black bean soup', cuisine: 'Mexican', protein: 'Beans', min: 30, serves: 4,
    tags: ['onepot', 'freezer'],
    ing: [['blackbeans', 3], ['onion', 1], ['carrot', 0.25], ['celery', 2], ['garlic', 3], ['cumin', 2], ['vegbroth', 3], ['salsa', 0.5], ['sourcream', 0.5], ['lime', 1], ['vegoil', 1]],
    steps: [
      'Cook the chopped onion, carrot and celery in oil 6 minutes. Add the garlic and cumin.',
      'Add the beans with their liquid, the broth and the salsa. Simmer 15 minutes.',
      'Blend about half the soup (or mash it in the pot) so it gets thick.',
      'Finish with lime juice. Serve with sour cream.'
    ]
  },
  {
    id: 'minestrone', name: 'Minestrone', cuisine: 'Italian', protein: 'Beans', min: 35, serves: 4,
    tags: ['onepot', 'freezer'],
    ing: [['kidneybeans', 1], ['dicedtom', 1], ['carrot', 0.25], ['celery', 2], ['onion', 1], ['zucchini', 1], ['elbow', 6], ['vegbroth', 6], ['italianseasoning', 2], ['garlic', 2], ['parmesan', 0.25], ['oliveoil', 2]],
    steps: [
      'Cook the chopped onion, carrot and celery in oil 6 minutes. Add the garlic.',
      'Add the broth, tomatoes, beans and seasoning. Simmer 10 minutes.',
      'Add the diced zucchini and the pasta. Cook 9 minutes.',
      'Serve with parmesan on top.'
    ]
  },
  {
    id: 'veggiepizza', name: 'Homemade veggie pizza', cuisine: 'Italian', protein: 'Cheese', min: 30, serves: 4,
    tags: ['kid'],
    ing: [['pizzadough', 2], ['marinara', 8], ['mozzarella', 3], ['bellpepper', 1], ['mushroom', 4], ['oliveoil', 1]],
    steps: [
      'Let the dough sit out 30 minutes. Heat the oven as hot as it goes (475°F or more).',
      'Stretch each ball onto an oiled sheet pan.',
      'Spread with marinara. Top with cheese, sliced pepper and mushrooms.',
      'Bake 12 to 15 minutes until the crust is browned underneath.'
    ]
  },
  {
    id: 'alfredo', name: 'Chicken & broccoli alfredo', cuisine: 'Italian', protein: 'Chicken', min: 30, serves: 4,
    tags: ['kid'],
    ing: [['chickenbreast', 1], ['penne', 16], ['heavycream', 1.5], ['parmesan', 0.75], ['butter', 3], ['garlic', 3], ['broccoli', 1]],
    steps: [
      'Boil the penne. Add the broccoli florets for the last 3 minutes. Drain.',
      'Cut the chicken into bites, season, and cook in 1 tbsp butter until done.',
      'Add the rest of the butter and the garlic, then the cream. Simmer 3 minutes. Stir in the parmesan.',
      'Toss with the pasta and broccoli.'
    ]
  },
  {
    id: 'teriyaki', name: 'Teriyaki chicken bowls', cuisine: 'Asian', protein: 'Chicken', min: 30, serves: 4,
    tags: ['kid'],
    ing: [['chickenthigh', 1.5], ['soysauce', 4], ['honey', 2], ['brownsugar', 2], ['garlic', 2], ['ginger', 1], ['cornstarch', 1], ['rice', 1.5], ['stirfryveg', 3], ['vegoil', 1]],
    steps: [
      'Start the rice. Whisk the soy sauce, honey, brown sugar, cornstarch, garlic, ginger and 1/3 cup water.',
      'Cut the chicken into bites and brown in oil until cooked.',
      'Add the vegetables and cook 4 minutes. Pour in the sauce and stir until thick.',
      'Serve over rice.'
    ]
  },
  {
    id: 'shakshuka', name: 'Shakshuka with toast', cuisine: 'Mediterranean', protein: 'Eggs', min: 25, serves: 4,
    tags: ['onepot', 'spicy'],
    ing: [['eggs', 8], ['crushedtom', 1], ['onion', 1], ['bellpepper', 1], ['garlic', 3], ['cumin', 1], ['paprika', 2], ['oliveoil', 2], ['bread', 8]],
    steps: [
      'Cook the sliced onion and pepper in oil 8 minutes. Add the garlic, cumin and paprika.',
      'Add the crushed tomatoes and simmer 8 minutes. Salt to taste.',
      'Make 8 wells and crack an egg into each. Cover and cook 6 to 8 minutes until the whites set.',
      'Serve with toast for dipping.'
    ]
  },
  {
    id: 'frittata', name: 'Potato & spinach frittata', cuisine: 'Mediterranean', protein: 'Eggs', min: 30, serves: 4,
    tags: ['onepot'],
    ing: [['eggs', 10], ['milk', 0.5], ['potato', 1], ['spinach', 3], ['cheddar', 1], ['onion', 0.5], ['bread', 8], ['butter', 2]],
    steps: [
      'Heat the oven to 400°F. Dice the potato small and cook in butter in an oven-safe skillet 10 minutes.',
      'Add the onion and spinach and cook until wilted.',
      'Whisk the eggs, milk, cheese and salt. Pour over the vegetables. Cook 2 minutes on the stove.',
      'Bake 12 minutes until set. Serve with toast.'
    ]
  },
  {
    id: 'tortillasoup', name: 'Chicken tortilla soup', cuisine: 'Mexican', protein: 'Chicken', min: 35, serves: 4,
    tags: ['onepot', 'freezer', 'spicy'],
    ing: [['chickenthigh', 1], ['chickenbroth', 6], ['dicedtom', 1], ['blackbeans', 1], ['frozencorn', 1], ['onion', 1], ['garlic', 2], ['chilipowder', 2], ['cumin', 1], ['lime', 1], ['corntortillas', 6], ['cilantro', 1], ['vegoil', 2]],
    steps: [
      'Cook the chopped onion in 1 tbsp oil 5 minutes. Add the garlic and spices.',
      'Add the broth, tomatoes and whole chicken thighs. Simmer 20 minutes, then shred the chicken.',
      'Add the beans and corn and heat through. Finish with lime juice.',
      'Cut the tortillas into strips and crisp them in the rest of the oil. Top the soup with strips and cilantro.'
    ]
  },
  {
    id: 'burritos', name: 'Bean, rice & cheese burritos', cuisine: 'Mexican', protein: 'Beans', min: 25, serves: 4,
    tags: ['kid', 'freezer'],
    ing: [['tortillas', 8], ['refried', 1], ['rice', 1], ['cheddar', 1.5], ['salsa', 1], ['cumin', 1]],
    steps: [
      'Cook the rice. Stir half the salsa into it.',
      'Warm the refried beans with the cumin.',
      'Fill tortillas with beans, rice and cheese. Roll up tightly.',
      'Toast seam side down in a skillet until golden. Serve with the rest of the salsa. Extras freeze well wrapped in foil.'
    ]
  },
  {
    id: 'turkeyskillet', name: 'Turkey taco rice skillet', cuisine: 'Mexican', protein: 'Turkey', min: 30, serves: 4,
    tags: ['onepot', 'kid'],
    ing: [['groundturkey', 1], ['rice', 1], ['chickenbroth', 2], ['salsa', 1], ['blackbeans', 1], ['frozencorn', 1], ['tacoseasoning', 1], ['cheddar', 1]],
    steps: [
      'Brown the turkey in a large skillet with a lid.',
      'Stir in the taco seasoning, uncooked rice, broth, salsa, drained beans and corn.',
      'Bring to a boil, cover, and cook on low 18 to 20 minutes until the rice is tender.',
      'Top with cheese, cover 2 minutes to melt.'
    ]
  },
  {
    id: 'sausagepasta', name: 'Italian sausage & pepper pasta', cuisine: 'Italian', protein: 'Pork', min: 30, serves: 4,
    tags: [],
    ing: [['italiansausage', 1], ['penne', 16], ['bellpepper', 2], ['onion', 1], ['marinara', 24], ['garlic', 2], ['parmesan', 0.25]],
    steps: [
      'Boil the penne.',
      'Brown the sausage, breaking it up. Add the sliced peppers and onion and cook 6 minutes.',
      'Add the garlic and marinara and simmer 5 minutes.',
      'Toss with the pasta and top with parmesan.'
    ]
  },
  {
    id: 'cabbagesausage', name: 'Sausage, cabbage & potato skillet', cuisine: 'American', protein: 'Pork', min: 30, serves: 4,
    tags: ['onepot'],
    ing: [['sausage', 13], ['cabbage', 1], ['onion', 1], ['potato', 1], ['butter', 2], ['paprika', 1], ['garlic', 2]],
    steps: [
      'Brown the sliced sausage in a big skillet. Set aside.',
      'Add the butter and diced potato. Cover and cook 10 minutes, stirring now and then.',
      'Add the sliced onion, chopped cabbage, garlic and paprika. Cover and cook 10 minutes until tender.',
      'Stir the sausage back in. Salt and pepper to taste.'
    ]
  },
  {
    id: 'peanutnoodles', name: 'Peanut noodles with cucumber', cuisine: 'Asian', protein: 'Peanut', min: 20, serves: 4,
    tags: ['spicy'],
    ing: [['spaghetti', 12], ['peanutbutter', 6], ['soysauce', 4], ['honey', 2], ['ricevinegar', 2], ['garlic', 2], ['sriracha', 1], ['carrot', 0.5], ['cucumber', 1], ['greenonion', 1]],
    steps: [
      'Boil the spaghetti. Save 1/2 cup of the water.',
      'Whisk the peanut butter, soy sauce, honey, vinegar, garlic and sriracha with a splash of hot pasta water.',
      'Toss the noodles with the sauce.',
      'Top with shredded carrot, sliced cucumber and green onions. Good warm or cold.'
    ]
  },
  {
    id: 'fishtacos', name: 'Crispy fish tacos with slaw', cuisine: 'Mexican', protein: 'Fish', min: 25, serves: 4,
    tags: [],
    ing: [['tilapia', 1.5], ['corntortillas', 12], ['cabbage', 0.5], ['lime', 2], ['sourcream', 0.5], ['sriracha', 1], ['chilipowder', 1], ['cumin', 1], ['vegoil', 2], ['cilantro', 1]],
    steps: [
      'Thaw the fish. Pat dry and season with chili powder, cumin and salt.',
      'Toss the shredded cabbage with lime juice and salt. Mix the sour cream and sriracha.',
      'Cook the fish in hot oil 3 minutes a side. Break into pieces.',
      'Fill warm tortillas with fish, slaw, sauce and cilantro.'
    ]
  },
  {
    id: 'meatballsubs', name: 'Meatball sandwiches', cuisine: 'Italian', protein: 'Beef', min: 25, serves: 4,
    tags: ['kid'],
    ing: [['meatballs', 1], ['marinara', 24], ['mozzarella', 1], ['buns', 4], ['carrot', 0.5]],
    steps: [
      'Simmer the frozen meatballs in the marinara, covered, 15 to 20 minutes.',
      'Heat the broiler. Open the buns on a pan.',
      'Fill with meatballs and sauce. Top with mozzarella and broil 2 minutes.',
      'Serve with carrot sticks.'
    ]
  },
  {
    id: 'lemonchicken', name: 'Lemon herb chicken & potatoes', cuisine: 'Mediterranean', protein: 'Chicken', min: 45, serves: 4,
    tags: ['sheetpan'],
    ing: [['chickenthigh', 2], ['potato', 2], ['lemon', 1], ['garlic', 4], ['oliveoil', 3], ['italianseasoning', 2], ['carrot', 0.5]],
    steps: [
      'Heat the oven to 425°F. Cut the potatoes and carrots into chunks.',
      'Mix the oil, lemon juice, minced garlic, seasoning and salt. Toss with the chicken and vegetables.',
      'Spread on a sheet pan and roast 35 to 40 minutes until the potatoes are golden.'
    ]
  },
  {
    id: 'chickencurry', name: 'Coconut chicken curry', cuisine: 'Indian', protein: 'Chicken', min: 35, serves: 4,
    tags: ['onepot', 'freezer'],
    ing: [['chickenthigh', 1.5], ['coconutmilk', 1], ['curry', 4], ['onion', 1], ['garlic', 3], ['ginger', 1], ['tomatopaste', 2], ['rice', 1.5], ['frozenpeas', 1], ['vegoil', 1]],
    steps: [
      'Start the rice. Cook the chopped onion in oil 5 minutes.',
      'Add the garlic, ginger, curry powder and tomato paste. Stir 1 minute.',
      'Add the chicken in bites and the coconut milk. Simmer 15 minutes.',
      'Stir in the peas for 2 minutes. Serve over rice.'
    ]
  },
  {
    id: 'macbroccoli', name: 'Stovetop mac & cheese with broccoli', cuisine: 'American', protein: 'Cheese', min: 25, serves: 4,
    tags: ['kid', 'onepot'],
    ing: [['elbow', 16], ['cheddar', 3], ['milk', 2], ['butter', 4], ['flour', 0.25], ['broccoli', 1], ['dijon', 1]],
    steps: [
      'Boil the macaroni. Add the broccoli florets for the last 3 minutes. Drain.',
      'In the same pot melt the butter, stir in the flour, then whisk in the milk. Simmer until thick.',
      'Stir in the cheese and mustard until smooth.',
      'Fold in the pasta and broccoli. Salt to taste.'
    ]
  },
  {
    id: 'sweetpotatotacos', name: 'Sweet potato & black bean tacos', cuisine: 'Mexican', protein: 'Beans', min: 35, serves: 4,
    tags: ['sheetpan'],
    ing: [['sweetpotato', 2], ['blackbeans', 1], ['corntortillas', 12], ['chilipowder', 2], ['cumin', 1], ['oliveoil', 2], ['avocado', 1], ['lime', 1], ['sourcream', 0.5], ['cabbage', 0.25]],
    steps: [
      'Heat the oven to 425°F. Dice the sweet potatoes and toss with oil, chili powder, cumin and salt.',
      'Roast 25 minutes. Add the drained beans for the last 5 minutes.',
      'Mash the avocado with lime juice and salt.',
      'Fill tortillas with the filling, shredded cabbage, avocado and sour cream.'
    ]
  },
  {
    id: 'scampi', name: 'Garlic shrimp scampi pasta', cuisine: 'Italian', protein: 'Shrimp', min: 25, serves: 4,
    tags: [],
    ing: [['shrimp', 1], ['spaghetti', 16], ['butter', 4], ['garlic', 5], ['lemon', 1], ['redpepperflakes', 0.5], ['parmesan', 0.25], ['spinach', 3]],
    steps: [
      'Boil the spaghetti. Save 1/2 cup of the water. Thaw the shrimp in cold water.',
      'Melt the butter, add the garlic and pepper flakes, and cook 1 minute.',
      'Add the shrimp and cook 3 minutes until pink. Add the spinach, lemon juice and a splash of pasta water.',
      'Toss with the pasta and parmesan.'
    ]
  },
  {
    id: 'ramenbowls', name: 'Loaded ramen bowls', cuisine: 'Asian', protein: 'Eggs', min: 15, serves: 4,
    tags: ['spicy'],
    ing: [['ramen', 4], ['eggs', 4], ['stirfryveg', 2], ['greenonion', 1], ['soysauce', 2], ['sriracha', 1]],
    steps: [
      'Boil the eggs 7 minutes, then cool in cold water and peel.',
      'Cook the noodles with half the seasoning packets. Add the vegetables for the last 2 minutes.',
      'Season with soy sauce and sriracha to taste.',
      'Top each bowl with a halved egg and green onions.'
    ]
  },
  {
    id: 'chickenquesadilla', name: 'Chicken & pepper quesadillas', cuisine: 'Mexican', protein: 'Chicken', min: 25, serves: 4,
    tags: ['kid'],
    ing: [['chickenbreast', 1], ['tortillas', 8], ['cheddar', 2], ['bellpepper', 1], ['salsa', 0.5], ['tacoseasoning', 1], ['vegoil', 1]],
    steps: [
      'Cut the chicken into small pieces. Cook in oil with the taco seasoning and a splash of water.',
      'Add the diced pepper and cook 3 minutes.',
      'Fill tortillas with cheese and the chicken mix. Cook 3 minutes a side in a dry skillet.',
      'Cut into wedges and serve with salsa.'
    ]
  },
  {
    id: 'cottagepie', name: 'Cottage pie', cuisine: 'American', protein: 'Beef', min: 50, serves: 4,
    tags: ['freezer', 'kid'],
    ing: [['groundbeef', 1], ['potato', 2], ['frozenpeas', 1], ['carrot', 0.5], ['onion', 1], ['tomatopaste', 2], ['chickenbroth', 1], ['flour', 0.125], ['butter', 3], ['milk', 0.5]],
    steps: [
      'Heat the oven to 400°F. Boil the cubed potatoes 15 minutes, then mash with butter, milk and salt.',
      'Brown the beef with the chopped onion and carrot. Stir in the flour and tomato paste.',
      'Add the broth and simmer 5 minutes until thick. Stir in the peas.',
      'Spread in a baking dish, top with the mash, and bake 20 minutes.'
    ]
  },
  {
    id: 'eggrollbowl', name: 'Egg roll in a bowl', cuisine: 'Asian', protein: 'Turkey', min: 20, serves: 4,
    tags: ['onepot', 'spicy'],
    ing: [['groundturkey', 1], ['cabbage', 1], ['carrot', 0.5], ['soysauce', 3], ['garlic', 3], ['ginger', 1], ['greenonion', 1], ['sriracha', 1], ['rice', 1.5], ['vegoil', 1]],
    steps: [
      'Start the rice. Brown the turkey in oil in a large skillet.',
      'Add the garlic and grated ginger, then the shredded cabbage and carrot.',
      'Cook 6 minutes until the cabbage softens. Stir in the soy sauce.',
      'Serve over rice with green onions and sriracha.'
    ]
  },
  {
    id: 'pancakes', name: 'Pancakes & bacon', cuisine: 'American', protein: 'Pork', min: 30, serves: 4,
    tags: ['kid'],
    ing: [['flour', 2], ['eggs', 2], ['milk', 1.5], ['butter', 3], ['bakingpowder', 4], ['sugar', 2], ['bacon', 8], ['syrup', 0.5]],
    steps: [
      'Heat the oven to 400°F. Lay the bacon on a sheet pan and bake 15 to 18 minutes.',
      'Whisk the flour, baking powder, sugar and a pinch of salt. Add the milk, eggs and melted butter. Stir just until mixed.',
      'Cook 1/4 cup scoops on a buttered pan over medium heat until bubbles form, then flip.',
      'Serve with syrup and bacon.'
    ]
  },
  {
    id: 'pestochicken', name: 'Pesto chicken pasta', cuisine: 'Italian', protein: 'Chicken', min: 25, serves: 4,
    tags: [],
    ing: [['chickenbreast', 1], ['penne', 16], ['pesto', 6], ['tomato', 3], ['parmesan', 0.25], ['spinach', 3], ['oliveoil', 1]],
    steps: [
      'Boil the penne. Save 1/2 cup of the water.',
      'Cook the chicken pieces in oil until done.',
      'Add the spinach and chopped tomatoes until the spinach wilts.',
      'Toss everything with the pesto, parmesan and a splash of pasta water.'
    ]
  },
  {
    id: 'turkeychili', name: 'Turkey & bean chili', cuisine: 'American', protein: 'Turkey', min: 40, serves: 4,
    tags: ['onepot', 'freezer', 'spicy'],
    ing: [['groundturkey', 1], ['kidneybeans', 2], ['crushedtom', 1], ['onion', 1], ['bellpepper', 1], ['garlic', 3], ['chilipowder', 4], ['cumin', 2], ['cheddar', 0.5], ['sourcream', 0.5], ['vegoil', 1]],
    steps: [
      'Brown the turkey in oil with the chopped onion and pepper.',
      'Add the garlic, chili powder and cumin and stir 1 minute.',
      'Add the tomatoes and drained beans with 1 cup water. Simmer 25 minutes.',
      'Serve with cheese and sour cream.'
    ]
  },

  // Lower-carb dinners: built around protein, beans and non-starchy vegetables.
  {
    id: 'lettucewraps', name: 'Turkey taco lettuce wraps', cuisine: 'Mexican', protein: 'Turkey', min: 20, serves: 4,
    tags: ['lowcarb'],
    ing: [['groundturkey', 1], ['blackbeans', 1], ['chilipowder', 2], ['cumin', 1], ['garlicpowder', 1], ['lettuce', 1], ['tomato', 2], ['cheddar', 1], ['sourcream', 0.5], ['salsa', 0.5], ['vegoil', 1]],
    steps: [
      'Brown the turkey in oil. Stir in the spices, a pinch of salt and 1/4 cup water.',
      'Add the drained beans and cook 3 minutes.',
      'Separate the romaine into leaves and dice the tomatoes.',
      'Spoon the filling into lettuce cups. Top with tomato, cheese, salsa and sour cream.'
    ]
  },
  {
    id: 'chickenvegpan', name: 'Sheet-pan chicken & vegetables', cuisine: 'Mediterranean', protein: 'Chicken', min: 35, serves: 4,
    tags: ['sheetpan', 'lowcarb'],
    ing: [['chickenthigh', 2], ['broccoli', 1], ['bellpepper', 2], ['zucchini', 1], ['oliveoil', 3], ['italianseasoning', 2], ['garlicpowder', 1], ['lemon', 1]],
    steps: [
      'Heat the oven to 425°F. Cut the chicken into large pieces and the vegetables into bite-size chunks.',
      'Toss everything with the oil, seasoning, garlic powder and salt.',
      'Spread on a sheet pan and roast 25 minutes, until the chicken is cooked and the edges brown.',
      'Squeeze lemon over the top.'
    ]
  },
  {
    id: 'zucchinibeef', name: 'Cheesy beef & zucchini skillet', cuisine: 'Italian', protein: 'Beef', min: 25, serves: 4,
    tags: ['onepot', 'lowcarb'],
    ing: [['groundbeef', 1], ['zucchini', 3], ['dicedtom', 1], ['onion', 1], ['garlic', 2], ['italianseasoning', 1], ['mozzarella', 1], ['parmesan', 0.25], ['oliveoil', 1]],
    steps: [
      'Brown the beef with the chopped onion. Drain and add the garlic.',
      'Add the sliced zucchini, tomatoes and seasoning. Cover and cook 8 minutes until tender.',
      'Top with mozzarella and parmesan, cover, and cook 2 minutes to melt.'
    ]
  },
  {
    id: 'salmongreenbeans', name: 'Garlic butter salmon & green beans', cuisine: 'American', protein: 'Fish', min: 20, serves: 4,
    tags: ['sheetpan', 'lowcarb'],
    ing: [['salmon', 1.5], ['greenbeans', 3.5], ['lemon', 1], ['butter', 3], ['garlic', 3], ['oliveoil', 1]],
    steps: [
      'Thaw the salmon in the fridge overnight. Heat the oven to 400°F.',
      'Toss the green beans with oil and salt on a sheet pan. Set the salmon beside them.',
      'Melt the butter with the minced garlic and lemon juice and spoon it over the salmon.',
      'Bake 12 to 15 minutes until the salmon flakes.'
    ]
  },
  {
    id: 'cauliburrito', name: 'Chicken burrito bowls with cauliflower rice', cuisine: 'Mexican', protein: 'Chicken', min: 30, serves: 4,
    tags: ['lowcarb'],
    ing: [['chickenthigh', 1.5], ['cauliflower', 1], ['blackbeans', 1], ['salsa', 1], ['cheddar', 1], ['lime', 1], ['chilipowder', 2], ['cumin', 1], ['vegoil', 2], ['cilantro', 1]],
    steps: [
      'Grate the cauliflower on a box grater, or pulse it in a food processor, until it looks like rice.',
      'Season the chicken with chili powder, cumin and salt. Cook in 1 tbsp oil until done, then slice.',
      'Cook the cauliflower in the rest of the oil 5 minutes. Add lime juice, chopped cilantro and salt.',
      'Fill bowls with cauliflower rice, warm beans, chicken, salsa and cheese.'
    ]
  },
  {
    id: 'greeksalad', name: 'Greek-style chicken salad', cuisine: 'Mediterranean', protein: 'Chicken', min: 25, serves: 4,
    tags: ['lowcarb'],
    ing: [['chickenbreast', 1.5], ['lettuce', 2], ['cucumber', 1], ['tomato', 3], ['redonion', 1], ['chickpeas', 1], ['oliveoil', 4], ['lemon', 1], ['italianseasoning', 2]],
    steps: [
      'Season the chicken with half the Italian seasoning and salt. Cook in 1 tbsp oil, 6 minutes a side, then slice.',
      'Whisk the rest of the oil with the lemon juice, the rest of the seasoning and salt.',
      'Chop the romaine, cucumber, tomatoes and onion. Add the drained chickpeas.',
      'Toss with the dressing and top with the chicken.'
    ]
  },
  {
    id: 'shrimpcauli', name: 'Garlic shrimp & broccoli over cauliflower rice', cuisine: 'Asian', protein: 'Shrimp', min: 25, serves: 4,
    tags: ['lowcarb'],
    ing: [['shrimp', 1], ['broccoli', 1], ['cauliflower', 1], ['soysauce', 3], ['garlic', 4], ['ginger', 1], ['vegoil', 2], ['greenonion', 1]],
    steps: [
      'Thaw the shrimp in cold water. Grate the cauliflower into rice-size pieces.',
      'Cook the cauliflower in 1 tbsp oil 5 minutes. Season with salt and set aside.',
      'Stir-fry the broccoli florets in the rest of the oil 4 minutes. Add the shrimp, garlic and ginger and cook 3 minutes.',
      'Add the soy sauce. Serve over the cauliflower rice with green onions.'
    ]
  },
  {
    id: 'beanchili', name: 'Three-veg black bean chili', cuisine: 'American', protein: 'Beans', min: 35, serves: 4,
    tags: ['onepot', 'freezer', 'lowcarb'],
    ing: [['blackbeans', 1], ['kidneybeans', 1], ['dicedtom', 2], ['onion', 1], ['bellpepper', 1], ['zucchini', 1], ['chilipowder', 3], ['cumin', 2], ['garlic', 3], ['vegbroth', 2], ['oliveoil', 1], ['cheddar', 0.5]],
    steps: [
      'Cook the chopped onion and pepper in oil 5 minutes. Add the garlic and spices.',
      'Add the drained beans, tomatoes, diced zucchini and broth.',
      'Simmer 20 minutes until thick. Salt to taste.',
      'Serve with cheese on top.'
    ]
  },
  {
    id: 'porkcaulimash', name: 'Pork chops with cauliflower mash', cuisine: 'American', protein: 'Pork', min: 30, serves: 4,
    tags: ['lowcarb'],
    ing: [['porkchop', 1.5], ['cauliflower', 1], ['butter', 3], ['garlic', 2], ['greenbeans', 3], ['paprika', 1], ['garlicpowder', 1], ['vegoil', 1]],
    steps: [
      'Cut the cauliflower into florets and boil 10 minutes until very soft. Drain well.',
      'Mash with the butter, garlic and salt, or blend until smooth.',
      'Rub the chops with paprika, garlic powder and salt. Sear in oil 4 to 5 minutes a side, to 145°F.',
      'Heat the green beans and serve everything together.'
    ]
  },
  {
    id: 'eggmuffinbake', name: 'Spinach, pepper & cheese egg bake', cuisine: 'American', protein: 'Eggs', min: 35, serves: 4,
    tags: ['lowcarb'],
    ing: [['eggs', 10], ['milk', 0.5], ['spinach', 5], ['bellpepper', 1], ['onion', 0.5], ['cheddar', 1], ['mushroom', 4], ['butter', 1]],
    steps: [
      'Heat the oven to 375°F and butter a baking dish.',
      'Cook the chopped onion, pepper and mushrooms in butter 5 minutes. Add the spinach until wilted.',
      'Whisk the eggs, milk, cheese and salt. Stir in the vegetables and pour into the dish.',
      'Bake 25 minutes until set in the middle.'
    ]
  }
];

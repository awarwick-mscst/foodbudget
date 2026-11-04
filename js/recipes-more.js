// More weeknight dinners, same format as recipes.js.
RECIPES.push(
  // From the owner's recipe collection.
  {
    id: 'gnocchiskillet', name: 'Creamy chicken gnocchi skillet', cuisine: 'Italian', protein: 'Chicken', min: 30, serves: 7,
    tags: ['onepot', 'kid', 'mealprep'],
    ing: [['chickenbreast', 2.5], ['onion', 1], ['garlic', 4], ['italianseasoning', 2], ['chickenbroth', 2.5], ['gnocchi', 32], ['creamcheese', 8], ['parmesan', 1.5], ['spinach', 4]],
    steps: [
      'Dice the chicken and season it with the Italian seasoning, salt and pepper.',
      'Cook in a large skillet over medium-high heat 6 to 8 minutes until cooked through.',
      'Add the diced onion and garlic and cook 2 to 3 minutes until soft.',
      'Pour in the broth and add the gnocchi. Cover and simmer 6 to 8 minutes until the gnocchi is tender.',
      'Stir in the cream cheese and parmesan until the sauce is smooth. Fold in the spinach until it wilts.'
    ]
  },
  {
    id: 'cheesybeefpasta', name: 'Cheesy beef pasta skillet', cuisine: 'Italian', protein: 'Beef', min: 30, serves: 3,
    tags: ['kid'], note: 'Adapted from a recipe by Jack Perez. High protein.',
    ing: [['leanbeef', 1], ['proteinpasta', 4.8], ['onion', 0.33], ['garlic', 1.67], ['tomatopaste', 0.67], ['crushedtom', 0.33], ['beefbroth', 0.33], ['paprika', 1], ['salt', 0.33], ['pepper', 0.33], ['parmesan', 0.33], ['mozzarella', 0.67]],
    steps: [
      'Cook the pasta in salted water until al dente. Save about 1/3 cup of the water, then drain.',
      'Brown the beef in a skillet over medium-high heat, breaking it up. Add the diced onion and cook until soft.',
      'Stir in the garlic, smoked paprika, salt, pepper and tomato paste. Cook 1 to 2 minutes until the paste darkens.',
      'Add the crushed tomatoes and broth. Simmer on medium-low 5 to 7 minutes until a little thicker.',
      'Stir in the pasta. On low heat, fold in the parmesan and mozzarella until melted, loosening with pasta water if needed.'
    ]
  },
  {
    id: 'sausagebroccolipasta', name: 'One-pan smoked sausage, broccoli & cheddar pasta', cuisine: 'American', protein: 'Pork', min: 25, serves: 4,
    tags: ['onepot', 'kid'],
    ing: [['sausage', 13], ['penne', 10], ['alfredo', 15], ['broccoli', 0.3], ['cheddar', 1], ['chickenbroth', 2.25]],
    steps: [
      'Slice the sausage into coins and brown both sides in a large deep skillet over medium-high heat.',
      'Stir in the dry pasta, Alfredo sauce and 2 cups of broth so the pasta is mostly covered.',
      'Bring to a gentle boil, then cover and simmer on medium-low 8 to 10 minutes, stirring now and then. Add a splash more broth if it gets thick.',
      'Stir in the chopped broccoli (frozen is fine). Cover and cook 3 to 5 minutes until the pasta and broccoli are tender.',
      'Take off the heat and fold in the cheddar until creamy. Season with salt and pepper.'
    ]
  },

  {
    id: 'taconight', name: 'Classic taco night', cuisine: 'Mexican', protein: 'Beef', min: 20, serves: 4,
    tags: ['kid'],
    ing: [['groundbeef', 1], ['tacoseasoning', 1], ['onion', 0.5], ['tomato', 2], ['lettuce', 1], ['cheddar', 1], ['tortillas', 8], ['nachochips', 4], ['sourcream', 0.5], ['pickledjalapenos', 2], ['tacosauce', 4]],
    steps: [
      'Brown the beef in a skillet over medium-high heat. Drain the fat.',
      'Stir in the taco seasoning and the water the packet calls for. Simmer 5 minutes until thick.',
      'While it simmers, dice the onion and tomatoes, shred the lettuce, and warm the flour tortillas.',
      'Set everything out: beef, onion, tomato, lettuce, cheddar, sour cream, pickled jalapeños and taco sauce. Serve with nacho cheese chips on the side or crushed on top.'
    ]
  },

  // Mexican
  {
    id: 'enchiladas', name: 'Chicken enchiladas', cuisine: 'Mexican', protein: 'Chicken', min: 40, serves: 4,
    tags: ['kid', 'freezer'],
    ing: [['rotisserie', 3], ['corntortillas', 10], ['enchiladasauce', 2.5], ['cheddar', 1.5], ['onion', 0.5], ['greenchiles', 1], ['sourcream', 0.5]],
    steps: [
      'Heat the oven to 375°F. Shred the chicken and mix it with the diced onion, green chiles and half the cheese.',
      'Warm the tortillas so they bend. Spread a little sauce in a baking dish.',
      'Roll the filling into the tortillas and line them up seam side down. Pour the rest of the sauce over and top with the remaining cheese.',
      'Bake 20 minutes until bubbling. Serve with sour cream.'
    ]
  },
  {
    id: 'beantostadas', name: 'Crispy pinto bean tostadas', cuisine: 'Mexican', protein: 'Beans', min: 20, serves: 4,
    tags: ['kid'],
    ing: [['corntortillas', 8], ['pintobeans', 2], ['cumin', 1], ['salsa', 0.5], ['lettuce', 1], ['cheddar', 1], ['sourcream', 0.5], ['vegoil', 2]],
    steps: [
      'Heat the oven to 425°F. Brush the tortillas with oil and bake on a sheet pan 8 to 10 minutes until crisp.',
      'Warm the drained beans with the cumin and a splash of water, mashing them roughly.',
      'Spread beans on each crisp tortilla and top with cheese. Bake 2 minutes to melt.',
      'Finish with shredded lettuce, salsa and sour cream.'
    ]
  },
  {
    id: 'huevosrancheros', name: 'Huevos rancheros', cuisine: 'Mexican', protein: 'Eggs', min: 20, serves: 4,
    tags: [],
    ing: [['eggs', 8], ['corntortillas', 8], ['blackbeans', 1], ['salsa', 1], ['cheddar', 0.5], ['avocado', 1], ['vegoil', 2]],
    steps: [
      'Warm the drained beans with half the salsa.',
      'Fry the tortillas in a little oil until lightly crisp. Keep them warm.',
      'Fry the eggs in the same pan to your liking.',
      'Top each pair of tortillas with beans, two eggs, the rest of the salsa, cheese and sliced avocado.'
    ]
  },
  {
    id: 'breakfastburritos', name: 'Potato, egg & cheese burritos', cuisine: 'Mexican', protein: 'Eggs', min: 30, serves: 4,
    tags: ['freezer', 'kid'],
    ing: [['eggs', 8], ['potato', 1], ['tortillas', 4], ['cheddar', 1], ['salsa', 0.5], ['bellpepper', 1], ['onion', 0.5], ['butter', 2]],
    steps: [
      'Dice the potato small and cook in butter, covered, 10 minutes until tender. Add the diced pepper and onion for 3 minutes.',
      'Whisk the eggs with salt and scramble them into the vegetables.',
      'Fill the tortillas with the egg mix, cheese and salsa and roll up tightly.',
      'Toast seam side down in a dry pan. Extras freeze well wrapped in foil.'
    ]
  },
  {
    id: 'salsachicken', name: 'Slow-cooker salsa chicken bowls', cuisine: 'Mexican', protein: 'Chicken', min: 15, serves: 4,
    tags: ['slowcooker', 'kid', 'freezer'],
    ing: [['chickenbreast', 2], ['salsa', 2], ['tacoseasoning', 1], ['blackbeans', 1], ['frozencorn', 1], ['rice', 1.5], ['cheddar', 1]],
    steps: [
      'Put the chicken in the slow cooker. Sprinkle with taco seasoning and pour the salsa over.',
      'Cook on low 6 hours or high 3 hours. Shred the chicken in the sauce.',
      'Stir in the drained beans and corn and heat 15 minutes. Cook the rice.',
      'Serve over rice with cheese.'
    ]
  },
  {
    id: 'whitechili', name: 'Slow-cooker white chicken chili', cuisine: 'Mexican', protein: 'Chicken', min: 15, serves: 4,
    tags: ['slowcooker', 'freezer'],
    ing: [['chickenthigh', 1.5], ['whitebeans', 2], ['greenchiles', 1], ['chickenbroth', 3], ['onion', 1], ['cumin', 2], ['garlic', 3], ['frozencorn', 1], ['sourcream', 0.5], ['lime', 1]],
    steps: [
      'Put the chicken, drained beans, green chiles, broth, chopped onion, garlic and cumin in the slow cooker.',
      'Cook on low 6 hours or high 3 hours.',
      'Shred the chicken. Stir in the corn and sour cream and heat 10 minutes.',
      'Finish with lime juice and salt.'
    ]
  },
  {
    id: 'carnitas', name: 'Slow-cooker pork carnitas tacos', cuisine: 'Mexican', protein: 'Pork', min: 20, serves: 4,
    tags: ['slowcooker', 'freezer'],
    ing: [['porkshoulder', 2.5], ['onion', 1], ['garlic', 4], ['cumin', 2], ['chilipowder', 1], ['lime', 2], ['corntortillas', 12], ['cilantro', 1], ['salsa', 0.5]],
    steps: [
      'Rub the pork with cumin, chili powder and salt. Put it in the slow cooker on the sliced onion and garlic with the juice of 1 lime.',
      'Cook on low 8 hours until it falls apart. Shred it.',
      'Spread the meat on a sheet pan and broil 4 to 5 minutes until the edges crisp.',
      'Serve in warm tortillas with cilantro, salsa and lime wedges.'
    ]
  },
  {
    id: 'nachos', name: 'Sheet-pan beef nachos', cuisine: 'Mexican', protein: 'Beef', min: 25, serves: 4,
    tags: ['sheetpan', 'kid'],
    ing: [['tortillachips', 10], ['groundbeef', 1], ['tacoseasoning', 1], ['blackbeans', 1], ['cheddar', 2], ['tomato', 2], ['sourcream', 0.5], ['salsa', 0.5], ['jalapeno', 1]],
    steps: [
      'Heat the oven to 400°F. Brown the beef, drain, and stir in the taco seasoning and 1/2 cup water.',
      'Spread the chips on a sheet pan. Top with beef, drained beans and cheese.',
      'Bake 8 to 10 minutes until the cheese melts.',
      'Top with diced tomato, sliced jalapeño, salsa and sour cream.'
    ]
  },
  {
    id: 'beanenchiladabake', name: 'Cheese & bean enchilada bake', cuisine: 'Mexican', protein: 'Beans', min: 40, serves: 4,
    tags: ['freezer', 'kid'],
    ing: [['corntortillas', 10], ['pintobeans', 2], ['enchiladasauce', 2.5], ['cheddar', 2], ['frozencorn', 1], ['onion', 0.5], ['cumin', 1]],
    steps: [
      'Heat the oven to 375°F. Mix the drained beans, corn, diced onion and cumin.',
      'Spread some sauce in a baking dish. Layer tortillas, beans, sauce and cheese, then repeat.',
      'Finish with sauce and cheese on top.',
      'Bake 25 minutes until bubbling. Rest 5 minutes before cutting.'
    ]
  },
  {
    id: 'shrimptacos', name: 'Chili-lime shrimp tacos', cuisine: 'Mexican', protein: 'Shrimp', min: 20, serves: 4,
    tags: [],
    ing: [['shrimp', 1], ['corntortillas', 12], ['cabbage', 0.5], ['lime', 2], ['sourcream', 0.5], ['sriracha', 1], ['chilipowder', 1], ['garlicpowder', 1], ['vegoil', 1], ['avocado', 1]],
    steps: [
      'Thaw the shrimp. Toss with chili powder, garlic powder, salt and the juice of 1 lime.',
      'Shred the cabbage and toss with the rest of the lime juice and salt. Mix the sour cream with sriracha.',
      'Cook the shrimp in hot oil 2 minutes a side until pink.',
      'Fill warm tortillas with shrimp, slaw, sliced avocado and sauce.'
    ]
  },

  // Italian & Mediterranean
  {
    id: 'ricottapasta', name: 'Spinach & ricotta baked pasta', cuisine: 'Italian', protein: 'Cheese', min: 40, serves: 4,
    tags: ['freezer', 'kid'],
    ing: [['penne', 16], ['ricotta', 1.75], ['marinara', 24], ['spinach', 5], ['mozzarella', 1], ['parmesan', 0.25], ['garlic', 2]],
    steps: [
      'Heat the oven to 375°F. Boil the pasta 2 minutes short of done. Drain.',
      'Mix the ricotta with the chopped spinach, garlic, half the parmesan and a pinch of salt.',
      'Toss the pasta with the marinara, then fold in the ricotta mix. Spread in a baking dish.',
      'Top with mozzarella and the rest of the parmesan. Bake 20 minutes.'
    ]
  },
  {
    id: 'whitebeansoup', name: 'Sausage, white bean & spinach soup', cuisine: 'Italian', protein: 'Pork', min: 35, serves: 4,
    tags: ['onepot', 'freezer'],
    ing: [['italiansausage', 1], ['whitebeans', 2], ['chickenbroth', 6], ['spinach', 5], ['onion', 1], ['carrot', 0.25], ['garlic', 3], ['dicedtom', 1], ['parmesan', 0.25]],
    steps: [
      'Brown the sausage in a soup pot, breaking it up. Add the chopped onion and carrot and cook 5 minutes.',
      'Add the garlic, broth, tomatoes and drained beans. Simmer 15 minutes.',
      'Stir in the spinach until it wilts.',
      'Serve with parmesan on top.'
    ]
  },
  {
    id: 'greekwraps', name: 'Greek chicken wraps', cuisine: 'Mediterranean', protein: 'Chicken', min: 25, serves: 4,
    tags: [],
    ing: [['chickenbreast', 1.5], ['tortillas', 4], ['cucumber', 1], ['tomato', 2], ['redonion', 0.5], ['feta', 0.5], ['sourcream', 0.5], ['lettuce', 1], ['italianseasoning', 2], ['oliveoil', 2], ['lemon', 1]],
    steps: [
      'Toss the chicken with oil, Italian seasoning, half the lemon juice and salt. Cook 6 minutes a side, then slice.',
      'Grate half the cucumber and stir it into the sour cream with the rest of the lemon juice for a quick sauce.',
      'Chop the rest of the cucumber, the tomatoes, onion and lettuce.',
      'Fill the tortillas with chicken, vegetables, feta and sauce, then roll up.'
    ]
  },
  {
    id: 'chickpeasalad', name: 'Mediterranean chickpea salad', cuisine: 'Mediterranean', protein: 'Beans', min: 15, serves: 4,
    tags: ['lowcarb'],
    ing: [['chickpeas', 2], ['cucumber', 1], ['tomato', 3], ['redonion', 1], ['feta', 0.5], ['oliveoil', 3], ['lemon', 1], ['italianseasoning', 1], ['lettuce', 1]],
    steps: [
      'Drain and rinse the chickpeas.',
      'Chop the cucumber, tomatoes and red onion.',
      'Whisk the oil, lemon juice, Italian seasoning and salt.',
      'Toss everything with chopped lettuce and top with feta.'
    ]
  },
  {
    id: 'baconpasta', name: 'Bacon, tomato & spinach spaghetti', cuisine: 'Italian', protein: 'Pork', min: 25, serves: 4,
    tags: [],
    ing: [['spaghetti', 16], ['bacon', 8], ['tomato', 4], ['spinach', 5], ['garlic', 3], ['parmesan', 0.5]],
    steps: [
      'Boil the spaghetti. Save 1/2 cup of the water.',
      'Cook the chopped bacon until crisp. Pour off all but 2 tbsp of the fat.',
      'Add the garlic and chopped tomatoes and cook 3 minutes. Add the spinach until it wilts.',
      'Toss with the pasta, parmesan and enough pasta water to coat.'
    ]
  },
  {
    id: 'chickenparm', name: 'Baked chicken parmesan', cuisine: 'Italian', protein: 'Chicken', min: 40, serves: 4,
    tags: ['kid'],
    ing: [['chickenbreast', 1.5], ['breadcrumbs', 0.75], ['eggs', 1], ['parmesan', 0.5], ['marinara', 12], ['mozzarella', 1], ['spaghetti', 12], ['oliveoil', 2], ['italianseasoning', 1]],
    steps: [
      'Heat the oven to 425°F. Slice the breasts in half to make thin cutlets.',
      'Dip in beaten egg, then in breadcrumbs mixed with half the parmesan and the seasoning. Set on an oiled sheet pan and drizzle with oil.',
      'Bake 15 minutes. Spoon marinara over each piece, top with mozzarella and the rest of the parmesan, and bake 5 minutes more.',
      'Serve with spaghetti tossed in the rest of the sauce.'
    ]
  },
  {
    id: 'tuscanbeans', name: 'Tuscan white beans & greens with toast', cuisine: 'Italian', protein: 'Beans', min: 20, serves: 4,
    tags: ['onepot'],
    ing: [['whitebeans', 2], ['spinach', 5], ['tomato', 4], ['garlic', 4], ['oliveoil', 3], ['parmesan', 0.25], ['bread', 8], ['italianseasoning', 1], ['redpepperflakes', 0.5]],
    steps: [
      'Cook the sliced garlic and pepper flakes in the oil 1 minute.',
      'Add the chopped tomatoes and seasoning and cook 5 minutes until saucy.',
      'Add the beans with a splash of water and simmer 5 minutes. Stir in the spinach until wilted.',
      'Top with parmesan and serve with toast.'
    ]
  },
  {
    id: 'pestozucchini', name: 'Pesto zucchini spaghetti', cuisine: 'Italian', protein: 'Cheese', min: 20, serves: 4,
    tags: [],
    ing: [['spaghetti', 16], ['zucchini', 2], ['pesto', 6], ['tomato', 3], ['parmesan', 0.25], ['oliveoil', 1]],
    steps: [
      'Boil the spaghetti. Save 1/2 cup of the water.',
      'Cook the diced zucchini in the oil 5 minutes until golden.',
      'Add the chopped tomatoes for 1 minute.',
      'Toss with the pasta, pesto, parmesan and a splash of pasta water.'
    ]
  },
  {
    id: 'stuffedpeppers', name: 'Turkey & rice stuffed peppers', cuisine: 'Italian', protein: 'Turkey', min: 50, serves: 4,
    tags: ['freezer'],
    ing: [['groundturkey', 1], ['bellpepper', 4], ['rice', 0.5], ['dicedtom', 1], ['onion', 0.5], ['garlic', 2], ['italianseasoning', 1], ['mozzarella', 1]],
    steps: [
      'Heat the oven to 375°F. Cook the rice.',
      'Brown the turkey with the chopped onion and garlic. Stir in the tomatoes, seasoning and rice.',
      'Cut the peppers in half, scoop out the seeds, and fill with the mixture.',
      'Cover with foil and bake 30 minutes. Top with mozzarella and bake 5 minutes uncovered.'
    ]
  },
  {
    id: 'caulichickpea', name: 'Roasted cauliflower & chickpeas with lemon sauce', cuisine: 'Mediterranean', protein: 'Beans', min: 35, serves: 4,
    tags: ['sheetpan', 'lowcarb'],
    ing: [['cauliflower', 1], ['chickpeas', 2], ['oliveoil', 3], ['curry', 2], ['cumin', 1], ['garlicpowder', 1], ['lemon', 1], ['sourcream', 0.5]],
    steps: [
      'Heat the oven to 425°F. Cut the cauliflower into florets and drain the chickpeas.',
      'Toss with the oil, curry powder, cumin, garlic powder and salt.',
      'Roast 25 minutes, stirring once, until browned.',
      'Stir the lemon juice into the sour cream with a pinch of salt and drizzle over the top.'
    ]
  },
  {
    id: 'lentilsoup', name: 'Lemony lentil & spinach soup', cuisine: 'Mediterranean', protein: 'Beans', min: 40, serves: 4,
    tags: ['onepot', 'freezer'],
    ing: [['lentils', 1.5], ['carrot', 0.5], ['celery', 3], ['onion', 1], ['garlic', 3], ['dicedtom', 1], ['vegbroth', 6], ['cumin', 2], ['lemon', 1], ['spinach', 5], ['oliveoil', 2]],
    steps: [
      'Cook the chopped onion, carrot and celery in the oil 6 minutes. Add the garlic and cumin.',
      'Add the rinsed lentils, tomatoes and broth. Simmer 25 minutes until the lentils are soft.',
      'Stir in the spinach until wilted.',
      'Finish with lemon juice and salt.'
    ]
  },

  // Asian
  {
    id: 'tofustirfry', name: 'Crispy tofu & broccoli stir-fry', cuisine: 'Asian', protein: 'Tofu', min: 30, serves: 4,
    tags: [],
    ing: [['tofu', 1], ['broccoli', 1], ['soysauce', 3], ['honey', 1], ['garlic', 2], ['ginger', 1], ['cornstarch', 2], ['vegoil', 3], ['rice', 1.5], ['greenonion', 1]],
    steps: [
      'Start the rice. Press the tofu dry with towels and cut it into cubes. Toss with 1 tbsp cornstarch.',
      'Fry the tofu in 2 tbsp oil until golden on all sides. Set aside.',
      'Stir-fry the broccoli in the rest of the oil 4 minutes. Add the garlic and ginger.',
      'Whisk the soy sauce, honey, the rest of the cornstarch and 1/4 cup water. Add with the tofu and stir until glossy. Serve over rice.'
    ]
  },
  {
    id: 'tofucurry', name: 'Coconut tofu & vegetable curry', cuisine: 'Asian', protein: 'Tofu', min: 30, serves: 4,
    tags: ['onepot'],
    ing: [['tofu', 1], ['coconutmilk', 1], ['curry', 4], ['stirfryveg', 3], ['onion', 1], ['garlic', 2], ['ginger', 1], ['rice', 1.5], ['vegoil', 2], ['soysauce', 1]],
    steps: [
      'Start the rice. Cube the tofu and brown it in the oil. Set aside.',
      'Cook the chopped onion 4 minutes, then add the garlic, ginger and curry powder.',
      'Add the coconut milk, soy sauce and vegetables. Simmer 8 minutes.',
      'Stir the tofu back in and serve over rice.'
    ]
  },
  {
    id: 'lomein', name: 'Chicken lo mein', cuisine: 'Asian', protein: 'Chicken', min: 25, serves: 4,
    tags: ['kid'],
    ing: [['spaghetti', 12], ['chickenthigh', 1], ['stirfryveg', 3], ['soysauce', 4], ['honey', 1], ['garlic', 2], ['ginger', 1], ['vegoil', 2], ['greenonion', 1]],
    steps: [
      'Boil the spaghetti 1 minute short of done. Drain and toss with a little oil.',
      'Stir-fry the sliced chicken in hot oil until cooked. Add the vegetables, garlic and ginger for 3 minutes.',
      'Add the noodles, soy sauce and honey.',
      'Toss over high heat 2 minutes. Top with green onions.'
    ]
  },
  {
    id: 'peanutchicken', name: 'Peanut chicken rice bowls', cuisine: 'Asian', protein: 'Chicken', min: 25, serves: 4,
    tags: ['spicy'],
    ing: [['chickenthigh', 1.5], ['peanutbutter', 4], ['soysauce', 3], ['honey', 1], ['lime', 1], ['garlic', 2], ['stirfryveg', 3], ['rice', 1.5], ['sriracha', 1], ['vegoil', 1]],
    steps: [
      'Start the rice. Whisk the peanut butter, soy sauce, honey, lime juice, garlic, sriracha and 1/3 cup hot water.',
      'Brown the chicken pieces in the oil until cooked.',
      'Add the vegetables and cook 4 minutes. Pour in the sauce and stir to coat.',
      'Serve over rice.'
    ]
  },
  {
    id: 'koreanbeef', name: 'Korean-style beef rice bowls', cuisine: 'Asian', protein: 'Beef', min: 20, serves: 4,
    tags: ['spicy'],
    ing: [['groundbeef', 1], ['soysauce', 4], ['brownsugar', 2], ['garlic', 3], ['ginger', 1], ['greenonion', 1], ['rice', 1.5], ['cucumber', 1], ['sriracha', 1]],
    steps: [
      'Start the rice. Brown the beef and drain.',
      'Add the garlic and ginger, then the soy sauce and brown sugar. Simmer 3 minutes.',
      'Slice the cucumber thin and toss with a pinch of salt.',
      'Serve the beef over rice with cucumber, green onions and sriracha.'
    ]
  },
  {
    id: 'salmonbowls', name: 'Salmon rice bowls with spicy mayo', cuisine: 'Asian', protein: 'Fish', min: 25, serves: 4,
    tags: [],
    ing: [['salmon', 1], ['rice', 1.5], ['cucumber', 1], ['avocado', 1], ['soysauce', 3], ['sriracha', 1], ['mayo', 2], ['greenonion', 1], ['honey', 1]],
    steps: [
      'Thaw the salmon. Start the rice. Heat the oven to 400°F.',
      'Brush the salmon with soy sauce and honey. Bake 12 minutes, then flake it.',
      'Mix the mayo and sriracha.',
      'Fill bowls with rice, salmon, sliced cucumber and avocado. Drizzle with spicy mayo and top with green onions.'
    ]
  },

  // American
  {
    id: 'chilimac', name: 'One-pot chili mac', cuisine: 'American', protein: 'Beef', min: 30, serves: 4,
    tags: ['onepot', 'kid', 'freezer'],
    ing: [['groundbeef', 1], ['elbow', 8], ['kidneybeans', 1], ['crushedtom', 1], ['chilipowder', 3], ['cumin', 1], ['onion', 1], ['cheddar', 1], ['beefbroth', 2]],
    steps: [
      'Brown the beef with the chopped onion in a large pot. Drain.',
      'Add the spices, crushed tomatoes, broth and drained beans. Bring to a boil.',
      'Stir in the macaroni. Cover and simmer 12 minutes, stirring often, until the pasta is tender.',
      'Top with cheese and cover until melted.'
    ]
  },
  {
    id: 'stroganoff', name: 'Hamburger stroganoff', cuisine: 'American', protein: 'Beef', min: 30, serves: 4,
    tags: ['kid'],
    ing: [['groundbeef', 1], ['eggnoodles', 12], ['mushroom', 8], ['onion', 1], ['sourcream', 1], ['beefbroth', 2], ['flour', 0.125], ['garlic', 2], ['butter', 2]],
    steps: [
      'Boil the noodles and drain.',
      'Brown the beef and drain. Add the butter, sliced mushrooms and onion and cook 6 minutes.',
      'Stir in the garlic and flour, then the broth. Simmer until thick, about 4 minutes.',
      'Take off the heat and stir in the sour cream. Serve over the noodles.'
    ]
  },
  {
    id: 'beanburgers', name: 'Black bean burgers', cuisine: 'American', protein: 'Beans', min: 30, serves: 4,
    tags: ['kid', 'freezer'],
    ing: [['blackbeans', 2], ['breadcrumbs', 0.5], ['eggs', 1], ['cumin', 1], ['chilipowder', 1], ['buns', 4], ['lettuce', 1], ['tomato', 1], ['cheddar', 0.5], ['vegoil', 2]],
    steps: [
      'Drain the beans and pat them dry. Mash well, leaving some chunks.',
      'Mix in the egg, breadcrumbs, spices and salt. Shape into 4 patties and chill 10 minutes.',
      'Cook in the oil over medium heat, 4 to 5 minutes a side, until crisp. Top with cheese.',
      'Serve on buns with lettuce and tomato.'
    ]
  },
  {
    id: 'potatobar', name: 'Loaded baked potatoes with broccoli', cuisine: 'American', protein: 'Cheese', min: 15, serves: 4,
    tags: ['kid'],
    ing: [['potato', 3], ['broccoli', 1], ['cheddar', 1.5], ['sourcream', 0.5], ['bacon', 6], ['greenonion', 1], ['butter', 2]],
    steps: [
      'Poke the potatoes with a fork. Microwave 10 to 12 minutes, turning once, or bake 1 hour at 400°F.',
      'Cook the bacon until crisp and crumble it. Steam the broccoli florets.',
      'Split the potatoes and fluff the insides with butter and salt.',
      'Top with broccoli, cheese, bacon, sour cream and green onions.'
    ]
  },
  {
    id: 'loadedsweetpotato', name: 'Black bean stuffed sweet potatoes', cuisine: 'American', protein: 'Beans', min: 15, serves: 4,
    tags: [],
    ing: [['sweetpotato', 3], ['blackbeans', 1], ['salsa', 0.5], ['cheddar', 1], ['sourcream', 0.5], ['greenonion', 1], ['cumin', 1]],
    steps: [
      'Poke the sweet potatoes and microwave 10 to 12 minutes until soft, or bake 50 minutes at 400°F.',
      'Warm the drained beans with the salsa and cumin.',
      'Split the potatoes and fill with the beans.',
      'Top with cheese, sour cream and green onions.'
    ]
  },
  {
    id: 'lemontilapia', name: 'Lemon pepper tilapia with rice & peas', cuisine: 'American', protein: 'Fish', min: 25, serves: 4,
    tags: ['kid'],
    ing: [['tilapia', 1.5], ['lemon', 1], ['pepper', 1], ['butter', 2], ['rice', 1.5], ['frozenpeas', 2], ['garlicpowder', 1], ['paprika', 1]],
    steps: [
      'Thaw the fish. Start the rice. Heat the oven to 400°F.',
      'Set the fish on a lined pan. Season with pepper, garlic powder, paprika and salt, and dot with butter.',
      'Bake 10 to 12 minutes until it flakes. Squeeze lemon over it.',
      'Heat the peas and stir them into the rice.'
    ]
  },
  {
    id: 'cajunsausagerice', name: 'Cajun-style sausage & rice skillet', cuisine: 'American', protein: 'Pork', min: 35, serves: 4,
    tags: ['onepot', 'spicy'],
    ing: [['sausage', 13], ['rice', 1], ['chickenbroth', 2.5], ['bellpepper', 1], ['onion', 1], ['celery', 2], ['dicedtom', 1], ['paprika', 2], ['garlic', 2], ['redpepperflakes', 0.5]],
    steps: [
      'Brown the sliced sausage in a deep skillet. Add the chopped onion, pepper and celery and cook 5 minutes.',
      'Stir in the garlic, paprika, pepper flakes and uncooked rice.',
      'Add the broth and tomatoes. Bring to a boil, cover, and cook on low 20 minutes.',
      'Rest 5 minutes, then fluff and serve.'
    ]
  },
  {
    id: 'chickenricecasserole', name: 'Cheesy chicken, broccoli & rice casserole', cuisine: 'American', protein: 'Chicken', min: 45, serves: 4,
    tags: ['kid', 'freezer'],
    ing: [['chickenthigh', 1], ['rice', 1.5], ['broccoli', 1], ['cheddar', 1.5], ['milk', 1], ['chickenbroth', 2], ['butter', 2], ['flour', 0.125], ['garlicpowder', 1]],
    steps: [
      'Heat the oven to 375°F. Cook the rice in the broth. Cook the diced chicken in a skillet until done.',
      'Melt the butter, stir in the flour, then whisk in the milk until thick. Stir in 1 cup of the cheese and the garlic powder.',
      'Mix the rice, chicken, chopped broccoli and sauce in a baking dish. Top with the rest of the cheese.',
      'Bake 20 minutes until bubbling.'
    ]
  },
  {
    id: 'chickenpotatogreenbeans', name: 'Garlic chicken, potato & green bean skillet', cuisine: 'American', protein: 'Chicken', min: 35, serves: 4,
    tags: ['onepot', 'kid'],
    ing: [['chickenthigh', 1.5], ['potato', 1.5], ['greenbeans', 3], ['garlic', 3], ['butter', 2], ['italianseasoning', 1], ['paprika', 1], ['vegoil', 1]],
    steps: [
      'Dice the potatoes small. Cook them covered in the oil 10 minutes, stirring now and then.',
      'Push them aside. Add the chicken pieces seasoned with paprika, Italian seasoning and salt, and brown them.',
      'Add the green beans. Cover and cook 6 minutes until everything is tender.',
      'Stir in the butter and garlic for 1 minute.'
    ]
  }
);

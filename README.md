# FoodBudge

A free meal planner. You tell it how many people you're feeding, which nights you cook,
your weekly budget and what you like. It picks dinners that stay under budget, builds a
grocery list priced by whole packs, and keeps track of what's left in your pantry so the
next week uses it up.

No account, no server, no subscription. Everything is saved on the phone.

## What it does

- **Week plan**: dinners picked for your cooking nights, under your budget. Each one shows its cost per serving.
- **Swap**: replace any dinner. Options show how your grocery total would change (green = cheaper).
- **Nights off**: mark a night as leftovers, eating out or night off. Its groceries come off the list.
- **Two-week plans**: shop once; fresh produce for week 2 goes on a separate "buy later" list.
- **Grocery list**: grouped by aisle, whole packs (a 3 lb bag, not "1 onion"), with how long each item keeps.
- **Your store's prices**: tap any price to set what your store charges. It's remembered.
- **Pantry**: tap "I have it" to take something off the list. After you shop, the rest of each pack moves to the pantry the next week, with use-by reminders and freeze tips.
- **Thaw reminder**: the night before a dinner with meat or fish.
- **Diabetes-friendly mode**: pick a carb target per dinner (30, 45 or 60 g). Plans stay near it, starchy sides get smaller portions when needed, sugary sauces are avoided, and every recipe shows carbs and fiber per serving. Carb counts are estimates.
- **Nutrition**: every recipe shows calories, protein, fat, carbs, fiber, added sugar and sodium per serving, estimated from typical ingredient data. Filters for 30 g+ protein and under 500 calories.
- **Likes and dislikes**: liked dinners come up more, disliked ones stop showing up.
- **Your own recipes**: add family recipes; they get priced and planned like the rest.
- **Share with your household**: copy a plan code and paste it on another phone.
- **Backup**: copy all your data as text and restore it on a new phone.

The first time someone opens the app, a setup wizard asks how many people they feed, where
they live (ZIP or postal code), which store they use, their budget, which nights they cook,
what they don't eat and what they like.

Prices are estimates of regular US store-brand prices (late 2026), adjusted for the chosen
store and area (Canada is priced in Canadian dollars). They aren't live store prices, so
people can also set exact prices on the grocery list.

## Try it on your computer

```bash
python -m http.server 8765
```

Then open http://localhost:8765.

## Put it on your Android phone (free)

1. Make a free GitHub account and a new public repository, e.g. `foodbudge`.
2. Upload everything in this folder except `dist/` and `.claude/`.
3. In the repository: **Settings → Pages → Deploy from a branch → main → / (root)** → Save.
4. After a minute your app is at `https://<your-username>.github.io/foodbudge/`.
5. Open that link in Chrome on your phone, tap the **⋮** menu → **Add to Home screen** → **Install**.

It now opens like a normal app and works offline.

## Publish to Google Play (you already have a developer account)

1. Host the app first (steps above).
2. Go to https://www.pwabuilder.com, paste your GitHub Pages link, and choose **Package for stores → Android**.
3. Download the package. It contains an `.aab` file and a `assetlinks.json` file.
4. Put `assetlinks.json` at `https://<your-username>.github.io/.well-known/assetlinks.json`
   (this needs a repository named `<your-username>.github.io` with a `.well-known` folder).
   This removes the browser address bar inside the app.
5. In Google Play Console, create an app and upload the `.aab`. Keep the signing key PWABuilder gives you somewhere safe.

## Updating

After changing files, bump `CACHE` in `sw.js` (for example `foodbudge-v2`) so phones pick up the new version.

`node tools/build-single.js` makes `dist/foodbudge.html`, a one-file copy of the app.

## Files

- `js/ingredients.js`: ingredient catalog with pack sizes and prices
- `js/recipes.js`, `js/recipes-more.js`: the 100 built-in dinners
- `js/nutrition.js`: nutrition per ingredient
- `js/stores.js`: stores and regional price adjustments
- `js/planner.js`: budget math and plan picking
- `js/app.js`: screens
- `css/app.css`: styles
- `sw.js`, `manifest.webmanifest`, `icons/`: install and offline support

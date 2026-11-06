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
- **Diabetes-friendly mode**: pick a carb target per dinner (25, 45 or 60 g). Every planned dinner stays at or under it, starchy sides get smaller portions when needed (down to about a third), sugary sauces are avoided, and every recipe shows carbs and fiber per serving. Carb counts are estimates.
- **Nutrition**: every recipe shows calories, protein, fat, saturated fat, cholesterol, carbs, fiber, added sugar and sodium per serving, estimated from typical ingredient data.
- **Health goals**: lower cholesterol, fewer calories, more protein, less sodium, more fiber. Each one makes healthier swaps in recipes (lean beef, olive oil, Greek yogurt, low-sodium broth, brown rice, whole wheat pasta), sets limits on what gets planned, and the week view shows average dinner nutrition against the goals.
- **Dinner style**: "Classic American home cooking" (the default) plans everyday dinners like meatloaf, hotdish, pot roast, tacos, spaghetti and chili. "Mostly classic, some new things" adds a curry or Korean beef now and then, and "Anything goes" uses every recipe. Tofu dinners are only planned for vegetarians or with "Anything goes".
- **Leave out**: food groups (pork, beef, dairy, gluten...), mushrooms and spicy food, plus anything you type in, like lima beans or olives. Dinners with it in the recipe stop showing up.
- **Likes and dislikes**: liked dinners come up more, disliked ones stop showing up.
- **Your own recipes**: add family recipes; they get priced and planned like the rest.
- **Share with your household**: copy a plan code and paste it on another phone.
- **Backup**: copy all your data as text and restore it on a new phone.

The first time someone opens the app, a setup wizard asks how many people they feed, where
they live (ZIP or postal code), which store they use, their budget, which nights they cook,
what they don't eat and what they like.

## Where prices come from

1. **U.S. government price data, updated every month.** `tools/update-prices.js` downloads the
   U.S. Bureau of Labor Statistics' latest average grocery prices (eggs, ground beef, chicken,
   milk, butter, cheese, bread, pasta, rice, flour, sugar and more) and food inflation for each
   food group (fresh vegetables, beef, dairy, sauces...). It writes `js/prices-data.js`.
   A GitHub Action (`.github/workflows/update-prices.yml`) runs it on the 16th and 26th of each
   month and commits any changes, so the app keeps up with rising prices on its own.
   No account or key is needed. You can also run it by hand: `node tools/update-prices.js`.
2. **Adjusted for your store and area.** Each store has a price level (Aldi is about 16% below a
   typical supermarket) and the ZIP code adds a regional adjustment. Canada uses the same data,
   converted to Canadian dollars.
3. **Live Kroger prices (optional).** For Kroger-family stores, a small free server can fetch
   real shelf and sale prices for the store you pick. See [worker/README.md](worker/README.md).
   It's off until you set `krogerProxy` in `js/config.js`.
4. **Your own prices win.** Tap any price on the grocery list to set what your store charges.

The grocery list marks items whose price went up or down 8% or more in a year, and items on sale.

To run the price update from GitHub: open the repository's **Actions** tab, choose
**Update prices**, then **Run workflow**. If Actions asks for permission to write, go to
**Settings → Actions → General → Workflow permissions** and choose **Read and write permissions**.

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

- `js/ingredients.js`: ingredient catalog with pack sizes and starting prices
- `js/prices-data.js`: this month's prices (generated, don't edit)
- `js/config.js`: optional Kroger price server address
- `js/kroger.js`: live Kroger prices in the app
- `tools/update-prices.js`, `.github/workflows/update-prices.yml`: monthly price update
- `worker/`: the optional Kroger price server
- `js/recipes.js`, `js/recipes-more.js`, `js/recipes-classic.js`: the 131 built-in dinners (the last file also marks which ones count as other cuisines)
- `js/nutrition.js`: nutrition per ingredient
- `js/stores.js`: stores and regional price adjustments
- `js/planner.js`: budget math and plan picking
- `js/app.js`: screens
- `css/app.css`: styles
- `sw.js`, `manifest.webmanifest`, `icons/`: install and offline support

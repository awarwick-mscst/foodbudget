# Live Kroger prices (optional)

FoodBudge works without this. Set it up when you want real shelf and sale prices for people
who shop at a Kroger-family store: Kroger, Ralphs, Fred Meyer, King Soopers, City Market,
Dillons, Smith's, Fry's, QFC, Harris Teeter, Mariano's, Pick 'n Save, Food 4 Less and others.

It's a tiny server that runs free on Cloudflare. It keeps your Kroger key private and turns
Kroger products into FoodBudge's pack prices. Results are saved for 6 hours per store, so many
phones share each lookup (Kroger allows 10,000 product lookups a day for free).

## 1. Get a Kroger key (free)

1. Go to https://developer.kroger.com and create an account.
2. Choose **Create App**. Name it FoodBudge, pick the **Production** environment, and turn on **Products**.
   For the redirect URL you can enter your FoodBudge address (it isn't used).
3. Keep the page that shows your **Client ID** and **Client Secret** open for step 3.

## 2. Make a Cloudflare account (free)

Sign up at https://dash.cloudflare.com/sign-up. No credit card is needed for Workers.

## 3. Put the server online

You need Node.js installed. In a terminal:

```
cd C:\Users\aaron\source\claude\foodbudge\worker
npx wrangler login
npx wrangler secret put KROGER_CLIENT_ID
npx wrangler secret put KROGER_CLIENT_SECRET
npx wrangler deploy
```

Each `secret put` asks you to paste the value. The last command prints your server's address,
something like `https://foodbudge-kroger.your-name.workers.dev`.

If your FoodBudge site isn't `https://awarwick-mscst.github.io`, change `ALLOWED_ORIGIN` in
`wrangler.toml` first.

## 4. Turn it on in FoodBudge

Put the address in `js/config.js`:

```js
krogerProxy: 'https://foodbudge-kroger.your-name.workers.dev'
```

Bump `CACHE` in `sw.js`, then commit and push. In the app, pick **Kroger** as your store
(Setup → Where you shop) and choose your store from the list. Grocery prices then come from that
store, sale prices included. Anything Kroger doesn't match keeps the estimated price.

## Test it

Open `https://foodbudge-kroger.your-name.workers.dev/stores?zip=45202` in a browser.
You should see a list of nearby stores.

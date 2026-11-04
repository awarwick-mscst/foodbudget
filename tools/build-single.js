// Bundles the app into one self-contained HTML file (dist/foodbudge.html),
// for hosts that serve a single page. Run: node tools/build-single.js
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const scripts = ['js/ingredients.js', 'js/recipes.js', 'js/nutrition.js', 'js/stores.js', 'js/planner.js', 'js/app.js']
  .map((p) => '<script>\n' + read(p).replace(/<\/script/gi, '<\\/script') + '\n</script>')
  .join('\n');

const html = `<title>FoodBudge</title>
<meta name="claude:viewport-fit-sides" content="cover">
<meta name="description" content="Free weekly dinner plans that fit your grocery budget.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=IBM+Plex+Mono:wght@500;600&display=swap">
<style>
${read('css/app.css')}
</style>
<div class="app" id="app"></div>
<div class="tabbar" id="tabbar"></div>
<div id="sheet"></div>
<div class="toast" id="toast" role="status" aria-live="polite" hidden></div>
${scripts}
`;

fs.mkdirSync(path.join(root, 'dist'), { recursive: true });
fs.writeFileSync(path.join(root, 'dist', 'foodbudge.html'), html);
console.log('Wrote dist/foodbudge.html (' + Math.round(html.length / 1024) + ' KB)');

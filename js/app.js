// FoodBudge UI. State lives in localStorage on this device; nothing is sent anywhere.
(function () {
  var KEY = 'foodbudge.v1';
  var DAY_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var DAY_ORDER = [1, 2, 3, 4, 5, 6, 0];
  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var STATUS = { cook: 'Cook', leftovers: 'Leftovers', out: 'Eating out', off: 'Night off' };
  var CUISINES = ['American', 'Mexican', 'Italian', 'Asian', 'Indian', 'Mediterranean'];
  var PROTEINS = ['Chicken', 'Beef', 'Pork', 'Turkey', 'Fish', 'Shrimp', 'Beans', 'Eggs', 'Cheese', 'Peanut', 'Tofu'];
  var AVOIDS = [['pork', 'Pork'], ['beef', 'Beef'], ['fish', 'Fish'], ['shellfish', 'Shellfish'], ['dairy', 'Dairy'], ['gluten', 'Gluten'], ['eggs', 'Eggs'], ['nuts', 'Peanuts & nuts'], ['mushroom', 'Mushrooms'], ['spicy', 'Spicy food']];
  var LIFE_TAG = { days: ['warn', 'Use within a week'], weeks: ['', 'Keeps a few weeks'], months: ['good', 'Lasts months'] };

  var I = {
    logo: '<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="2" y="2" width="28" height="28" rx="9" fill="var(--basil)"/><path d="M9 15h14v3.5a7 7 0 0 1-14 0z" fill="var(--basil-ink)"/><path d="M12 12c0-2 2-2 2-4M16.5 12c0-2 2-2 2-4" stroke="var(--basil-ink)" stroke-width="1.8" stroke-linecap="round" fill="none"/></svg>',
    plan: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15.5" rx="3"/><path d="M8 3v4M16 3v4M3.5 10h17M8 14h3M8 17h6"/></svg>',
    cart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 4h2.2l2.3 11h10.8l2-7.5H6.4"/><circle cx="9.5" cy="19.5" r="1.4"/><circle cx="16.5" cy="19.5" r="1.4"/></svg>',
    book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 4.5h10.5a3 3 0 0 1 3 3V20H8a3 3 0 0 1-3-3z"/><path d="M5 17a3 3 0 0 1 3-3h10.5M9 8.5h5.5"/></svg>',
    jar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 3.5h8M8.5 3.5v3L6 9.5V19a1.5 1.5 0 0 0 1.5 1.5h9A1.5 1.5 0 0 0 18 19V9.5l-2.5-3v-3"/><path d="M6 12.5h12"/></svg>',
    gear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/></svg>',
    swap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 8h14l-3.5-3.5M20 16H6l3.5 3.5"/></svg>',
    shuffle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 7h3.5c4.5 0 6.5 10 11 10H21M3 17h3.5c1.6 0 2.8-1.3 3.8-3M14 10c1-1.7 2.2-3 3.5-3H21M18.5 4.5 21 7l-2.5 2.5M18.5 14.5 21 17l-2.5 2.5"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/></svg>',
    snow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9M9.5 4.5 12 7l2.5-2.5M9.5 19.5 12 17l2.5 2.5"/></svg>',
    up: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 11v9H4.5v-9zM7 11l4-7.5c1.5 0 2.5 1 2.2 2.6L12.6 9.5h5.6a2 2 0 0 1 2 2.4l-1.4 6.4a2 2 0 0 1-2 1.7H7"/></svg>',
    down: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 13V4H4.5v9zM7 13l4 7.5c1.5 0 2.5-1 2.2-2.6l-.6-3.4h5.6a2 2 0 0 0 2-2.4l-1.4-6.4a2 2 0 0 0-2-1.7H7"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>'
  };

  var state;
  var view = 'plan';
  var ui = { priceEdit: null, rFilter: 'all', rQuery: '', confirmReset: false, sheet: null, showAllSwaps: false, placeFor: null };
  var installPrompt = null;
  var app = document.getElementById('app');

  // ---------- state ----------
  function defaults() {
    return {
      version: 1,
      settings: {
        people: 2, budget: 75, nights: [1, 1, 1, 1, 1, 0, 0], weeks: 1, diet: 'none', avoid: [], cuisines: [],
        maxMinutes: 0, priceLevel: 1, currency: '$', kids: false, onboarded: false,
        country: 'US', postal: '', store: 'unsure', carbTarget: 0, goals: [], calTarget: 550, krogerStore: null, style: 'classic'
      },
      pantry: { salt: { plenty: true }, pepper: { plenty: true }, vegoil: { plenty: true } },
      ratings: {}, priceOverrides: {}, history: [], customRecipes: [], customIngredients: {}, plan: null, live: null
    };
  }
  function load() {
    var s = defaults();
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) {
        var saved = JSON.parse(raw);
        Object.keys(saved).forEach(function (k) {
          if (k === 'settings') Object.assign(s.settings, saved.settings);
          else s[k] = saved[k];
        });
      }
    } catch (e) { /* storage blocked: run with defaults */ }
    return s;
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* ignore */ }
  }
  function today() { return Planner.iso(new Date()); }

  // ---------- formatting ----------
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function money(n) {
    var neg = n < 0;
    return (neg ? '−' : '') + state.settings.currency + Math.abs(n).toFixed(2);
  }
  function fmtQty(n) {
    if (n >= 10) return String(Math.round(n * 10) / 10);
    if (n > 0 && n < 0.125) return '⅛';
    var whole = Math.floor(n + 1e-9), frac = n - whole;
    var opts = [[0, ''], [0.25, '¼'], [1 / 3, '⅓'], [0.5, '½'], [2 / 3, '⅔'], [0.75, '¾'], [1, '']];
    var best = opts[0];
    opts.forEach(function (o) { if (Math.abs(o[0] - frac) < Math.abs(best[0] - frac)) best = o; });
    if (best[0] === 1) { whole += 1; best = opts[0]; }
    return (whole ? whole : '') + best[1] || '0';
  }
  function unitWord(u, q) {
    var plural = q > 1 + 1e-9;
    var map = { cup: 'cup', can: 'can', clove: 'clove', slice: 'slice', head: 'head', stalk: 'stalk', bunch: 'bunch', inch: 'inch' };
    if (u === 'each') return '';
    if (map[u]) return plural ? (u === 'bunch' || u === 'inch' ? u + 'es' : u + 's') : u;
    return u;
  }
  function amount(q, i) {
    var w = unitWord(i.unit, q);
    return fmtQty(q) + (w ? ' ' + w : '');
  }
  function dateParts(s) {
    var d = Planner.parse(s);
    return { dow: DAY_SHORT[d.getDay()], day: d.getDate(), mon: MONTHS[d.getMonth()], getDay: d.getDay() };
  }
  function rangeLabel(plan) {
    var a = dateParts(plan.start), b = dateParts(plan.days[plan.days.length - 1].date);
    return a.mon + ' ' + a.day + ' – ' + (a.mon === b.mon ? '' : b.mon + ' ') + b.day;
  }
  function weekBudget() { return state.settings.budget * (state.settings.weeks || 1); }
  function carbText(r) {
    var n = Planner.nutrition(state, r);
    return n.known ? n.carbs + ' g carbs' : 'Carbs not known';
  }
  function carbSpan(r) {
    if (state.settings.carbTarget) return '<span>' + carbText(r) + '</span>';
    var n = Planner.nutrition(state, r);
    return n.known ? '<span>' + n.calories + ' cal</span>' : '';
  }

  // ---------- location & store ----------
  function updatePriceLevel() {
    var s = state.settings;
    s.priceLevel = Math.round(findStore(s.country, s.store).level * regionFactor(s.country, s.postal) * 1000) / 1000;
  }
  function priceNote() {
    var s = state.settings;
    var store = findStore(s.country, s.store);
    var c = COUNTRIES[s.country] || COUNTRIES.OTHER;
    var where = store.id === 'unsure' ? 'a typical store' : store.name.replace(/ \(.*\)$/, '');
    var near = s.postal ? ' near ' + esc(s.postal.toUpperCase()) : '';
    var region = regionFactor(s.country, s.postal) / (s.country === 'CA' ? CAD_FACTOR : 1);
    var rel = Math.round((store.level * region - 1) * 100);
    var vs = s.country === 'OTHER' ? '' : (rel === 0 ? ', about the same as a typical supermarket' : ', about ' + Math.abs(rel) + '% ' + (rel < 0 ? 'below' : 'above') + ' a typical supermarket');
    if (liveActive()) {
      var mins = (Date.now() - state.live.at) / 60000;
      var when = mins < 60 ? 'just now' : mins < 1440 ? Math.round(mins / 60) + ' hr ago' : Math.round(mins / 1440) + ' days ago';
      return 'Live prices from ' + esc(s.krogerStore.name) + ' (updated ' + when + '), sales included. Anything the store didn\'t match uses an estimate.';
    }
    var data = dataMonth();
    return 'Prices estimated for ' + esc(where) + near + vs + (data ? ', from U.S. government grocery prices for ' + data : '') + '. ' + c.note + '.';
  }
  function dataMonth() {
    if (typeof PRICE_DATA === 'undefined') return '';
    var p = PRICE_DATA.month.split('-');
    return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][p[1] - 1] + ' ' + p[0];
  }
  function suggestedBudget() {
    var s = state.settings;
    // Lower-carb dinners lean on meat and vegetables, which cost a bit more.
    return Math.max(25, Math.round((30 + s.people * 15) * (s.priceLevel || 1) * (s.carbTarget ? 1.1 : 1) / 5) * 5);
  }

  // ---------- live Kroger prices ----------
  function krogerOn() {
    return typeof Kroger !== 'undefined' && Kroger.enabled() && state.settings.country === 'US' && state.settings.store === 'kroger';
  }
  function liveActive() {
    var s = state.settings;
    return krogerOn() && !!s.krogerStore && !!state.live && state.live.loc === s.krogerStore.id;
  }
  // Fetch the picked store's prices at most twice a day (or right away when forced).
  function refreshLive(force) {
    var s = state.settings, store = s.krogerStore;
    if (!krogerOn() || !store || ui.liveLoading) return;
    if (!force && state.live && state.live.loc === store.id && Date.now() - state.live.at < 12 * 3600 * 1000) return;
    ui.liveLoading = true; ui.liveError = '';
    Kroger.prices(store.id).then(function (items) {
      ui.liveLoading = false;
      if (!Object.keys(items).length) throw new Error('That store didn\'t return any prices. Using estimates for now.');
      state.live = { loc: store.id, at: Date.now(), items: items };
      save(); render();
      toast('Prices updated from ' + store.name);
    }).catch(function (e) { ui.liveLoading = false; ui.liveError = e.message; render(); });
  }
  function findKroger() {
    var zip = String(state.settings.postal || '').slice(0, 5);
    ui.krogerStores = null; ui.liveError = '';
    if (!/^\d{5}$/.test(zip)) { ui.liveError = 'Enter your ZIP code to find your store.'; render(); return; }
    ui.krogerLoading = true; render();
    Kroger.stores(zip).then(function (list) {
      ui.krogerLoading = false; ui.krogerStores = list;
      if (!list.length) ui.liveError = 'No Kroger-family stores within 25 miles of ' + zip + '. Using estimates.';
      render();
    }).catch(function (e) { ui.krogerLoading = false; ui.liveError = e.message; render(); });
  }
  function krogerField() {
    if (!krogerOn()) return '';
    var s = state.settings, out = '<div class="field"><span class="label">Your Kroger store</span>';
    if (ui.krogerStores && ui.krogerStores.length) {
      out += '<div class="opts">' + ui.krogerStores.map(function (st) {
        return '<button class="opt goal" data-act="pickkroger" data-v="' + esc(st.id) + '" data-name="' + esc(st.name) + '" aria-pressed="' + (!!s.krogerStore && s.krogerStore.id === st.id) + '"><span><b>' + esc(st.name) + '</b><small>' + esc(st.address) + '</small></span></button>';
      }).join('') + '</div>';
    } else if (s.krogerStore) {
      out += '<div class="row between"><span>' + esc(s.krogerStore.name) + '</span><button class="linkbtn" data-act="findkroger">Change</button></div>' +
        '<span class="hint">' + (ui.liveLoading ? 'Getting this store\'s prices…' : liveActive() ? 'Using this store\'s live prices, sales included.' : '') + '</span>';
    } else {
      out += '<div><button class="btn sm" data-act="findkroger"' + (ui.krogerLoading ? ' disabled' : '') + '>' + (ui.krogerLoading ? 'Looking…' : 'Find my store for live prices') + '</button></div>';
    }
    if (ui.liveError) out += '<span class="hint">' + esc(ui.liveError) + '</span>';
    return out + '</div>';
  }

  // ---------- plan ops ----------
  function buildPlan(start) {
    var n = 7 * (state.settings.weeks || 1);
    var days = [];
    for (var i = 0; i < n; i++) {
      var date = Planner.addDays(start, i);
      var dow = Planner.parse(date).getDay();
      days.push({ date: date, status: state.settings.nights[dow] ? 'cook' : 'off', recipe: null });
    }
    var plan = { start: start, days: days, checked: {}, shopped: false };
    fillPlan(plan);
    return plan;
  }
  function fillPlan(plan, onlyEmpty) {
    var fixed = [], slots = [];
    plan.days.forEach(function (d, i) {
      if (d.status !== 'cook') return;
      if (onlyEmpty && d.recipe && Planner.recipe(state, d.recipe)) fixed.push(Planner.recipe(state, d.recipe));
      else slots.push(i);
    });
    if (!slots.length) return;
    var res = Planner.choose(state, slots.length, fixed, today());
    slots.forEach(function (idx, k) { plan.days[idx].recipe = res.recipes[k] ? res.recipes[k].id : null; });
  }
  function startNewPlan(nextWeek) {
    var t = today();
    var start = t;
    if (state.plan) {
      state.history.push({ start: state.plan.start, recipes: Planner.planRecipes(state, state.plan).map(function (r) { return r.id; }) });
      state.history = state.history.slice(-8);
      if (state.plan.shopped) Planner.rollPantry(state, state.plan, t);
      if (nextWeek) {
        var after = Planner.addDays(state.plan.days[state.plan.days.length - 1].date, 1);
        start = after > t ? after : t;
      }
    }
    prunePantry();
    state.plan = buildPlan(start);
    save();
  }
  function prunePantry() {
    var t = today();
    Object.keys(state.pantry).forEach(function (id) {
      var p = state.pantry[id];
      if (!p.plenty && ((p.exp && p.exp < t) || !(p.qty > 0))) delete state.pantry[id];
    });
  }
  function planEnded() {
    return state.plan && state.plan.days[state.plan.days.length - 1].date < today();
  }

  // ---------- shell ----------
  function render() {
    var tabbar = document.getElementById('tabbar');
    if (!state.settings.onboarded) {
      app.innerHTML = renderWizard();
      tabbar.hidden = true;
      ui.sheet = null;
      renderSheet();
      return;
    }
    tabbar.hidden = false;
    var html ='<header class="topbar"><div class="brand">' + I.logo + '<span>FoodBudge</span></div>' +
      (state.plan ? '<span class="small muted">' + rangeLabel(state.plan) + '</span>' : '') + '</header>' +
      '<main class="view" id="view">' + renderView() + '</main>';
    app.innerHTML = html;
    renderTabs();
    renderSheet();
  }
  function renderView() {
    if (view === 'list') return renderList();
    if (view === 'recipes') return renderRecipes();
    if (view === 'pantry') return renderPantry();
    if (view === 'settings') return renderSettings();
    return renderPlan();
  }
  function renderTabs() {
    var el = document.getElementById('tabbar');
    var tabs = [['plan', 'Week', I.plan], ['list', 'Groceries', I.cart], ['recipes', 'Recipes', I.book], ['pantry', 'Pantry', I.jar], ['settings', 'Setup', I.gear]];
    el.innerHTML = '<nav aria-label="Main">' + tabs.map(function (t) {
      return '<button data-act="tab" data-v="' + t[0] + '"' + (view === t[0] ? ' aria-current="page"' : '') + '>' + t[2] + '<span>' + t[1] + '</span></button>';
    }).join('') + '</nav>';
  }
  function go(v) {
    view = v; ui.priceEdit = null; ui.confirmReset = false;
    render();
    window.scrollTo(0, 0);
  }
  var toastTimer;
  function toast(msg) {
    var t = document.getElementById('toast');
    t.textContent = msg; t.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.hidden = true; }, 2600);
  }

  // ---------- budget receipt ----------
  function receipt(cost) {
    var b = weekBudget();
    var pct = Math.min(100, (cost / b) * 100);
    var over = cost > b;
    var cooks = Planner.planRecipes(state, state.plan).length;
    var plates = cooks * state.settings.people;
    return '<section class="receipt" aria-label="Budget">' +
      '<div class="total"><div><div class="eyebrow">' + (state.settings.weeks > 1 ? 'Two-week' : 'This week\'s') + ' groceries</div>' +
      '<div class="big' + (over ? '" style="color:var(--tomato)' : '') + '">' + money(cost) + '</div></div>' +
      '<div style="text-align:right"><div class="small muted">Budget</div><div class="money">' + money(b) + '</div></div></div>' +
      '<div class="meter' + (over ? ' over' : '') + '"><i style="width:' + pct.toFixed(1) + '%"></i></div>' +
      '<div class="row between small"><span class="' + (over ? '' : 'muted') + '"' + (over ? ' style="color:var(--tomato);font-weight:700"' : '') + '>' +
      (over ? 'Over by ' + money(cost - b) : money(b - cost) + ' left') + '</span>' +
      '<span class="muted">' + cooks + ' dinner' + (cooks === 1 ? '' : 's') + ' · ' + plates + ' plate' + (plates === 1 ? '' : 's') + '</span></div>' +
      '</section>';
  }

  // ---------- Week view ----------
  function renderPlan() {
    var plan = state.plan, t = today();
    var cost = Planner.planCost(state, plan, t);
    var out = '';
    if (planEnded()) {
      out += '<div class="notice ice"><p><b>This plan has ended.</b> Start a new week. Extras from what you bought move to your pantry.</p>' +
        '<div class="row"><button class="btn primary sm" data-act="nextweek">Plan the next week</button></div></div>';
    }
    out += receipt(cost);
    out += healthSummary();

    // Tonight + thaw reminder
    var tonight = plan.days.filter(function (d) { return d.date === t; })[0];
    var tomorrow = plan.days.filter(function (d) { return d.date === Planner.addDays(t, 1); })[0];
    if (tomorrow && tomorrow.status === 'cook' && tomorrow.recipe) {
      var tr = Planner.recipe(state, tomorrow.recipe);
      var thaw = tr ? Planner.thawItems(state, tr) : [];
      if (thaw.length) {
        out += '<div class="notice ice"><p class="tip" style="color:var(--ink)">' + I.snow + '<span><b>Thaw tonight:</b> tomorrow is ' + esc(tr.name.toLowerCase()) +
          '. If the ' + thaw.map(function (i) { return esc(i.name.toLowerCase().replace(/ \(frozen\)/, '')); }).join(' and ') + ' is frozen, move it to the fridge before bed.</span></p></div>';
      }
    }

    out += '<div class="row between"><h2>Dinners</h2><div class="row">' +
      '<button class="btn sm" data-act="shuffle">' + I.shuffle + 'New ideas</button>' +
      '<button class="btn sm" data-act="nextweek" title="Start a plan for the following week">Next week</button></div></div>';

    out += '<div class="days">';
    plan.days.forEach(function (d, i) {
      if (state.settings.weeks > 1 && i % 7 === 0) out += '<div class="eyebrow" style="padding-top:' + (i ? '8px' : '0') + '">Week ' + (i / 7 + 1) + '</div>';
      out += dayCard(d, i, t);
    });
    out += '</div>';
    if (cost > weekBudget()) {
      out += '<p class="small muted">Over budget? Tap <b>Swap</b> on a pricey night. Options that lower the total are listed first with a green amount.</p>';
    }
    return out;
  }
  function dayCard(d, i, t) {
    var p = dateParts(d.date);
    var isToday = d.date === t;
    var r = d.status === 'cook' && d.recipe ? Planner.recipe(state, d.recipe) : null;
    var sel = '<label class="sr" for="st' + i + '">Plan for ' + p.dow + '</label><select id="st' + i + '" class="input" style="min-height:34px;padding:4px 10px;width:auto;border-radius:999px;font-size:.84rem;font-weight:700" data-change="status" data-i="' + i + '">' +
      Object.keys(STATUS).map(function (k) { return '<option value="' + k + '"' + (d.status === k ? ' selected' : '') + '>' + STATUS[k] + '</option>'; }).join('') + '</select>';
    var body;
    if (r) {
      body = '<button class="title" data-act="recipe" data-id="' + esc(r.id) + '" data-i="' + i + '">' + esc(r.name) + '</button>' +
        '<div class="meta"><span>' + esc(r.cuisine) + '</span><span>' + r.min + ' min</span>' + carbSpan(r) + '<span class="money">' + money(Planner.servingCost(state, r)) + '/serving</span>' +
        (state.ratings[r.id] === 1 ? '<span class="tag good">Liked</span>' : '') + '</div>' +
        '<div class="actions"><button class="btn sm" data-act="swap" data-i="' + i + '">' + I.swap + 'Swap</button>' + sel + '</div>';
    } else if (d.status === 'cook') {
      body = '<div class="title">No dinner picked</div><div class="actions"><button class="btn sm primary" data-act="swap" data-i="' + i + '">Pick a dinner</button>' + sel + '</div>';
    } else {
      body = '<div class="title">' + STATUS[d.status] + '</div><div class="meta">No groceries needed for this night</div><div class="actions">' + sel + '</div>';
    }
    return '<article class="day' + (isToday ? ' today' : '') + (r ? '' : ' off') + '"><div class="date"><span>' + (isToday ? 'Today' : p.dow) + '</span><b>' + p.day + '</b></div><div class="body">' + body + '</div></article>';
  }

  // ---------- Grocery list ----------
  function renderList() {
    var t = today();
    var items = Planner.groceryList(state, state.plan, t);
    var buy = items.filter(function (x) { return x.packs > 0; });
    var covered = items.filter(function (x) { return x.packs === 0; });
    var cost = buy.reduce(function (s, x) { return s + x.cost; }, 0);
    var checked = state.plan.checked || {};
    var left = buy.filter(function (x) { return !checked[x.id]; }).length;
    var out = receipt(cost);
    if (!buy.length) {
      return out + '<div class="empty"><p>Nothing to buy. Your pantry covers every dinner this week.</p></div>';
    }
    out += '<div class="row between"><h2>Shopping list</h2><span class="small muted">' + left + ' of ' + buy.length + ' left</span></div>';
    var trend = typeof PRICE_DATA !== 'undefined' && !liveActive() ? ' Groceries overall cost ' + Math.abs(Math.round(PRICE_DATA.yearlyChange * 1000) / 10) + '% ' + (PRICE_DATA.yearlyChange >= 0 ? 'more' : 'less') + ' than a year ago.' : '';
    out += '<p class="small muted">' + priceNote() + trend + ' Prices are for whole packs. Tap a price to set what your store charges.</p>';
    var now = buy.filter(function (x) { return !x.later; });
    var later = buy.filter(function (x) { return x.later; });
    var groups = {};
    now.forEach(function (x) { (groups[x.ing.aisle] = groups[x.ing.aisle] || []).push(x); });
    Object.keys(groups).sort(function (a, b) { return AISLES.indexOf(a) - AISLES.indexOf(b); }).forEach(function (a) {
      out += '<section class="aisle"><h3>' + esc(a) + '</h3><div class="items">' + groups[a].map(itemRow).join('') + '</div></section>';
    });
    if (later.length) {
      out += '<section class="aisle"><h3>Buy fresh in week 2 · around ' + (function () { var p = dateParts(Planner.addDays(state.plan.start, 7)); return p.dow + ' ' + p.mon + ' ' + p.day; })() + '</h3>' +
        '<div class="items">' + later.map(itemRow).join('') + '</div></section>';
    }
    if (covered.length) {
      out += '<section class="aisle"><h3>Already in your pantry</h3><div class="items">' + covered.map(function (x) {
        return '<div class="item done"><span class="check" aria-hidden="true"><i>' + I.check + '</i></span><div style="min-width:0"><div class="name">' + esc(x.ing.name) + '</div>' +
          '<div class="sub">Need ' + amount(x.need, x.ing) + '</div></div><div class="right"><button class="linkbtn" data-act="unhave" data-id="' + x.id + '">I need to buy it</button></div></div>';
      }).join('') + '</div></section>';
    }
    out += '<div class="card"><h3>Done shopping?</h3><p class="small muted">Marking the trip done lets FoodBudge carry the extras (the rest of each pack) into your pantry when you start next week, so future plans use them up.</p>' +
      '<button class="btn ' + (state.plan.shopped ? '' : 'primary ') + 'block" data-act="shopped">' + (state.plan.shopped ? 'Marked as bought · tap to undo' : 'I bought everything') + '</button></div>';
    return out;
  }
  function priceTag(id) {
    var p = Planner.priceInfo(state, id);
    if (p.source === 'mine') return '<span class="tag">Your price</span>';
    if (p.source === 'sale') return '<span class="tag good" title="' + esc(p.product) + '">On sale</span>';
    if (p.source === 'live') return '';
    if (p.change >= 0.08) return '<span class="tag warn">Up ' + Math.round(p.change * 100) + '% in a year</span>';
    if (p.change <= -0.08) return '<span class="tag good">Down ' + Math.round(-p.change * 100) + '% in a year</span>';
    return '';
  }
  function itemRow(x) {
    var checked = state.plan.checked && state.plan.checked[x.id];
    var i = x.ing;
    var packText = (i.pack === 1 && i.unit === 'each') ? 'Buy ' + x.packs : x.packs + ' × ' + esc(i.label);
    var life = LIFE_TAG[i.life] || LIFE_TAG.weeks;
    var priceHtml;
    if (ui.priceEdit === x.id) {
      priceHtml = '<form class="priceedit" data-form="price" data-id="' + x.id + '"><label class="sr" for="pe-' + x.id + '">Price per pack</label>' +
        '<input id="pe-' + x.id + '" inputmode="decimal" value="' + x.unitPrice.toFixed(2) + '" autocomplete="off"><button class="iconbtn" style="width:34px;height:34px" aria-label="Save price">' + I.check + '</button></form>';
    } else {
      priceHtml = '<button class="pricebtn" data-act="editprice" data-id="' + x.id + '" aria-label="Edit price, ' + money(x.cost) + '">' + money(x.cost) + '</button>';
    }
    var extra = '';
    if (x.freezeTip) {
      extra = '<div class="tip">' + I.snow + '<span>You\'ll have about ' + amount(x.extra, i) + ' extra. Freeze it the day you shop.</span></div>';
    }
    return '<div class="item' + (checked ? ' done' : '') + '">' +
      '<button class="check" data-act="check" data-id="' + x.id + '" aria-pressed="' + (checked ? 'true' : 'false') + '" aria-label="In cart: ' + esc(i.name) + '"><i>' + I.check + '</i></button>' +
      '<div style="min-width:0"><div class="name">' + esc(i.name) + '</div><div class="sub"><span>' + packText + '</span>' +
      (x.have > 0 && isFinite(x.have) ? '<span>· have ' + amount(x.have, i) + '</span>' : '') +
      '<span class="tag ' + life[0] + '">' + life[1] + '</span>' + priceTag(x.id) + '</div>' + extra + '</div>' +
      '<div class="right">' + priceHtml + '<button class="linkbtn" data-act="have" data-id="' + x.id + '">I have it</button></div></div>';
  }

  // ---------- Recipes ----------
  function renderRecipes() {
    var q = ui.rQuery.trim().toLowerCase();
    var filters = [['all', 'All'], ['liked', 'Liked'], ['cheap', 'Under ' + money(2)], ['quick', '25 min or less'], ['veg', 'Vegetarian'], ['carb', 'Lower carb'], ['heart', 'Heart healthy'], ['protein', '30 g+ protein'], ['light', 'Under 500 cal'], ['fiber', 'High fiber'], ['slow', 'Slow cooker'], ['mine', 'My recipes']];
    var list = Planner.allRecipes(state).map(function (r) { return { r: r, cost: Planner.servingCost(state, r) }; });
    var nut = function (r) { return Planner.nutrition(state, r); };
    var hidden = 0;
    list = list.filter(function (x) {
      var r = x.r;
      if (!ui.showAllStyles && !Planner.styleOK(state, r)) { hidden++; return false; }
      if (q && (r.name + ' ' + r.cuisine + ' ' + r.protein).toLowerCase().indexOf(q) < 0) return false;
      switch (ui.rFilter) {
        case 'liked': return state.ratings[r.id] === 1;
        case 'cheap': return x.cost < 2;
        case 'quick': return r.min <= 25;
        case 'veg': return Planner.isVegetarian(state, r);
        case 'slow': return r.tags.indexOf('slowcooker') >= 0;
        case 'carb': return nut(r).known && nut(r).carbs <= (state.settings.carbTarget || 45);
        case 'protein': return nut(r).known && nut(r).protein >= 30;
        case 'heart': return nut(r).known && nut(r).satfat <= 5 && nut(r).sodium <= 900;
        case 'fiber': return nut(r).known && nut(r).fiber >= 8;
        case 'light': return nut(r).known && nut(r).calories < 500;
        case 'mine': return !!r.custom;
      }
      return true;
    });
    list.sort(function (a, b) { return a.cost - b.cost; });
    var out = '<div class="row between"><h1>Recipes</h1><button class="btn sm primary" data-act="addrecipe">' + I.plus + 'Add your own</button></div>' +
      '<label class="search" for="rq">' + I.search + '<span class="sr">Search recipes</span><input id="rq" type="search" placeholder="Search tacos, chicken, pasta…" value="' + esc(ui.rQuery) + '" data-input="rquery" autocomplete="off"></label>' +
      '<div class="chips">' + filters.map(function (f) {
        return '<button class="chip" data-act="rfilter" data-v="' + f[0] + '" aria-pressed="' + (ui.rFilter === f[0]) + '">' + f[1] + '</button>';
      }).join('') + '</div>';
    out += '<p class="small muted">' + list.length + ' dinners, cheapest first. Like the ones you enjoy and FoodBudge plans them more often. Dislike one and it stops showing up.' +
      (hidden ? ' <button class="linkbtn" data-act="showallstyles">Show ' + hidden + ' more from other cuisines</button>' : ui.showAllStyles ? ' <button class="linkbtn" data-act="showallstyles">Hide dishes outside your style</button>' : '') + '</p>';
    out += '<div class="rlist" id="rlist">' + recipeCards(list) + '</div>';
    return out;
  }
  function recipeCards(list) {
    if (!list.length) return '<div class="empty"><p>No recipes match.</p></div>';
    return list.map(function (x) {
      var r = x.r;
      var ok = Planner.allowed(state, r);
      var rating = state.ratings[r.id];
      return '<button class="rcard' + (ok ? '' : ' blocked') + '" data-act="recipe" data-id="' + esc(r.id) + '">' +
        '<span class="rname">' + esc(r.name) + '</span>' +
        '<span class="money">' + money(x.cost) + '<small>per serving</small></span>' +
        '<span class="meta"><span>' + esc(r.cuisine) + '</span><span>·</span><span>' + r.min + ' min</span>' + (carbSpan(r) ? '<span>·</span>' + carbSpan(r) : '') +
        (rating === 1 ? '<span class="tag good">Liked</span>' : '') + (rating === -1 ? '<span class="tag bad">Hidden</span>' : '') +
        (ok || rating === -1 ? '' : '<span class="tag">Outside your filters</span>') + (r.custom ? '<span class="tag ice">Yours</span>' : '') + '</span></button>';
    }).join('');
  }

  // ---------- Pantry ----------
  function renderPantry() {
    prunePantry();
    var t = today();
    var ids = Object.keys(state.pantry).filter(function (id) { return Planner.ing(state, id); });
    var plenty = ids.filter(function (id) { return state.pantry[id].plenty; });
    var have = ids.filter(function (id) { return !state.pantry[id].plenty; });
    var byName = function (a, b) { return Planner.ing(state, a).name.localeCompare(Planner.ing(state, b).name); };
    var out = '<h1>Pantry</h1><p class="muted small">What you already have. FoodBudge takes these off the grocery list and picks dinners that use up leftovers before they go bad.</p>';

    out += '<section class="card"><h2>Leftovers & partial packs</h2>';
    if (!have.length) out += '<p class="small muted">Nothing tracked yet. When you mark a shopping trip as done, the extra from each pack shows up here the next week.</p>';
    else {
      have.sort(function (a, b) { return (state.pantry[a].exp || '9') < (state.pantry[b].exp || '9') ? -1 : 1; });
      out += '<div class="items">' + have.map(function (id) {
        var p = state.pantry[id], i = Planner.ing(state, id);
        var days = p.exp ? Planner.daysBetween(t, p.exp) : null;
        var expTag = p.frozen ? '<span class="tag ice">' + I.snow + 'Frozen</span>' :
          (days != null ? '<span class="tag ' + (days <= 2 ? 'bad' : days <= 6 ? 'warn' : '') + '">' + (days <= 0 ? 'Use today' : 'Use within ' + days + ' day' + (days === 1 ? '' : 's')) + '</span>' : '');
        return '<div class="prow"><div style="min-width:0"><div class="name">' + esc(i.name) + '</div><div class="sub small muted row" style="gap:6px">' + amount(p.qty, i) + ' ' + expTag + '</div></div>' +
          '<div class="row">' + (i.freeze && !p.frozen ? '<button class="btn sm" data-act="freeze" data-id="' + id + '">' + I.snow + 'Froze it</button>' : '') +
          '<button class="iconbtn" data-act="premove" data-id="' + id + '" aria-label="Remove ' + esc(i.name) + '">' + I.close + '</button></div></div>';
      }).join('') + '</div>';
    }
    out += '</section>';

    out += '<section class="card"><h2>Always in my kitchen</h2><p class="small muted">Staples you keep stocked. They never go on the list.</p>';
    if (plenty.length) {
      out += '<div class="chips">' + plenty.sort(byName).map(function (id) {
        return '<button class="chip" aria-pressed="true" data-act="premove" data-id="' + id + '" aria-label="Remove ' + esc(Planner.ing(state, id).name) + '">' + esc(Planner.ing(state, id).name) + ' ×</button>';
      }).join('') + '</div>';
    }
    out += '</section>';

    var all = allIngredientIds().filter(function (id) { return !state.pantry[id]; });
    out += '<section class="card"><h2>Add something you have</h2><form class="grid2" data-form="padd" style="align-items:end">' +
      '<div class="field" style="grid-column:1/-1"><label for="padd-id">Ingredient</label>' + ingSelect('padd-id', all, '') + '</div>' +
      '<div class="field"><label for="padd-q">Amount</label><input class="input" id="padd-q" inputmode="decimal" placeholder="Leave blank for always"></div>' +
      '<button class="btn primary">Add to pantry</button></form><p class="small muted">Blank amount means you always have it. Amounts use the unit shown next to the name.</p></section>';
    return out;
  }
  function allIngredientIds() {
    return Object.keys(INGREDIENTS).concat(Object.keys(state.customIngredients || {}));
  }
  function ingSelect(id, ids, selected) {
    var groups = {};
    ids.forEach(function (k) { var i = Planner.ing(state, k); if (i) (groups[i.aisle] = groups[i.aisle] || []).push(k); });
    return '<select class="input" id="' + id + '"><option value="">Choose…</option>' +
      AISLES.filter(function (a) { return groups[a]; }).map(function (a) {
        return '<optgroup label="' + esc(a) + '">' + groups[a].sort(function (x, y) { return Planner.ing(state, x).name.localeCompare(Planner.ing(state, y).name); }).map(function (k) {
          var i = Planner.ing(state, k);
          return '<option value="' + esc(k) + '"' + (k === selected ? ' selected' : '') + '>' + esc(i.name) + ' (' + esc(i.unit === 'each' ? 'count' : i.unit) + ')</option>';
        }).join('') + '</optgroup>';
      }).join('') + '</select>';
  }

  // ---------- Setup ----------
  function renderSettings() {
    var s = state.settings;
    var out = '<h1>' + (s.onboarded ? 'Setup' : 'Set up your household') + '</h1>';
    out += '<section class="card">' +
      '<div class="grid2">' +
      '<div class="field"><span class="label" id="lbl-people">People eating</span><div class="stepper" role="group" aria-labelledby="lbl-people"><button data-act="step" data-k="people" data-d="-1" aria-label="Fewer people">−</button><output>' + s.people + '</output><button data-act="step" data-k="people" data-d="1" aria-label="More people">+</button></div></div>' +
      '<div class="field"><label for="budget">Weekly budget</label><div class="stepper"><button data-act="step" data-k="budget" data-d="-5" aria-label="Lower budget">−</button><input id="budget" inputmode="decimal" value="' + s.budget + '" data-change="setnum" data-k="budget"><button data-act="step" data-k="budget" data-d="5" aria-label="Raise budget">+</button></div></div>' +
      '</div>' +
      '<div class="field"><span class="label">Nights you cook</span><div class="chips week">' + DAY_ORDER.map(function (d) {
        return '<button class="chip day" data-act="night" data-d="' + d + '" aria-pressed="' + (!!s.nights[d]) + '">' + DAY_SHORT[d] + '</button>';
      }).join('') + '</div></div>' +
      '<div class="field"><span class="label">Plan length</span><div class="chips">' +
      chip('weeks', 1, 'One week') + chip('weeks', 2, 'Two weeks, shop once') + '</div>' +
      '<span class="hint">With two weeks, fresh produce for week 2 goes on a separate short list to buy later.</span></div>' +
      '</section>';

    out += '<section class="card"><h2>What you like</h2>' +
      '<div class="field"><span class="label">Diet</span><div class="chips">' + chip('diet', 'none', 'Eat everything') + chip('diet', 'pescatarian', 'No meat, fish OK') + chip('diet', 'vegetarian', 'Vegetarian') + '</div></div>' +
      avoidField('Leave out') + healthField() + carbField() + styleField() +
      '<div class="field"><span class="label">Favorite kinds of food</span><div class="chips">' + CUISINES.map(function (c) {
        return '<button class="chip" data-act="toggleList" data-k="cuisines" data-v="' + c + '" aria-pressed="' + (s.cuisines.indexOf(c) >= 0) + '">' + c + '</button>';
      }).join('') + '</div><span class="hint">Favorites show up more often.</span></div>' +
      '<div class="field"><span class="label">Most time you want to spend cooking</span><div class="chips">' +
      chip('maxMinutes', 25, '25 min') + chip('maxMinutes', 35, '35 min') + chip('maxMinutes', 45, '45 min') + chip('maxMinutes', 0, 'No limit') + '</div></div>' +
      '<div class="field"><span class="label">Kids at the table?</span><div class="chips">' + chip('kids', true, 'Yes, favor kid-friendly') + chip('kids', false, 'No') + '</div></div>' +
      '</section>';

    out += '<section class="card"><h2>Where you shop</h2>' + countryField() + postalField('postal') +
      '<div class="field"><label for="store">Store</label><select class="input" id="store" data-change="store">' +
      storeChoices().map(function (st) {
        return '<option value="' + st.id + '"' + (s.store === st.id ? ' selected' : '') + '>' + esc(st.name) + '</option>';
      }).join('') + '</select><span class="hint" id="pricenote">' + priceNote() + '</span></div>' + krogerField() +
      '<div class="field"><label for="currency">Currency symbol</label><input class="input" id="currency" style="max-width:120px" value="' + esc(s.currency) + '" data-change="currency"></div>' +
      (Object.keys(state.priceOverrides).length ? '<button class="btn sm" data-act="resetprices">Clear my ' + Object.keys(state.priceOverrides).length + ' custom prices</button>' : '') +
      '</section>';

    out += '<section class="card"><h2>Already in your kitchen</h2><p class="small muted">Check what you keep stocked so it stays off the list.</p><div class="checks">' +
      COMMON_STAPLES.map(function (id) {
        var on = state.pantry[id] && state.pantry[id].plenty;
        return '<label><input type="checkbox" data-change="staple" data-id="' + id + '"' + (on ? ' checked' : '') + '>' + esc(INGREDIENTS[id].name) + '</label>';
      }).join('') + '</div></section>';

    out += '<button class="btn primary block" data-act="replan">Save and re-plan this week</button>' +
      '<button class="btn block" data-act="rerunsetup">Go through the setup questions again</button>';

    out += '<section class="card"><h2>Share with your household</h2><p class="small muted">Copy this code and paste it into FoodBudge on another phone to load the same week and list. Send a new code after changes.</p>' +
      '<div class="codebox" id="sharecode">' + esc(shareCode()) + '</div><div class="row"><button class="btn sm" data-act="copy" data-target="sharecode">Copy code</button></div>' +
      '<div class="field"><label for="joincode">Got a code? Paste it here</label><textarea class="input" id="joincode" style="min-height:70px" placeholder="Paste a plan code"></textarea></div>' +
      '<button class="btn sm" data-act="join">Load shared plan</button></section>';

    out += '<section class="card"><h2>Backup</h2><p class="small muted">Everything is stored only on this device. Copy a backup to move to a new phone, then paste it there.</p>' +
      '<div class="row"><button class="btn sm" data-act="backup">Copy backup</button></div>' +
      '<textarea class="input" id="restore" style="min-height:70px" placeholder="Paste a backup to restore"></textarea>' +
      '<div class="row"><button class="btn sm" data-act="restore">Restore backup</button></div></section>';

    if (installPrompt) {
      out += '<button class="btn block" data-act="install">Install FoodBudge on this device</button>';
    }
    out += '<section class="card"><h2>Start over</h2>' + (ui.confirmReset
      ? '<p class="small">This erases your plan, pantry, ratings, prices and recipes on this device.</p><div class="row"><button class="btn danger" data-act="reset">Erase everything</button><button class="btn" data-act="cancelreset">Keep my data</button></div>'
      : '<button class="btn danger sm" data-act="askreset">Erase all data…</button>') + '</section>';
    out += '<p class="small muted" style="text-align:center">FoodBudge is free. Prices are estimates, not live store prices.</p>';
    return out;
  }
  function chip(k, v, label) {
    return '<button class="chip" data-act="set" data-k="' + k + '" data-v="' + esc(JSON.stringify(v)) + '" aria-pressed="' + (state.settings[k] === v) + '">' + label + '</button>';
  }
  // Leave-out choices: food groups, mushrooms, spicy food, plus anything the household types in.
  function avoidField(label) {
    var s = state.settings, presets = AVOIDS.map(function (a) { return a[0]; });
    var custom = s.avoid.filter(function (a) { return presets.indexOf(a) < 0; });
    var names = {};
    allIngredientIds().forEach(function (id) {
      var n = Planner.ing(state, id).name.replace(/\s*\(.*\)$/, '').toLowerCase();
      names[n] = 1;
    });
    var out = '<div class="field"><span class="label">' + label + '</span><div class="chips">' + AVOIDS.map(function (a) {
      return '<button class="chip" data-act="toggleList" data-k="avoid" data-v="' + a[0] + '" aria-pressed="' + (s.avoid.indexOf(a[0]) >= 0) + '">' + a[1] + '</button>';
    }).join('') + custom.map(function (w) {
      return '<button class="chip" data-act="toggleList" data-k="avoid" data-v="' + esc(w) + '" aria-pressed="true" aria-label="Stop leaving out ' + esc(w) + '">' + esc(w.charAt(0).toUpperCase() + w.slice(1)) + ' <span aria-hidden="true">✕</span></button>';
    }).join('') + '</div>' +
      '<form class="avoidadd" data-form="avoid"><label class="sr" for="avoid-in">Something else to leave out</label>' +
      '<input class="input" id="avoid-in" list="avoid-names" maxlength="40" autocomplete="off" placeholder="Something else, like lima beans">' +
      '<button class="btn sm">Add</button></form>' +
      '<datalist id="avoid-names">' + Object.keys(names).sort().map(function (n) { return '<option value="' + esc(n) + '">'; }).join('') + '</datalist>' +
      '<span class="hint">Type any food you don\'t like. Dinners with it in the recipe stop showing up.</span></div>';
    return out;
  }
  var STYLES = [
    ['classic', 'Classic American home cooking', 'Meatloaf, tacos, spaghetti, pot roast, hotdish, burgers, chili. Nothing unusual.'],
    ['mix', 'Mostly classic, some new things', 'Now and then a dish like curry, Korean beef or Greek wraps.'],
    ['adventurous', 'Anything goes', 'Every recipe, including tofu and lentil dishes.']
  ];
  function styleField() {
    var cur = state.settings.style || 'classic';
    return '<div class="field"><span class="label">What kind of dinners?</span><div class="opts">' + STYLES.map(function (x) {
      return '<button class="opt goal" data-act="set" data-k="style" data-v="' + esc(JSON.stringify(x[0])) + '" aria-pressed="' + (cur === x[0]) + '"><span><b>' + x[1] + '</b><small>' + x[2] + '</small></span></button>';
    }).join('') + '</div></div>';
  }
  // After a style or diet change, swap out planned dinners that no longer fit.
  function dropBlocked() {
    if (!state.plan || state.plan.shopped) return 0;
    var n = 0, t = today();
    state.plan.days.forEach(function (d) {
      var r = d.recipe && Planner.recipe(state, d.recipe);
      if (d.status === 'cook' && r && d.date >= t && !Planner.allowed(state, r)) { d.recipe = null; n++; }
    });
    if (n) fillPlan(state.plan, true);
    return n;
  }
  var GOALS = [
    ['heart', 'Lower cholesterol', 'Less saturated fat: lean beef, olive oil instead of butter, Greek yogurt instead of sour cream, less cheese.'],
    ['calories', 'Fewer calories', 'Dinners near your calorie target, with lighter swaps and smaller starchy sides when needed.'],
    ['protein', 'More protein', 'At least 20 g per dinner, and 30 g or more when possible.'],
    ['sodium', 'Less sodium', 'Low-sodium broth and soy sauce, homemade taco seasoning, and saltier dinners left out.'],
    ['fiber', 'More fiber', 'Brown rice and whole wheat pasta, and more beans and vegetables.']
  ];
  function healthField() {
    var s = state.settings;
    var on = s.goals || [];
    var out = '<div class="field"><span class="label">Health goals</span><div class="opts">' + GOALS.map(function (g) {
      return '<button class="opt goal" data-act="toggleList" data-k="goals" data-v="' + g[0] + '" aria-pressed="' + (on.indexOf(g[0]) >= 0) + '"><span><b>' + g[1] + '</b><small>' + g[2] + '</small></span></button>';
    }).join('') + '</div></div>';
    if (on.indexOf('calories') >= 0) {
      out += '<div class="field"><span class="label">Calories per dinner</span><div class="chips">' +
        chip('calTarget', 450, 'About 450') + chip('calTarget', 550, 'About 550') + chip('calTarget', 650, 'About 650') + '</div>' +
        '<span class="hint">Dinner is often about a third of the day. 550 fits many adults trying to eat a bit less.</span></div>';
    }
    out += '<p class="small muted">These follow general healthy-eating guidelines. They aren\'t medical advice, so follow your doctor\'s plan if you have one.</p>';
    return out;
  }
  function carbField() {
    return '<div class="field"><span class="label">Managing diabetes or watching carbs?</span><div class="chips">' +
      chip('carbTarget', 0, 'No') + chip('carbTarget', 30, 'Yes, about 30 g per dinner') + chip('carbTarget', 45, 'Yes, about 45 g') + chip('carbTarget', 60, 'Yes, about 60 g') + '</div>' +
      '<span class="hint">FoodBudge picks dinners near that amount, serves smaller portions of rice, pasta, bread and potatoes when needed, and avoids sugary sauces. Use the amount your doctor or dietitian gave you.</span></div>';
  }
  function storeChoices() {
    return (STORES[state.settings.country] || STORES.OTHER).concat([STORE_UNSURE]);
  }
  function countryField() {
    return '<div class="field"><span class="label">Country</span><div class="chips">' + Object.keys(COUNTRIES).map(function (c) {
      return '<button class="chip" data-act="country" data-v="' + c + '" aria-pressed="' + (state.settings.country === c) + '">' + COUNTRIES[c].name + '</button>';
    }).join('') + '</div></div>';
  }
  function postalField(id) {
    var c = COUNTRIES[state.settings.country] || COUNTRIES.OTHER;
    return '<div class="field"><label for="' + id + '">' + c.postal + '</label>' +
      '<input class="input" id="' + id + '" style="max-width:200px" autocomplete="postal-code" value="' + esc(state.settings.postal) + '"' +
      (c.example ? ' placeholder="e.g. ' + c.example + '"' : '') + ' data-input="postal">' +
      '<span class="hint">Used only to estimate local prices. It stays on this phone.</span></div>';
  }

  // ---------- first-run wizard ----------
  var WIZ = ['welcome', 'people', 'location', 'store', 'budget', 'nights', 'diet', 'health', 'likes', 'staples'];
  function renderWizard() {
    var s = state.settings;
    var step = Math.min(ui.wizStep || 0, WIZ.length - 1);
    var last = WIZ.length - 1;
    var body = '';
    switch (WIZ[step]) {
      case 'welcome':
        body = '<h1 class="wiz-title">Dinners that fit your grocery budget</h1>' +
          '<p class="wiz-lead">Answer a few quick questions. FoodBudge plans a week of dinners you\'ll actually eat and a grocery list priced for your store.</p>' +
          '<ul class="wiz-points"><li><b>Stays under budget.</b> Every dinner shows what it costs per serving.</li>' +
          '<li><b>Wastes less.</b> Leftover ingredients get used in next week\'s dinners.</li>' +
          '<li><b>Free.</b> No account. Your answers stay on this phone.</li></ul>';
        break;
      case 'people':
        body = '<h1 class="wiz-title">How many people are you feeding?</h1>' +
          '<div class="stepper big" role="group" aria-label="People eating"><button data-act="step" data-k="people" data-d="-1" aria-label="Fewer people">−</button><output>' + s.people + '</output><button data-act="step" data-k="people" data-d="1" aria-label="More people">+</button></div>' +
          '<div class="field"><span class="label">Any kids at the table?</span><div class="chips">' + chip('kids', true, 'Yes, keep it kid friendly') + chip('kids', false, 'No kids') + '</div></div>';
        break;
      case 'location':
        body = '<h1 class="wiz-title">Where do you live?</h1>' +
          '<p class="wiz-lead">Grocery prices change from place to place. This helps FoodBudge estimate yours.</p>' +
          countryField() + postalField('wiz-postal');
        break;
      case 'store':
        body = '<h1 class="wiz-title">Where do you usually shop?</h1>' +
          '<div class="opts">' + storeChoices().map(function (st) {
            return '<button class="opt" data-act="store" data-v="' + st.id + '" aria-pressed="' + (s.store === st.id) + '"><span>' + esc(st.name) + '</span>' + storeTier(st) + '</button>';
          }).join('') + '</div><p class="small muted" id="pricenote">' + priceNote() + '</p>' + krogerField();
        break;
      case 'budget':
        var sug = suggestedBudget();
        body = '<h1 class="wiz-title">What do you want to spend on dinners each week?</h1>' +
          '<div class="stepper big"><button data-act="step" data-k="budget" data-d="-5" aria-label="Lower budget">−</button><label class="sr" for="wiz-budget">Weekly budget</label><input id="wiz-budget" inputmode="decimal" value="' + s.budget + '" data-change="setnum" data-k="budget"><button data-act="step" data-k="budget" data-d="5" aria-label="Raise budget">+</button></div>' +
          '<p class="wiz-lead">For ' + s.people + ' ' + (s.people === 1 ? 'person' : 'people') + ' at your store, about <b class="money">' + money(sug) + '</b> a week covers five dinners.</p>' +
          (s.budget !== sug ? '<div><button class="btn sm" data-act="set" data-k="budget" data-v="' + sug + '">Use ' + money(sug) + '</button></div>' : '') +
          '<p class="small muted">This is for dinner groceries only. FoodBudge keeps every plan under it.</p>';
        break;
      case 'nights':
        body = '<h1 class="wiz-title">Which nights do you cook?</h1>' +
          '<div class="chips week">' + DAY_ORDER.map(function (d) {
            return '<button class="chip day" data-act="night" data-d="' + d + '" aria-pressed="' + (!!s.nights[d]) + '">' + DAY_SHORT[d] + '</button>';
          }).join('') + '</div><p class="small muted">Other nights are left open for leftovers or eating out. You can change any night later.</p>' +
          '<div class="field"><span class="label">How often do you want to shop?</span><div class="chips">' + chip('weeks', 1, 'Every week') + chip('weeks', 2, 'Every two weeks') + '</div>' +
          '<span class="hint">With two weeks, fresh produce for week 2 goes on a short list to buy later.</span></div>';
        break;
      case 'diet':
        body = '<h1 class="wiz-title">Anything you don\'t eat?</h1>' +
          '<div class="field"><span class="label">Diet</span><div class="chips">' + chip('diet', 'none', 'I eat everything') + chip('diet', 'pescatarian', 'No meat, fish is OK') + chip('diet', 'vegetarian', 'Vegetarian') + '</div></div>' +
          avoidField('Leave these out');
        break;
      case 'health':
        body = '<h1 class="wiz-title">Any health goals?</h1>' +
          '<p class="wiz-lead">Pick any that matter to you, or skip this. FoodBudge makes healthier swaps and picks dinners that fit.</p>' +
          healthField() + carbField();
        break;
      case 'likes':
        body = '<h1 class="wiz-title">What do you like to eat?</h1>' + styleField() +
          '<div class="field"><span class="label">Favorite kinds of food</span><div class="chips">' + CUISINES.map(function (c) {
            return '<button class="chip" data-act="toggleList" data-k="cuisines" data-v="' + c + '" aria-pressed="' + (s.cuisines.indexOf(c) >= 0) + '">' + c + '</button>';
          }).join('') + '</div><span class="hint">Favorites come up more often. Skip this if you like a bit of everything.</span></div>' +
          '<div class="field"><span class="label">Most time you want to spend cooking</span><div class="chips">' +
          chip('maxMinutes', 25, '25 min') + chip('maxMinutes', 35, '35 min') + chip('maxMinutes', 45, '45 min') + chip('maxMinutes', 0, 'No limit') + '</div></div>';
        break;
      case 'staples':
        body = '<h1 class="wiz-title">What\'s already in your kitchen?</h1>' +
          '<p class="wiz-lead">Check the basics you have. They stay off your grocery list.</p><div class="checks">' +
          COMMON_STAPLES.map(function (id) {
            var on = state.pantry[id] && state.pantry[id].plenty;
            return '<label><input type="checkbox" data-change="staple" data-id="' + id + '"' + (on ? ' checked' : '') + '>' + esc(INGREDIENTS[id].name) + '</label>';
          }).join('') + '</div>';
        break;
    }
    var top = '<header class="wiz-top"><div class="brand">' + I.logo + '<span>FoodBudge</span></div>' +
      (step ? '<span class="small muted">' + step + ' of ' + last + '</span>' : '') + '</header>' +
      (step ? '<div class="meter wiz-meter" role="progressbar" aria-valuemin="0" aria-valuemax="' + last + '" aria-valuenow="' + step + '"><i style="width:' + (step / last * 100).toFixed(1) + '%"></i></div>' : '');
    var foot = '<footer class="wiz-foot">' + (step ? '<button class="btn" data-act="wizback">Back</button>' : '<span></span>') +
      '<button class="btn primary" data-act="wiznext">' + (step === 0 ? 'Get started' : step === last ? 'Plan my week' : 'Next') + '</button></footer>';
    return '<div class="wizard">' + top + '<section class="wiz-body">' + body + '</section>' + foot + '</div>';
  }
  function storeTier(st) {
    if (st.id === 'unsure') return '';
    if (st.level < 0.95) return '<span class="tag good">Low prices</span>';
    if (st.level > 1.05) return '<span class="tag warn">Higher prices</span>';
    return '<span class="tag">Average prices</span>';
  }

  // ---------- share / backup ----------
  function b64(s) { return btoa(unescape(encodeURIComponent(s))); }
  function unb64(s) { return decodeURIComponent(escape(atob(s.replace(/\s+/g, '')))); }
  function shareCode() {
    var p = state.plan;
    var used = {};
    p.days.forEach(function (d) { if (d.recipe) used[d.recipe] = true; });
    var cr = (state.customRecipes || []).filter(function (r) { return used[r.id]; });
    var ci = {};
    cr.forEach(function (r) { r.ing.forEach(function (x) { if (state.customIngredients[x[0]]) ci[x[0]] = state.customIngredients[x[0]]; }); });
    return 'FB1.' + b64(JSON.stringify({ s: p.start, d: p.days.map(function (d) { return [d.recipe || '', d.status]; }), n: state.settings.people, b: state.settings.budget, w: state.settings.weeks, cr: cr, ci: ci }));
  }
  function joinCode(code) {
    code = code.trim();
    if (code.indexOf('FB1.') !== 0) throw new Error('bad');
    var o = JSON.parse(unb64(code.slice(4)));
    (o.cr || []).forEach(function (r) {
      if (!state.customRecipes.some(function (x) { return x.id === r.id; })) state.customRecipes.push(r);
    });
    Object.assign(state.customIngredients, o.ci || {});
    state.settings.people = o.n; state.settings.budget = o.b; state.settings.weeks = o.w || 1;
    state.plan = {
      start: o.s, checked: {}, shopped: false,
      days: o.d.map(function (x, i) { return { date: Planner.addDays(o.s, i), recipe: x[0] || null, status: x[1] }; })
    };
  }
  function copyText(text, el) {
    var done = function () { toast('Copied'); };
    try {
      navigator.clipboard.writeText(text).then(done, function () { selectEl(el); });
    } catch (e) { selectEl(el); }
  }
  function selectEl(el) {
    if (!el) return;
    var range = document.createRange(); range.selectNodeContents(el);
    var sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(range);
    toast('Selected. Press copy on your keyboard.');
  }

  // ---------- sheets ----------
  function openSheet(s) { ui.sheet = s; ui.showAllSwaps = false; ui.placeFor = null; renderSheet(); }
  function closeSheet() { ui.sheet = null; renderSheet(); }
  function renderSheet() {
    var root = document.getElementById('sheet');
    if (!ui.sheet) { root.innerHTML = ''; document.body.style.overflow = ''; return; }
    var html = '';
    if (ui.sheet.type === 'recipe') html = recipeSheet(ui.sheet.id, ui.sheet.i);
    else if (ui.sheet.type === 'swap') html = swapSheet(ui.sheet.i);
    else if (ui.sheet.type === 'add') html = addSheet();
    var wasOpen = !!root.firstChild;
    root.innerHTML = '<div class="scrim" data-act="scrim"><div class="sheet" role="dialog" aria-modal="true"' + (wasOpen ? ' style="animation:none"' : '') + '><div class="grab"></div>' + html + '</div></div>';
    document.body.style.overflow = 'hidden';
  }
  function sheetHead(title, sub) {
    return '<header><div style="min-width:0"><h2>' + title + '</h2>' + (sub ? '<p class="small muted">' + sub + '</p>' : '') + '</div><button class="iconbtn" data-act="close" aria-label="Close">' + I.close + '</button></header>';
  }
  function recipeSheet(id, dayIndex) {
    var r = Planner.recipe(state, id);
    if (!r) return sheetHead('Recipe not found');
    var t = today();
    var k = Planner.scaleFor(state, r);
    var people = state.settings.people;
    var rating = state.ratings[r.id];
    var n = Planner.nutrition(state, r);
    var out = sheetHead(esc(r.name), esc(r.cuisine) + ' · ' + esc(r.protein) + ' · makes ' + people + ' serving' + (people === 1 ? '' : 's'));
    out += '<div class="facts"><div class="fact"><span>Per serving</span><b>' + money(Planner.servingCost(state, r)) + '</b></div>' +
      '<div class="fact"><span>Hands-on</span><b>' + r.min + ' min</b></div>' +
      (state.settings.carbTarget
        ? '<div class="fact"><span>Carbs</span><b>' + (n.known ? n.carbs + ' g' : '?') + '</b></div><div class="fact"><span>Fiber</span><b>' + (n.known ? n.fiber + ' g' : '?') + '</b></div>'
        : '<div class="fact"><span>Calories</span><b>' + (n.known ? n.calories : '?') + '</b></div><div class="fact"><span>Protein</span><b>' + (n.known ? n.protein + ' g' : '?') + '</b></div>') +
      '</div>';
    if (r.note) out += '<p class="small muted">' + esc(r.note) + '</p>';
    var notes = adjustNotes(n);
    if (notes.length) out += '<div class="notice ice"><p class="small"><b>Made for your goals.</b> ' + notes.join(' ') + '</p></div>';
    var tags = r.tags.map(function (tg) {
      return { sheetpan: 'Sheet pan', slowcooker: 'Slow cooker', onepot: 'One pot', kid: 'Kid friendly', spicy: 'Spicy', freezer: 'Freezes well', lowcarb: 'Lower carb', mealprep: 'Good for meal prep' }[tg];
    }).filter(Boolean);
    if (Planner.isVegetarian(state, r)) tags.push('Vegetarian');
    var badges = healthBadges(n);
    if (tags.length || badges.length) out += '<div class="chips">' + badges.map(function (x) { return '<span class="tag good">' + x + '</span>'; }).join('') + tags.map(function (x) { return '<span class="tag">' + x + '</span>'; }).join('') + '</div>';
    out += '<div class="row">' +
      '<button class="btn sm' + (rating === 1 ? ' primary' : '') + '" data-act="rate" data-id="' + esc(r.id) + '" data-v="1" aria-pressed="' + (rating === 1) + '">' + I.up + (rating === 1 ? 'Liked' : 'Like') + '</button>' +
      '<button class="btn sm' + (rating === -1 ? ' danger' : '') + '" data-act="rate" data-id="' + esc(r.id) + '" data-v="-1" aria-pressed="' + (rating === -1) + '">' + I.down + (rating === -1 ? 'Hidden from plans' : 'Not for me') + '</button></div>';
    out += '<h3>Ingredients</h3><ul class="ings">' + Planner.ingredientsFor(state, r).map(function (p) {
      var i = Planner.ing(state, p[0]);
      if (!i) return '';
      var q = p[1] * k;
      var have = Planner.pantryQty(state, p[0], t) >= q;
      return '<li><span>' + esc(i.name.replace(/ \(frozen\)/, '')) + (have ? ' <span class="have">in pantry</span>' : '') + '</span><span class="q">' + amount(q, i) + '</span></li>';
    }).join('') + '<li><span class="muted small">Plus salt and pepper to taste</span><span></span></li></ul>';
    out += nutritionPanel(n);
    out += '<h3>Steps</h3><ol class="steps">' + r.steps.map(function (s) { return '<li><span>' + esc(s) + '</span></li>'; }).join('') + '</ol>';
    if (dayIndex != null) {
      out += '<button class="btn block" data-act="swap" data-i="' + dayIndex + '">' + I.swap + 'Swap this dinner</button>';
    } else if (state.plan) {
      if (ui.placeFor === r.id) {
        out += '<div class="field"><span class="label">Cook it on which night?</span><div class="chips">' + state.plan.days.map(function (d, i) {
          var p = dateParts(d.date);
          return '<button class="chip" data-act="place" data-id="' + esc(r.id) + '" data-i="' + i + '">' + p.dow + ' ' + p.day + '</button>';
        }).join('') + '</div></div>';
      } else {
        out += '<button class="btn primary block" data-act="placeask" data-id="' + esc(r.id) + '">Add to this week</button>';
      }
    }
    if (r.custom) out += '<button class="btn danger sm" data-act="delrecipe" data-id="' + esc(r.id) + '">Delete this recipe</button>';
    return out;
  }
  function ingName(id) {
    var n = Planner.ing(state, id).name.replace(/ \(.*\)$/, '');
    return n.charAt(0).toLowerCase() + n.slice(1);
  }
  function list(words) {
    return words.length < 2 ? words.join('') : words.slice(0, -1).join(', ') + ' and ' + words[words.length - 1];
  }
  // Plain-language list of what FoodBudge changed in a recipe for this household's goals.
  function adjustNotes(n) {
    var s = state.settings, notes = [];
    if (n.swapped.length) {
      notes.push('Swaps: ' + n.swapped.map(function (x) {
        return (x[1] === 'homemade' ? 'homemade ' + ingName(x[0]) + ' (chili powder, cumin, garlic powder and paprika)' : ingName(x[1])) + ' instead of ' + ingName(x[0]);
      }).join('; ') + '.');
    }
    if (n.less.length) notes.push('Uses less ' + list(n.less.map(ingName)) + '.');
    if (n.smaller.length) {
      var why = s.carbTarget && Planner.calTarget(state) ? 'carb and calorie targets' : s.carbTarget ? 'carb target (' + s.carbTarget + ' g)' : 'calorie target (' + Planner.calTarget(state) + ')';
      notes.push('Smaller portion of ' + list(n.smaller.map(ingName)) + ' to fit your ' + why + '.');
    }
    if (s.carbTarget && n.sugar > 0) notes.push('About ' + n.sugar + ' g of the carbs come from added sugar.');
    if (notes.length || s.carbTarget) notes.push('Amounts and nutrition below include these changes. Numbers are estimates; follow your own care plan.');
    return notes;
  }
  function healthBadges(n) {
    if (!n.known) return [];
    var b = [];
    if (n.satfat <= 5 && n.sodium <= 900) b.push('Heart healthy');
    if (n.protein >= 30) b.push('High protein');
    if (n.calories <= 500) b.push('Lower calorie');
    if (n.fiber >= 8) b.push('High fiber');
    if (n.sodium <= 700) b.push('Lower sodium');
    return b;
  }
  // Average nutrition across this week's dinners, checked against the household's goals.
  function healthSummary() {
    var s = state.settings, g = s.goals || [];
    if (!g.length && !s.carbTarget) return '';
    var rs = Planner.planRecipes(state, state.plan).map(function (r) { return Planner.nutrition(state, r); }).filter(function (n) { return n.known; });
    if (!rs.length) return '';
    var avg = function (k) { return Math.round(rs.reduce(function (t, n) { return t + n[k]; }, 0) / rs.length); };
    var items = [];
    var item = function (label, value, unit, status) { items.push('<div class="hs ' + status + '"><b>' + value + unit + '</b><span>' + label + '</span></div>'); };
    var cal = avg('calories'), ct = Planner.calTarget(state);
    item('Calories', cal, '', ct ? (Math.abs(cal - ct) <= 100 ? 'good' : 'warn') : '');
    var pr = avg('protein');
    item('Protein', pr, ' g', g.indexOf('protein') >= 0 ? (pr >= 30 ? 'good' : 'warn') : '');
    if (s.carbTarget) { var c = avg('carbs'); item('Carbs', c, ' g', c <= s.carbTarget + 5 ? 'good' : 'warn'); }
    var sf = avg('satfat');
    item('Sat fat', sf, ' g', g.indexOf('heart') >= 0 ? (sf <= 5 ? 'good' : 'warn') : '');
    var na = avg('sodium');
    item('Sodium', na, ' mg', g.indexOf('sodium') >= 0 || g.indexOf('heart') >= 0 ? (na <= 800 ? 'good' : 'warn') : '');
    var fb = avg('fiber');
    item('Fiber', fb, ' g', g.indexOf('fiber') >= 0 || g.indexOf('heart') >= 0 ? (fb >= 8 ? 'good' : 'warn') : '');
    return '<section class="card health"><div class="row between"><h3>Dinner nutrition this week</h3><span class="small muted">average per serving</span></div>' +
      '<div class="hsgrid">' + items.join('') + '</div></section>';
  }
  function nutritionPanel(n) {
    if (!n.known) return '<p class="small muted">Nutrition isn\'t available for recipes with ingredients that have no nutrition data.</p>';
    var rows = [
      ['Calories', n.calories, ''],
      ['Protein', n.protein, ' g'],
      ['Fat', n.fat, ' g'],
      ['Saturated fat', n.satfat, ' g', true],
      ['Cholesterol', n.cholesterol, ' mg'],
      ['Carbs', n.carbs, ' g'],
      ['Fiber', n.fiber, ' g', true],
      ['Added sugar', n.sugar, ' g', true],
      ['Sodium', n.sodium, ' mg']
    ];
    return '<section class="nutri" aria-label="Nutrition per serving"><h3>Nutrition <span class="muted small">per serving</span></h3>' +
      '<dl>' + rows.map(function (x) {
        return '<div' + (x[3] ? ' class="sub"' : '') + '><dt>' + x[0] + '</dt><dd>' + x[1] + x[2] + '</dd></div>';
      }).join('') + '</dl>' +
      '<p class="small muted">Estimated from typical ingredient data. Salt you add to taste isn\'t counted.</p></section>';
  }
  function swapSheet(i) {
    var d = state.plan.days[i];
    var p = dateParts(d.date);
    var cur = d.recipe ? Planner.recipe(state, d.recipe) : null;
    var opts = Planner.swapOptions(state, state.plan, i, today(), ui.showAllSwaps ? 0 : 8);
    var out = sheetHead('Swap ' + p.dow + '\'s dinner', cur ? 'Now: ' + esc(cur.name) : 'Pick a dinner');
    out += '<p class="small muted">Best matches first. The amount shows how your grocery total changes, counting packs you are already buying.</p>';
    out += '<div class="rlist">' + opts.map(function (o) {
      var dl = Math.round(o.delta * 100) / 100;
      return '<button class="swapopt" data-act="pick" data-i="' + i + '" data-id="' + esc(o.recipe.id) + '"><span class="rname" style="font-family:var(--display);font-weight:600">' + esc(o.recipe.name) + '</span>' +
        '<span class="delta ' + (dl < 0 ? 'down' : dl > 0 ? 'up' : '') + '">' + (dl > 0 ? '+' : '') + (dl === 0 ? '±' + money(0) : money(dl)) + '</span>' +
        '<span class="small muted">' + esc(o.recipe.cuisine) + ' · ' + o.recipe.min + ' min · ' + (state.settings.carbTarget ? carbText(o.recipe) + ' · ' : '') + money(Planner.servingCost(state, o.recipe)) + '/serving' + (state.ratings[o.recipe.id] === 1 ? ' · Liked' : '') + '</span></button>';
    }).join('') + '</div>';
    if (!opts.length) out += '<div class="empty"><p>No other recipes fit your filters. Loosen them in Setup or add your own recipe.</p></div>';
    if (!ui.showAllSwaps) out += '<button class="btn block" data-act="allswaps">Show every recipe</button>';
    return out;
  }
  function addSheet() {
    var d = ui.draft;
    var out = sheetHead('Add your own recipe', 'It joins your plans and gets priced like the rest.');
    out += '<form data-form="addrecipe" class="view" style="padding:0">' +
      '<div class="field"><label for="ar-name">Name</label><input class="input" id="ar-name" required value="' + esc(d.name) + '" placeholder="Grandma\'s chicken & rice"></div>' +
      '<div class="grid2"><div class="field"><label for="ar-cuisine">Kind of food</label><select class="input" id="ar-cuisine">' + CUISINES.map(function (c) { return '<option' + (d.cuisine === c ? ' selected' : '') + '>' + c + '</option>'; }).join('') + '</select></div>' +
      '<div class="field"><label for="ar-protein">Main protein</label><select class="input" id="ar-protein">' + PROTEINS.map(function (c) { return '<option' + (d.protein === c ? ' selected' : '') + '>' + c + '</option>'; }).join('') + '</select></div>' +
      '<div class="field"><label for="ar-min">Minutes</label><input class="input" id="ar-min" inputmode="numeric" value="' + esc(d.min) + '"></div>' +
      '<div class="field"><label for="ar-serves">Serves</label><input class="input" id="ar-serves" inputmode="numeric" value="' + esc(d.serves) + '"></div></div>' +
      '<div class="field"><span class="label">Ingredients</span><span class="hint">Amount for the whole recipe, in the unit next to each name.</span>' +
      d.ing.map(function (row, idx) {
        return '<div class="ingrow">' + ingSelect('ar-ing-' + idx, allIngredientIds(), row[0]) +
          '<input class="input" id="ar-q-' + idx + '" inputmode="decimal" value="' + esc(row[1]) + '" aria-label="Amount">' +
          '<button type="button" class="iconbtn" data-act="ingdel" data-i="' + idx + '" aria-label="Remove ingredient">' + I.close + '</button></div>';
      }).join('') +
      '<div class="row"><button type="button" class="btn sm" data-act="ingadd">' + I.plus + 'Ingredient</button><button type="button" class="btn sm ghost" data-act="newing">Not in the list?</button></div></div>';
    if (d.newIng) {
      out += '<div class="card"><h3>New ingredient</h3><div class="grid2">' +
        '<div class="field" style="grid-column:1/-1"><label for="ni-name">Name</label><input class="input" id="ni-name" placeholder="Feta cheese"></div>' +
        '<div class="field"><label for="ni-aisle">Aisle</label><select class="input" id="ni-aisle">' + AISLES.map(function (a) { return '<option>' + a + '</option>'; }).join('') + '</select></div>' +
        '<div class="field"><label for="ni-unit">Recipe unit</label><input class="input" id="ni-unit" placeholder="oz, cup, each"></div>' +
        '<div class="field"><label for="ni-pack">Units in one pack</label><input class="input" id="ni-pack" inputmode="decimal" placeholder="6"></div>' +
        '<div class="field"><label for="ni-price">Pack price</label><input class="input" id="ni-price" inputmode="decimal" placeholder="3.49"></div>' +
        '<div class="field" style="grid-column:1/-1"><label for="ni-life">How long it keeps</label><select class="input" id="ni-life"><option value="days">About a week</option><option value="weeks" selected>A few weeks</option><option value="months">Months</option></select></div>' +
        '</div><button type="button" class="btn sm primary" data-act="saveing">Add ingredient</button></div>';
    }
    out += '<div class="field"><label for="ar-steps">Steps</label><textarea class="input" id="ar-steps" placeholder="One step per line">' + esc(d.steps) + '</textarea></div>' +
      '<button class="btn primary block">Save recipe</button></form>';
    return out;
  }
  function syncDraft() {
    var d = ui.draft, v = function (id) { var el = document.getElementById(id); return el ? el.value : ''; };
    d.name = v('ar-name'); d.cuisine = v('ar-cuisine'); d.protein = v('ar-protein'); d.min = v('ar-min'); d.serves = v('ar-serves'); d.steps = v('ar-steps');
    d.ing = d.ing.map(function (row, idx) { return [v('ar-ing-' + idx), v('ar-q-' + idx)]; });
  }

  // ---------- actions ----------
  var actions = {
    tab: function (el) { closeSheet(); go(el.dataset.v); },
    shuffle: function () {
      state.plan.days.forEach(function (d) { if (d.status === 'cook') d.recipe = null; });
      fillPlan(state.plan);
      save(); render(); toast('New dinners picked');
    },
    nextweek: function () { startNewPlan(true); render(); toast('New week planned'); },
    recipe: function (el) { openSheet({ type: 'recipe', id: el.dataset.id, i: el.dataset.i != null ? +el.dataset.i : null }); },
    swap: function (el) { openSheet({ type: 'swap', i: +el.dataset.i }); },
    allswaps: function () { ui.showAllSwaps = true; renderSheet(); },
    pick: function (el) {
      var d = state.plan.days[+el.dataset.i];
      d.recipe = el.dataset.id; d.status = 'cook';
      save(); closeSheet(); render(); toast('Swapped. List and total updated.');
    },
    placeask: function (el) { ui.placeFor = el.dataset.id; renderSheet(); },
    place: function (el) {
      var d = state.plan.days[+el.dataset.i];
      d.recipe = el.dataset.id; d.status = 'cook';
      save(); closeSheet(); go('plan'); toast('Added to ' + dateParts(d.date).dow);
    },
    rate: function (el) {
      var id = el.dataset.id, v = +el.dataset.v;
      if (state.ratings[id] === v) delete state.ratings[id]; else state.ratings[id] = v;
      save(); renderSheet();
      var main = document.getElementById('view'); if (main) main.innerHTML = renderView();
    },
    close: closeSheet,
    scrim: function (el, e) { if (e.target === el) closeSheet(); },
    check: function (el) {
      var c = state.plan.checked || (state.plan.checked = {});
      if (c[el.dataset.id]) delete c[el.dataset.id]; else c[el.dataset.id] = true;
      save(); render();
    },
    have: function (el) {
      var id = el.dataset.id, i = Planner.ing(state, id);
      var items = Planner.groceryList(state, state.plan, today());
      var it = items.filter(function (x) { return x.id === id; })[0];
      if (i.life === 'months') state.pantry[id] = { plenty: true };
      else state.pantry[id] = { qty: it ? it.need : i.pack, exp: Planner.addDays(today(), Planner.LIFE_DAYS[i.life] || 21) };
      save(); render(); toast(i.name + ' moved to your pantry');
    },
    unhave: function (el) { delete state.pantry[el.dataset.id]; save(); render(); },
    editprice: function (el) {
      ui.priceEdit = el.dataset.id; render();
      var input = document.getElementById('pe-' + el.dataset.id);
      if (input) { input.focus(); input.select(); }
    },
    shopped: function () {
      state.plan.shopped = !state.plan.shopped;
      if (state.plan.shopped) {
        var c = state.plan.checked = state.plan.checked || {};
        Planner.groceryList(state, state.plan, today()).forEach(function (x) { if (x.packs) c[x.id] = true; });
      }
      save(); render(); toast(state.plan.shopped ? 'Nice. Extras go to your pantry next week.' : 'Undone');
    },
    rfilter: function (el) { ui.rFilter = el.dataset.v; render(); },
    addrecipe: function () {
      ui.draft = { name: '', cuisine: 'American', protein: 'Chicken', min: '30', serves: '4', steps: '', ing: [['', ''], ['', ''], ['', '']], newIng: false };
      openSheet({ type: 'add' });
    },
    ingadd: function () { syncDraft(); ui.draft.ing.push(['', '']); renderSheet(); },
    ingdel: function (el) { syncDraft(); ui.draft.ing.splice(+el.dataset.i, 1); renderSheet(); },
    newing: function () { syncDraft(); ui.draft.newIng = true; renderSheet(); },
    saveing: function () {
      syncDraft();
      var v = function (id) { return document.getElementById(id).value.trim(); };
      var name = v('ni-name'), unit = v('ni-unit') || 'each', pack = parseFloat(v('ni-pack')), price = parseFloat(v('ni-price'));
      if (!name || !(pack > 0) || !(price >= 0)) { toast('Add a name, pack size and price'); return; }
      var id = 'c_' + name.toLowerCase().replace(/[^a-z0-9]+/g, '') + '_' + Date.now().toString(36);
      state.customIngredients[id] = { name: name, aisle: v('ni-aisle'), unit: unit, pack: pack, label: pack + ' ' + unit, price: price, life: v('ni-life'), custom: true };
      var empty = ui.draft.ing.filter(function (r) { return !r[0]; })[0];
      if (empty) empty[0] = id; else ui.draft.ing.push([id, '']);
      ui.draft.newIng = false;
      save(); renderSheet(); toast(name + ' added');
    },
    delrecipe: function (el) {
      var id = el.dataset.id;
      state.customRecipes = state.customRecipes.filter(function (r) { return r.id !== id; });
      state.plan.days.forEach(function (d) { if (d.recipe === id) d.recipe = null; });
      fillPlan(state.plan, true);
      save(); closeSheet(); render(); toast('Recipe deleted');
    },
    freeze: function (el) {
      var p = state.pantry[el.dataset.id];
      p.frozen = true; p.exp = Planner.addDays(today(), 90);
      save(); render(); toast('Marked as frozen. Good for about 3 months.');
    },
    premove: function (el) { delete state.pantry[el.dataset.id]; save(); render(); },
    step: function (el) {
      var k = el.dataset.k, d = +el.dataset.d;
      var min = k === 'people' ? 1 : 10, max = k === 'people' ? 12 : 1000;
      state.settings[k] = Math.max(min, Math.min(max, Math.round((state.settings[k] + d) * 100) / 100));
      if (k === 'budget') ui.budgetTouched = true;
      save(); render();
    },
    night: function (el) {
      var d = +el.dataset.d;
      state.settings.nights[d] = state.settings.nights[d] ? 0 : 1;
      save(); render();
    },
    set: function (el) {
      state.settings[el.dataset.k] = JSON.parse(el.dataset.v);
      if (el.dataset.k === 'budget') ui.budgetTouched = true;
      var swapped = (el.dataset.k === 'style' || el.dataset.k === 'diet') && state.settings.onboarded ? dropBlocked() : 0;
      save(); render();
      if (swapped) toast(swapped === 1 ? '1 dinner swapped to fit' : swapped + ' dinners swapped to fit');
    },
    toggleList: function (el) {
      var list = state.settings[el.dataset.k], v = el.dataset.v, at = list.indexOf(v);
      if (at >= 0) list.splice(at, 1); else list.push(v);
      var swapped = el.dataset.k === 'avoid' && state.settings.onboarded ? dropBlocked() : 0;
      save(); render();
      if (swapped) toast(swapped === 1 ? '1 dinner swapped out' : swapped + ' dinners swapped out');
    },
    resetprices: function () { state.priceOverrides = {}; save(); render(); toast('Back to estimated prices'); },
    wiznext: function () {
      var step = ui.wizStep || 0;
      if (WIZ[step] === 'nights' && !state.settings.nights.some(Boolean)) { toast('Pick at least one night'); return; }
      if (step >= WIZ.length - 1) {
        state.settings.onboarded = true;
        state.plan = buildPlan(today());
        ui.wizStep = 0;
        save(); go('plan'); toast('Your week is planned');
        return;
      }
      ui.wizStep = step + 1;
      if (WIZ[ui.wizStep] === 'budget' && !ui.budgetTouched) state.settings.budget = suggestedBudget();
      save(); render(); window.scrollTo(0, 0);
    },
    wizback: function () { ui.wizStep = Math.max(0, (ui.wizStep || 0) - 1); render(); window.scrollTo(0, 0); },
    country: function (el) {
      var s = state.settings;
      if (s.country !== el.dataset.v) { s.country = el.dataset.v; s.store = 'unsure'; s.postal = ''; }
      s.currency = COUNTRIES[s.country].currency;
      updatePriceLevel(); save(); render();
    },
    store: function (el) {
      state.settings.store = el.dataset.v; updatePriceLevel(); save();
      if (krogerOn() && !state.settings.krogerStore && state.settings.postal) findKroger(); else render();
    },
    findkroger: function () { findKroger(); },
    showallstyles: function () { ui.showAllStyles = !ui.showAllStyles; render(); },
    pickkroger: function (el) {
      state.settings.krogerStore = { id: el.dataset.v, name: el.dataset.name };
      ui.krogerStores = null; save();
      refreshLive(true); render();
    },
    rerunsetup: function () {
      state.settings.onboarded = false;
      ui.wizStep = 1; ui.budgetTouched = true;
      save(); render(); window.scrollTo(0, 0);
    },
    replan: function () {
      state.settings.onboarded = true;
      var start = state.plan && !planEnded() ? state.plan.start : today();
      state.plan = buildPlan(start);
      save(); go('plan'); toast('Your week is planned');
    },
    copy: function (el) { var t = document.getElementById(el.dataset.target); copyText(t.textContent, t); },
    join: function () {
      var code = document.getElementById('joincode').value;
      try { joinCode(code); save(); go('plan'); toast('Shared plan loaded'); }
      catch (e) { toast('That code didn\'t work. Copy the whole code and try again.'); }
    },
    backup: function () {
      var text = 'FBK1.' + b64(JSON.stringify(state));
      var box = document.getElementById('restore');
      box.value = text;
      copyText(text, null);
    },
    restore: function () {
      var raw = document.getElementById('restore').value.trim();
      try {
        if (raw.indexOf('FBK1.') !== 0) throw new Error('bad');
        var s = JSON.parse(unb64(raw.slice(5)));
        if (!s.settings) throw new Error('bad');
        var d = defaults();
        Object.keys(s).forEach(function (k) { if (k === 'settings') Object.assign(d.settings, s.settings); else d[k] = s[k]; });
        state = d;
        if (!state.plan) state.plan = buildPlan(today());
        save(); go('plan'); toast('Backup restored');
      } catch (e) { toast('That backup didn\'t work. Paste the whole text.'); }
    },
    install: function () {
      if (!installPrompt) return;
      installPrompt.prompt();
      installPrompt.userChoice.then(function () { installPrompt = null; render(); });
    },
    askreset: function () { ui.confirmReset = true; render(); },
    cancelreset: function () { ui.confirmReset = false; render(); },
    reset: function () {
      state = defaults();
      state.plan = buildPlan(today());
      ui.confirmReset = false;
      save(); go('plan'); toast('All data erased');
    }
  };

  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-act]');
    if (!el || !actions[el.dataset.act]) return;
    if (el.tagName === 'BUTTON' && el.closest('form') && el.type !== 'button') return; // let submit handlers run
    actions[el.dataset.act](el, e);
  });
  document.addEventListener('change', function (e) {
    var el = e.target, k = el.dataset.change;
    if (!k) return;
    if (k === 'status') {
      var d = state.plan.days[+el.dataset.i];
      d.status = el.value;
      if (d.status === 'cook' && !d.recipe) fillPlan(state.plan, true);
      save(); render();
      toast(d.status === 'cook' ? 'Dinner added' : 'Groceries for that night removed');
    } else if (k === 'setnum') {
      // No re-render here: the change fires on blur, and re-rendering would swallow a tap on Next.
      var n = parseFloat(el.value);
      if (n > 0) { state.settings[el.dataset.k] = n; save(); }
      if (el.dataset.k === 'budget') ui.budgetTouched = true;
    } else if (k === 'store') {
      state.settings.store = el.value; updatePriceLevel(); save();
      if (krogerOn()) { if (!state.settings.krogerStore) findKroger(); else { render(); refreshLive(); } }
      else render();
    } else if (k === 'currency') {
      state.settings.currency = el.value.trim().slice(0, 4) || '$'; save(); render();
    } else if (k === 'staple') {
      if (el.checked) state.pantry[el.dataset.id] = { plenty: true };
      else delete state.pantry[el.dataset.id];
      save();
    }
  });
  document.addEventListener('input', function (e) {
    if (e.target.dataset.input === 'postal') {
      state.settings.postal = e.target.value.trim().slice(0, 10);
      updatePriceLevel(); save();
      var note = document.getElementById('pricenote'); if (note) note.innerHTML = priceNote();
    }
    if (e.target.dataset.input === 'rquery') {
      ui.rQuery = e.target.value;
      var list = document.getElementById('rlist');
      if (list) {
        // Re-render only the list so the search box keeps focus.
        var html = renderRecipes();
        var tmp = document.createElement('div'); tmp.innerHTML = html;
        list.innerHTML = tmp.querySelector('#rlist').innerHTML;
      }
    }
  });
  document.addEventListener('submit', function (e) {
    var f = e.target, kind = f.dataset.form;
    if (!kind) return;
    e.preventDefault();
    if (kind === 'price') {
      var v = parseFloat(f.querySelector('input').value.replace(/[^0-9.]/g, ''));
      if (v >= 0) state.priceOverrides[f.dataset.id] = Math.round(v * 100) / 100;
      ui.priceEdit = null; save(); render(); toast('Price saved for future lists');
    } else if (kind === 'avoid') {
      var word = f.querySelector('input').value.trim().toLowerCase().replace(/\s+/g, ' ').slice(0, 40);
      if (!word) return;
      var av = state.settings.avoid;
      if (av.indexOf(word) < 0) av.push(word);
      var count = Planner.wordCount(state, word);
      var gone = state.settings.onboarded ? dropBlocked() : 0;
      save(); render();
      var again = document.getElementById('avoid-in'); if (again) again.focus();
      toast(count ? 'Leaving out ' + count + (count === 1 ? ' dinner' : ' dinners') + ' with ' + word + (gone ? ' (' + gone + ' swapped this week)' : '')
        : 'No dinners use ' + word + ' right now. It stays on your list in case new ones do.');
    } else if (kind === 'padd') {
      var id = document.getElementById('padd-id').value;
      var q = parseFloat(document.getElementById('padd-q').value);
      if (!id) { toast('Choose an ingredient first'); return; }
      var i = Planner.ing(state, id);
      state.pantry[id] = q > 0 ? { qty: q, exp: Planner.addDays(today(), Planner.LIFE_DAYS[i.life] || 21) } : { plenty: true };
      save(); render(); toast(i.name + ' added');
    } else if (kind === 'addrecipe') {
      syncDraft();
      var d = ui.draft;
      var ing = d.ing.filter(function (r) { return r[0] && parseFloat(r[1]) > 0; }).map(function (r) { return [r[0], parseFloat(r[1])]; });
      if (!d.name.trim()) { toast('Give the recipe a name'); return; }
      if (!ing.length) { toast('Add at least one ingredient with an amount'); return; }
      var r = {
        id: 'u_' + Date.now().toString(36), custom: true, name: d.name.trim(), cuisine: d.cuisine, protein: d.protein,
        min: parseInt(d.min, 10) || 30, serves: parseInt(d.serves, 10) || 4, tags: [], ing: ing,
        steps: d.steps.split('\n').map(function (s) { return s.trim(); }).filter(Boolean)
      };
      state.customRecipes.push(r);
      save(); ui.rFilter = 'mine'; closeSheet(); go('recipes'); toast('Recipe saved');
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && ui.sheet) closeSheet();
  });
  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault(); installPrompt = e;
    if (view === 'settings') render();
  });

  // ---------- boot ----------
  state = load();
  if (typeof Kroger === 'undefined' || !Kroger.enabled()) state.live = null;
  updatePriceLevel(); // picks up this month's regional price changes
  if (!state.plan) state.plan = buildPlan(today());
  else dropBlocked();
  prunePantry();
  save();
  render();
  refreshLive();

  if ('serviceWorker' in navigator && /^https?:/.test(location.protocol) && document.querySelector('link[rel="manifest"]')) {
    navigator.serviceWorker.register('sw.js').catch(function () { /* offline support unavailable */ });
  }
})();

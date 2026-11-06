// Pricing, filtering and plan-building logic. No DOM access here.
var Planner = (function () {
  var EPS = 1e-6;
  var LIFE_DAYS = { days: 6, weeks: 21, months: 180 };
  var AVOID_FLAGS = { pork: 'p', beef: 'b', dairy: 'd', gluten: 'g', nuts: 'n', fish: 'f', shellfish: 's', eggs: 'e' };

  function allRecipes(state) {
    return RECIPES.concat(state.customRecipes || []);
  }

  function recipe(state, id) {
    var list = allRecipes(state);
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  }

  function ing(state, id) {
    return (state.customIngredients && state.customIngredients[id]) || INGREDIENTS[id] || null;
  }

  // Live store prices (Kroger) apply only while that store is still the one picked in Setup.
  function live(state, id) {
    var s = state.settings, l = state.live;
    if (!l || !l.items || s.store !== 'kroger' || !s.krogerStore || l.loc !== s.krogerStore.id) return null;
    return l.items[id] || null;
  }

  // Monthly government data is a month or two behind; carry it forward with recent food inflation.
  var projection = (function () {
    if (typeof PRICE_DATA === 'undefined') return 1;
    var parts = PRICE_DATA.month.split('-'), now = new Date();
    var months = (now.getFullYear() - parts[0]) * 12 + (now.getMonth() + 1 - parts[1]);
    return Math.pow(1 + PRICE_DATA.yearlyChange, Math.max(0, Math.min(6, months)) / 12);
  })();

  // Price of one pack at a typical supermarket, before store and area adjustments.
  function basePrice(state, id) {
    var custom = state.customIngredients && state.customIngredients[id];
    if (!custom && typeof PRICE_DATA !== 'undefined' && PRICE_DATA.items[id]) return PRICE_DATA.items[id][0] * projection;
    var i = ing(state, id);
    return i ? i.price : 0;
  }

  function price(state, id) {
    var o = state.priceOverrides && state.priceOverrides[id];
    if (o != null) return o;
    var l = live(state, id);
    if (l) return l.s || l.p;
    if (!ing(state, id)) return 0;
    return Math.round(basePrice(state, id) * (state.settings.priceLevel || 1) * 100) / 100;
  }

  // Where a price came from, for labels: 'mine', 'sale', 'live' or 'estimate', and the yearly change.
  function priceInfo(state, id) {
    if (state.priceOverrides && state.priceOverrides[id] != null) return { source: 'mine' };
    var l = live(state, id);
    if (l) return { source: l.s ? 'sale' : 'live', product: l.d, regular: l.p };
    var d = typeof PRICE_DATA !== 'undefined' && !(state.customIngredients && state.customIngredients[id]) && PRICE_DATA.items[id];
    return { source: 'estimate', change: d ? d[1] : 0 };
  }

  function flagsOf(state, r) {
    var f = '';
    r.ing.forEach(function (pair) {
      var i = ing(state, pair[0]);
      if (i && i.flags) f += i.flags;
    });
    return f;
  }

  function isVegetarian(state, r) {
    return !/[mfs]/.test(flagsOf(state, r));
  }

  function allowed(state, r) {
    var s = state.settings;
    var flags = flagsOf(state, r);
    if (s.diet === 'vegetarian' && /[mfs]/.test(flags)) return false;
    if (s.diet === 'pescatarian' && /m/.test(flags)) return false;
    for (var k = 0; k < (s.avoid || []).length; k++) {
      var a = s.avoid[k];
      if (a === 'spicy') { if (r.tags.indexOf('spicy') >= 0) return false; continue; }
      if (AVOID_FLAGS[a] && flags.indexOf(AVOID_FLAGS[a]) >= 0) return false;
    }
    var words = avoidPatterns(s.avoid || []);
    for (var w = 0; w < words.length; w++) if (hasWord(state, r, words[w])) return false;
    if (s.maxMinutes && r.min > s.maxMinutes) return false;
    if (state.ratings && state.ratings[r.id] === -1) return false;
    if (!styleOK(state, r)) return false;
    return meetsGoals(state, r);
  }

  // Leave-outs that aren't a food group (mushrooms, lima beans, olives...) match ingredient and
  // recipe names, singular or plural: "mushrooms" catches "White mushrooms" and "Cream of mushroom soup".
  function wordPattern(text) {
    var w = String(text).toLowerCase().trim();
    if (!w) return null;
    var forms = [w, w.replace(/s$/, ''), w.replace(/es$/, '')].filter(Boolean).map(function (v) {
      return v.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    });
    // Leaving out olives shouldn't leave out everything cooked in olive oil.
    return { re: new RegExp('\\b(?:' + forms.join('|') + ')(?:e?s)?\\b', 'i'), oil: /\boil\b/.test(w) };
  }
  var avoidCache = { key: null, list: [] };
  function avoidPatterns(avoid) {
    var key = avoid.join('|');
    if (avoidCache.key !== key) {
      avoidCache = {
        key: key,
        list: avoid.filter(function (a) { return a !== 'spicy' && !AVOID_FLAGS[a]; }).map(wordPattern).filter(Boolean)
      };
    }
    return avoidCache.list;
  }
  function hasWord(state, r, p) {
    if (p.re.test(r.name)) return true;
    for (var i = 0; i < r.ing.length; i++) {
      var g = ing(state, r.ing[i][0]);
      if (!g || (!p.oil && /\boil\b/i.test(g.name))) continue;
      if (p.re.test(g.name)) return true;
    }
    return false;
  }
  // How many dinners mention a word, for "No dinners use lima beans right now".
  function wordCount(state, text) {
    var p = wordPattern(text);
    return p ? allRecipes(state).filter(function (r) { return hasWord(state, r, p); }).length : 0;
  }

  // Dinner style: 'classic' (everyday American home cooking, the default), 'mix' (classic plus
  // other dishes now and then) or 'adventurous' (everything). Tofu dinners need a reason:
  // a vegetarian diet or "anything goes".
  function usesTofu(r) {
    for (var i = 0; i < r.ing.length; i++) if (r.ing[i][0] === 'tofu') return true;
    return false;
  }
  function styleOK(state, r) {
    if (r.custom) return true;
    var s = state.settings, style = s.style || 'classic';
    if (usesTofu(r)) return style === 'adventurous' || s.diet === 'vegetarian';
    if (r.world) return style !== 'classic';
    return true;
  }

  // ---------- nutrition & health goals ----------
  var adjustCache = { key: null, map: {} };

  // [calories, protein, fat, carbs, fiber, sodium, sat fat, cholesterol] per recipe unit, or null if unknown.
  function nutritionPerUnit(state, id) {
    var c = state.customIngredients && state.customIngredients[id];
    if (c) return c.nutrition || null;
    return NUTRITION[id] || null;
  }

  function goals(state) { return state.settings.goals || []; }
  function hasGoal(state, g) { return goals(state).indexOf(g) >= 0; }
  function calTarget(state) { return hasGoal(state, 'calories') ? (state.settings.calTarget || 550) : 0; }

  // The recipe as this household will cook it: health-goal swaps first (lean beef, olive oil,
  // Greek yogurt, low-sodium broth, brown rice...), then smaller starchy sides, down to half,
  // to fit a carb or calorie target.
  function adjust(state, r) {
    var s = state.settings;
    var key = [s.carbTarget || 0, calTarget(state), goals(state).slice().sort().join(',')].join('|');
    if (key === '0|0|') return { ing: r.ing, swapped: [], less: [], smaller: [] };
    if (adjustCache.key !== key) adjustCache = { key: key, map: {} };
    if (adjustCache.map[r.id]) return adjustCache.map[r.id];

    var actions = {};
    goals(state).forEach(function (g) {
      var table = HEALTH_SWAPS[g] || {};
      Object.keys(table).forEach(function (id) {
        var v = table[id], a = actions[id];
        if (Array.isArray(v)) { if (!a || a.type !== 'replace') actions[id] = { type: 'replace', to: v }; }
        else if (!a) actions[id] = { type: 'scale', f: v };
        else if (a.type === 'scale') a.f = Math.min(a.f, v);
      });
    });
    var merged = {}, order = [], swapped = [], less = [];
    var add = function (id, q) {
      if (merged[id] == null) { merged[id] = 0; order.push(id); }
      merged[id] += q;
    };
    r.ing.forEach(function (p) {
      var a = actions[p[0]];
      if (a && a.type === 'replace') {
        a.to.forEach(function (t) { add(t[0], p[1] * t[1]); });
        swapped.push([p[0], a.to.length > 1 ? 'homemade' : a.to[0][0]]);
      } else if (a && a.type === 'scale') {
        add(p[0], p[1] * a.f);
        less.push(p[0]);
      } else add(p[0], p[1]);
    });
    var list = order.map(function (id) { return [id, Math.round(merged[id] * 100) / 100]; });

    var serves = r.serves || 4;
    var sum = function (idx, starchy) {
      var t = 0;
      list.forEach(function (p) {
        var n = nutritionPerUnit(state, p[0]);
        if (n && (STARCHES.indexOf(p[0]) >= 0) === starchy) t += n[idx] * p[1];
      });
      return t;
    };
    var fit = function (idx, target, floor) {
      if (!target) return 1;
      var starch = sum(idx, true), rest = sum(idx, false);
      if (!starch || (starch + rest) / serves <= target) return 1;
      return Math.max(floor, Math.min(1, (target * serves - rest) / starch));
    };
    // Starchy sides can shrink to about a third (1/3 cup rice instead of 1 cup) to reach a carb target.
    var factor = Math.min(fit(3, s.carbTarget || 0, 0.3), fit(0, calTarget(state), 0.6));
    var smaller = [];
    if (factor < 1) {
      list = list.map(function (p) {
        if (STARCHES.indexOf(p[0]) < 0) return p;
        smaller.push(p[0]);
        return [p[0], Math.round(p[1] * factor * 100) / 100];
      });
    }
    var out = { ing: list, swapped: swapped, less: less, smaller: smaller };
    adjustCache.map[r.id] = out;
    return out;
  }

  function ingredientsFor(state, r) { return adjust(state, r).ing; }

  // Per-serving nutrition for this household's version of the recipe.
  function nutrition(state, r) {
    var a = adjust(state, r);
    var t = [0, 0, 0, 0, 0, 0, 0, 0], sugar = 0, known = true;
    a.ing.forEach(function (p) {
      var n = nutritionPerUnit(state, p[0]);
      if (!n) { known = false; return; }
      for (var k = 0; k < 8; k++) t[k] += (n[k] || 0) * p[1];
      if (ADDED_SUGAR.indexOf(p[0]) >= 0) sugar += n[3] * p[1];
    });
    var serves = r.serves || 4;
    var per = function (x, step) { return Math.round(x / serves / step) * step; };
    return {
      calories: per(t[0], 10), protein: per(t[1], 1), fat: per(t[2], 1), carbs: per(t[3], 1),
      fiber: per(t[4], 1), sodium: per(t[5], 10), satfat: per(t[6], 1), cholesterol: per(t[7], 5),
      sugar: per(sugar, 1), known: known, swapped: a.swapped, less: a.less, smaller: a.smaller
    };
  }

  // Limits a dinner must meet for the household's goals (after swaps and portions).
  function meetsGoals(state, r) {
    var s = state.settings;
    var n = nutrition(state, r);
    if (!n.known) return true;
    if (s.carbTarget && (n.carbs > s.carbTarget || n.sugar > 12)) return false;
    if (hasGoal(state, 'heart') && n.satfat > 10) return false;
    if (hasGoal(state, 'calories') && n.calories > calTarget(state) + 100) return false;
    if (hasGoal(state, 'sodium') && n.sodium > 1400) return false;
    if (hasGoal(state, 'protein') && n.protein < 20) return false;
    return true;
  }

  function healthScore(state, r) {
    var s = state.settings;
    if (!s.carbTarget && !goals(state).length) return 0;
    var n = nutrition(state, r);
    if (!n.known) return 0;
    var score = 0;
    var clamp = function (x, lo, hi) { return Math.max(lo, Math.min(hi, x)); };
    if (s.carbTarget) {
      if (n.fiber >= 7) score += 0.4;
      if (n.sugar > 6) score -= 0.4;
      if (n.smaller.length) score -= 0.15;
      score += Math.max(0, (s.carbTarget - n.carbs) / s.carbTarget) * 0.5;
    }
    if (hasGoal(state, 'heart')) {
      if (n.satfat <= 5) score += 0.4;
      if (n.satfat > 8) score -= 0.4;
      if (n.fiber >= 7) score += 0.2;
    }
    // Aim near the calorie target rather than as low as possible, so dinners stay filling.
    if (hasGoal(state, 'calories')) score += clamp(0.45 - Math.abs(n.calories - calTarget(state)) / calTarget(state) * 1.5, -0.45, 0.45);
    if (hasGoal(state, 'protein')) score += clamp((n.protein - 25) / 25, -0.5, 1) * 0.5;
    if (hasGoal(state, 'sodium')) score += n.sodium <= 700 ? 0.4 : n.sodium > 1100 ? -0.4 : 0;
    if (hasGoal(state, 'fiber')) score += Math.min(n.fiber, 15) / 15 * 0.6;
    return score;
  }

  // Pantry amount on hand right now (Infinity for "always have").
  function pantryQty(state, id, today) {
    var p = state.pantry && state.pantry[id];
    if (!p) return 0;
    if (p.plenty) return Infinity;
    if (p.exp && p.exp < today) return 0;
    return p.qty || 0;
  }

  function scaleFor(state, r) {
    return (state.settings.people || 2) / (r.serves || 4);
  }

  function addNeeds(state, needs, r) {
    var k = scaleFor(state, r);
    ingredientsFor(state, r).forEach(function (pair) {
      needs[pair[0]] = (needs[pair[0]] || 0) + pair[1] * k;
    });
  }

  // Whole-pack cost of buying everything the given recipes need, after the pantry.
  function costOf(state, recipes, today) {
    var needs = {};
    recipes.forEach(function (r) { addNeeds(state, needs, r); });
    var total = 0;
    Object.keys(needs).forEach(function (id) {
      var i = ing(state, id);
      if (!i) return;
      var rem = needs[id] - pantryQty(state, id, today);
      if (rem <= EPS) return;
      total += Math.ceil(rem / i.pack - EPS) * price(state, id);
    });
    return total;
  }

  // Proportional cost per serving (what one plate uses), ignoring the pantry.
  function servingCost(state, r) {
    var sum = 0;
    ingredientsFor(state, r).forEach(function (pair) {
      var i = ing(state, pair[0]);
      if (i) sum += pair[1] * price(state, pair[0]) / i.pack;
    });
    return sum / (r.serves || 4);
  }

  function preference(state, r, recent) {
    var s = state.settings;
    var score = 1;
    var rating = state.ratings && state.ratings[r.id];
    if (rating === 1) score += 1.4;
    if ((s.cuisines || []).indexOf(r.cuisine) >= 0) score += 0.6;
    if (s.kids && r.tags.indexOf('kid') >= 0) score += 0.4;
    if (recent && recent[r.id]) score -= 0.9;
    if (r.custom) score += 0.5;
    score += healthScore(state, r);
    return score;
  }

  function recentIds(state) {
    var out = {};
    (state.history || []).slice(-2).forEach(function (h) {
      (h.recipes || []).forEach(function (id) { out[id] = true; });
    });
    return out;
  }

  function varietyPenalty(picked, r) {
    var p = 0;
    picked.forEach(function (x) {
      if (x.protein === r.protein) p += 0.45;
      if (x.cuisine === r.cuisine) p += 0.2;
    });
    return p;
  }

  // Pick `count` recipes for the plan. `fixed` recipes stay and count toward cost.
  function choose(state, count, fixed, today) {
    fixed = fixed || [];
    var budget = (state.settings.budget || 75) * (state.settings.weeks || 1);
    var pool = allRecipes(state).filter(function (r) { return allowed(state, r); });
    var recent = recentIds(state);
    if (!pool.length) return { recipes: [], cost: 0 };
    var perMeal = budget / Math.max(1, count + fixed.length);
    var best = null;

    // If no plan fits the budget, try again leaning harder on price.
    var attempts = count > 7 ? 30 : 60;
    var weights = [0.55, 1.6, 3.5];
    for (var attempt = 0; attempt < attempts * weights.length; attempt++) {
      var round = Math.floor(attempt / attempts);
      if (round > 0 && attempt % attempts === 0 && best && best.cost <= budget) break;
      var costWeight = weights[round];
      var picked = fixed.slice();
      var baseCost = costOf(state, picked, today);
      var prefTotal = 0;
      for (var n = 0; n < count; n++) {
        var bestR = null, bestU = -Infinity, bestCost = 0;
        for (var j = 0; j < pool.length; j++) {
          var r = pool[j];
          if (picked.indexOf(r) >= 0 && pool.length > count + fixed.length) continue;
          var c = costOf(state, picked.concat([r]), today);
          var marginal = c - baseCost;
          var u = preference(state, r, recent) - varietyPenalty(picked, r)
            - (marginal / perMeal) * costWeight + Math.random() * 1.1;
          if (u > bestU) { bestU = u; bestR = r; bestCost = c; }
        }
        picked.push(bestR);
        prefTotal += preference(state, bestR, recent);
        baseCost = bestCost;
      }
      var over = Math.max(0, baseCost - budget);
      var proteins = {};
      picked.forEach(function (x) { proteins[x.protein] = 1; });
      var score = prefTotal + Object.keys(proteins).length * 0.35 - (over > 0 ? 50 + over : 0) - baseCost / budget * 0.5;
      if (!best || score > best.score) {
        best = { score: score, recipes: picked.slice(fixed.length), cost: baseCost };
      }
    }
    return best;
  }

  function cookDays(plan) {
    return plan.days.filter(function (d) { return d.status === 'cook' && d.recipe; });
  }

  function planRecipes(state, plan) {
    return cookDays(plan).map(function (d) { return recipe(state, d.recipe); }).filter(Boolean);
  }

  function planCost(state, plan, today) {
    return costOf(state, planRecipes(state, plan), today);
  }

  // Ranked alternatives for one day, with how the week total would change.
  function swapOptions(state, plan, dayIndex, today, limit) {
    var others = [];
    plan.days.forEach(function (d, i) {
      if (i !== dayIndex && d.status === 'cook' && d.recipe) {
        var r = recipe(state, d.recipe);
        if (r) others.push(r);
      }
    });
    var current = plan.days[dayIndex].recipe;
    var now = costOf(state, others.concat(current ? [recipe(state, current)].filter(Boolean) : []), today);
    var recent = recentIds(state);
    var inPlan = {};
    plan.days.forEach(function (d) { if (d.recipe) inPlan[d.recipe] = true; });
    var budget = (state.settings.budget || 75) * (state.settings.weeks || 1);
    var opts = allRecipes(state).filter(function (r) {
      return allowed(state, r) && !inPlan[r.id];
    }).map(function (r) {
      var c = costOf(state, others.concat([r]), today);
      var u = preference(state, r, recent) - varietyPenalty(others, r) - (c - now) / (budget / 7) * 0.9;
      return { recipe: r, delta: c - now, total: c, utility: u };
    });
    opts.sort(function (a, b) { return b.utility - a.utility; });
    return limit ? opts.slice(0, limit) : opts;
  }

  // Grocery list for a plan: whole packs, grouped later by aisle.
  function groceryList(state, plan, today) {
    var needs = {}, weekOf = {};
    var start = plan.start;
    plan.days.forEach(function (d) {
      if (d.status !== 'cook' || !d.recipe) return;
      var r = recipe(state, d.recipe);
      if (!r) return;
      var week = daysBetween(start, d.date) >= 7 ? 2 : 1;
      var k = scaleFor(state, r);
      ingredientsFor(state, r).forEach(function (pair) {
        needs[pair[0]] = (needs[pair[0]] || 0) + pair[1] * k;
        weekOf[pair[0]] = weekOf[pair[0]] ? Math.min(weekOf[pair[0]], week) : week;
      });
    });
    var items = [];
    Object.keys(needs).forEach(function (id) {
      var i = ing(state, id);
      if (!i) return;
      var have = pantryQty(state, id, today);
      var rem = needs[id] - have;
      var packs = rem > EPS ? Math.ceil(rem / i.pack - EPS) : 0;
      var extra = packs * i.pack - Math.max(0, rem);
      items.push({
        id: id,
        ing: i,
        need: needs[id],
        have: have,
        buy: Math.max(0, rem),
        packs: packs,
        cost: packs * price(state, id),
        unitPrice: price(state, id),
        extra: packs ? extra : 0,
        later: (state.settings.weeks || 1) > 1 && weekOf[id] === 2 && i.life === 'days',
        freezeTip: packs > 0 && i.freeze && i.life === 'days' && extra >= i.pack * 0.25
      });
    });
    items.sort(function (a, b) {
      var ai = AISLES.indexOf(a.ing.aisle), bi = AISLES.indexOf(b.ing.aisle);
      if (ai !== bi) return ai - bi;
      return a.ing.name.localeCompare(b.ing.name);
    });
    return items;
  }

  // After a shopped plan ends: take out what was cooked, add the extras from whole packs.
  function rollPantry(state, plan, today) {
    var items = groceryList(state, plan, today);
    items.forEach(function (it) {
      var p = state.pantry[it.id];
      if (p && p.plenty) return;
      var used = Math.min(it.need, it.have);
      var left = Math.max(0, it.have - used) + it.extra;
      if (left <= EPS) { delete state.pantry[it.id]; return; }
      state.pantry[it.id] = {
        qty: Math.round(left * 100) / 100,
        exp: addDays(today, LIFE_DAYS[it.ing.life] || 21),
        frozen: false
      };
    });
  }

  function thawItems(state, r) {
    var out = [];
    r.ing.forEach(function (p) {
      var i = ing(state, p[0]);
      if (!i || p[0] === 'meatballs' || !/[mfs]/.test(i.flags || '')) return;
      if (i.aisle !== 'Meat & Seafood' && i.aisle !== 'Frozen') return;
      if (out.indexOf(i) < 0) out.push(i);
    });
    return out;
  }

  // Date helpers (dates are local YYYY-MM-DD strings).
  function iso(d) {
    var m = d.getMonth() + 1, day = d.getDate();
    return d.getFullYear() + '-' + (m < 10 ? '0' : '') + m + '-' + (day < 10 ? '0' : '') + day;
  }
  function parse(s) {
    var p = s.split('-');
    return new Date(+p[0], +p[1] - 1, +p[2]);
  }
  function addDays(s, n) {
    var d = parse(s);
    d.setDate(d.getDate() + n);
    return iso(d);
  }
  function daysBetween(a, b) {
    return Math.round((parse(b) - parse(a)) / 86400000);
  }

  return {
    LIFE_DAYS: LIFE_DAYS,
    allRecipes: allRecipes, recipe: recipe, ing: ing, price: price, priceInfo: priceInfo,
    allowed: allowed, styleOK: styleOK, wordCount: wordCount, isVegetarian: isVegetarian, flagsOf: flagsOf,
    ingredientsFor: ingredientsFor, nutrition: nutrition, meetsGoals: meetsGoals, hasGoal: hasGoal, calTarget: calTarget,
    pantryQty: pantryQty, scaleFor: scaleFor,
    costOf: costOf, servingCost: servingCost, choose: choose,
    planRecipes: planRecipes, planCost: planCost, swapOptions: swapOptions,
    groceryList: groceryList, rollPantry: rollPantry, thawItems: thawItems,
    iso: iso, parse: parse, addDays: addDays, daysBetween: daysBetween
  };
})();

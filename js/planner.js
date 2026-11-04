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

  function price(state, id) {
    var o = state.priceOverrides && state.priceOverrides[id];
    if (o != null) return o;
    var i = ing(state, id);
    if (!i) return 0;
    return Math.round(i.price * (state.settings.priceLevel || 1) * 100) / 100;
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
    if (s.maxMinutes && r.min > s.maxMinutes) return false;
    if (state.ratings && state.ratings[r.id] === -1) return false;
    if (s.carbTarget) {
      var n = nutrition(state, r);
      if (n.known && (n.carbs > s.carbTarget + 5 || n.sugar > 12)) return false;
    }
    return true;
  }

  // ---------- carbs ----------
  var carbCache = { target: null, map: {} };

  function carbsPerUnit(state, id) {
    var c = state.customIngredients && state.customIngredients[id];
    if (c) return c.carbs != null ? [c.carbs, c.fiber || 0] : null;
    return NUTRITION[id] || null;
  }

  // Recipe ingredients as cooked for this household's settings. With a carb target,
  // starchy sides (rice, pasta, tortillas, bread, potatoes) shrink, down to half, to fit it.
  function ingredientsFor(state, r) {
    var target = state.settings.carbTarget || 0;
    if (!target) return r.ing;
    if (carbCache.target !== target) carbCache = { target: target, map: {} };
    var hit = carbCache.map[r.id];
    if (hit) return hit.ing;
    var starch = 0, rest = 0;
    r.ing.forEach(function (p) {
      var n = carbsPerUnit(state, p[0]);
      if (!n) return;
      if (STARCHES.indexOf(p[0]) >= 0) starch += n[0] * p[1]; else rest += n[0] * p[1];
    });
    var serves = r.serves || 4;
    var factor = 1;
    if (starch > 0 && (starch + rest) / serves > target) {
      factor = Math.max(0.5, Math.min(1, (target * serves - rest) / starch));
    }
    var out = factor === 1 ? r.ing : r.ing.map(function (p) {
      return STARCHES.indexOf(p[0]) >= 0 ? [p[0], Math.round(p[1] * factor * 100) / 100] : p;
    });
    carbCache.map[r.id] = { ing: out, factor: factor };
    return out;
  }

  // Per-serving carbs, fiber and added sugar in grams for this household's version of the recipe.
  function nutrition(state, r) {
    var list = ingredientsFor(state, r);
    var carbs = 0, fiber = 0, sugar = 0, known = true;
    list.forEach(function (p) {
      var n = carbsPerUnit(state, p[0]);
      if (!n) { known = false; return; }
      carbs += n[0] * p[1];
      fiber += n[1] * p[1];
      if (ADDED_SUGAR.indexOf(p[0]) >= 0) sugar += n[0] * p[1];
    });
    var serves = r.serves || 4;
    var hit = carbCache.map[r.id];
    var smaller = hit && hit.factor < 1 ? r.ing.filter(function (p) { return STARCHES.indexOf(p[0]) >= 0; }).map(function (p) { return p[0]; }) : [];
    return {
      carbs: Math.round(carbs / serves), fiber: Math.round(fiber / serves), sugar: Math.round(sugar / serves),
      known: known, smaller: smaller
    };
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
    if (s.carbTarget) {
      var n = nutrition(state, r);
      if (n.fiber >= 7) score += 0.4;
      score += Math.max(0, (s.carbTarget - n.carbs) / s.carbTarget) * 0.5;
      if (n.sugar > 6) score -= 0.4;
      if (n.smaller.length) score -= 0.15;
    }
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
    allRecipes: allRecipes, recipe: recipe, ing: ing, price: price,
    allowed: allowed, isVegetarian: isVegetarian, flagsOf: flagsOf,
    ingredientsFor: ingredientsFor, nutrition: nutrition,
    pantryQty: pantryQty, scaleFor: scaleFor,
    costOf: costOf, servingCost: servingCost, choose: choose,
    planRecipes: planRecipes, planCost: planCost, swapOptions: swapOptions,
    groceryList: groceryList, rollPantry: rollPantry, thawItems: thawItems,
    iso: iso, parse: parse, addDays: addDays, daysBetween: daysBetween
  };
})();

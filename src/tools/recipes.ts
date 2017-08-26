const baseItems = ['water', 'crude-oil', 'iron-ore', 'copper-ore', 'uranium-ore', 'stone', 'raw-wood', 'coal'];
const forFree = ['water'];
const beltSpeedToItemsPerSecond = 426.56;

let recipes: { [s: string]: Recipe; };
let expensiveRecipes: { [s: string]: Recipe; };
let reverseRecipes: { [s: string]: Recipe[]; };
let craftingMachines: { [s: string]: { [s: string]: number; } };
let belts: { [s: string]: number; };

class Recipe {
  name: string;
  category: string;
  energy_required: number;
  ingredients: { [s: string]: ItemStack; };
  results: { [s: string]: ItemStack; };
}

class ItemStack {
  amount: number;
  name: string;
  type: string;
}

class RecipeTree {
  recipe: string;
  cause: string;
  cost: number;
  amount: number;
  crafts: number;
  requirements: { [s: string]: RecipeTree; };

  toChartTree() {
    if(this.recipe == undefined) {
      return null;
    }

    const craftSpeeds: { [s: string]: number; } = {};

    Object.entries(craftingMachines[recipes[this.recipe].category]).forEach((entry) => {
      craftSpeeds[entry[0]] = Number((((1 / entry[1]) * recipes[this.recipe].energy_required) * this.crafts).toFixed(2))
    });

    const moveSpeeds: { [s: string]: number; } = {};

    Object.entries(belts).forEach((entry) => {
      moveSpeeds[entry[0]] = Number((this.amount / entry[1]).toFixed(2));
    });

    const result = {
      name: this.recipe,
      cause: this.cause,
      amount: this.amount,
      item: recipes[this.recipe].results[this.cause].type == "item",
      craftSpeeds: craftSpeeds,
      moveSpeeds: moveSpeeds,
      children: []
    };

    Object.values(this.requirements).forEach((tree) => {
      const child = tree.toChartTree();
      if(child !== null){
        result.children.push(child)
      }
    });

    return result;
  }

  width(level, data) {
    if(this.recipe === undefined){
      return;
    }

    if(data[level] === undefined){
      data[level] = 0;
    }

    data[level]++;

    if(this.requirements !== undefined) {
      Object.values(this.requirements).forEach((child) => {
        child.width(level + 1, data);
      });
    }

    return data;
  }
}

export function resolveRecipeTree(name, amount): RecipeTree {
  if (baseItems.includes(name)) {
    return null;
  }

  let result = new RecipeTree();
  result.cost = Infinity;

  Object.values(reverseRecipes[name]).forEach((potentialRecipe) => {
    const tempResult = new RecipeTree();
    tempResult.recipe = potentialRecipe.name;
    tempResult.cost = 0;
    tempResult.amount = amount;
    tempResult.cause = name;
    tempResult.crafts = Math.ceil(amount / potentialRecipe.results[name].amount);
    tempResult.requirements = {};

    Object.values(potentialRecipe.ingredients).forEach((ingredient) => {
      const needed = Math.ceil(tempResult.crafts * ingredient.amount);
      const res = resolveRecipeTree(ingredient.name, needed);

      if (res !== null) {
        tempResult.requirements[ingredient.name] = res;
        if (!forFree.includes(ingredient.name)) {
          tempResult.cost += res.cost;
        }
      } else {
        const baseResult = new RecipeTree();

        if (!forFree.includes(ingredient.name)) {
          baseResult.cost = needed;
        } else {
          baseResult.cost = 0;
        }

        baseResult.amount = needed;
        baseResult.cause = ingredient.name;
        baseResult.crafts = needed;

        tempResult.requirements[ingredient.name] = baseResult;
        tempResult.cost += baseResult.cost;
      }
    });

    if (tempResult.cost < result.cost) {
      result = tempResult;
    }
  });

  return result;
}

export function loadData(data) {
  data = deleteUselessRecipes(data);

  recipes = {};
  expensiveRecipes = {};
  reverseRecipes = {};
  craftingMachines = {};
  belts = {};

  Object.values(data.recipes).forEach((recipe) => {
    recipes[recipe.name] = parseRecipe(recipe);
  });

  Object.values(data.expensiveRecipes).forEach((recipe) => {
    expensiveRecipes[recipe.name] = parseRecipe(recipe);
  });

  Object.values(recipes).forEach((recipe) => {
    Object.values(recipe.results).forEach((result) => {
      if (!reverseRecipes[result.name]) {
        reverseRecipes[result.name] = [];
      }

      reverseRecipes[result.name].push(recipe)
    });
  });

  Object.values(data.entities).forEach((entity) => {
    if(entity.type == "transport-belt"){
      belts[entity.name] = entity.speed * beltSpeedToItemsPerSecond;
    }

    if(entity.crafting_speed !== undefined){
      Object.values(entity.crafting_categories).forEach((category) => {
        if (!craftingMachines[category]) {
          craftingMachines[category] = {};
        }

        craftingMachines[category][entity.name] = entity.crafting_speed;
      })
    }
  });
}

function parseRecipe(recipe): Recipe {
  const newRecipe = new Recipe();
  newRecipe.name = recipe.name;
  newRecipe.category = recipe.category || "crafting";
  newRecipe.energy_required = recipe.energy_required || 0.5;
  newRecipe.ingredients = {};
  newRecipe.results = {};

  let ingredients = recipe.ingredients;

  if(recipe.normal !== undefined){
    ingredients = recipe.normal.ingredients;
  }

  Object.values(ingredients).forEach(function (ingredient) {
    const item = new ItemStack();
    item.name = ingredient.name || ingredient[1];
    item.amount = ingredient.amount || ingredient[2];
    item.type = ingredient.type || ingredient[3] || "item";
    newRecipe.ingredients[item.name] = item;
  });

  if (recipe.results){
    Object.values(recipe.results).forEach(function (result) {
      const item = new ItemStack();
      item.name = result.name || result[1];
      item.amount = result.amount || result[2];
      item.type = result.type || result[3] || "item";
      newRecipe.results[item.name] = item;
    });
  } else {
    const item = new ItemStack();
    item.name = recipe.result;
    item.amount = recipe.result_count || 1;
    item.type = "item";
    newRecipe.results[item.name] = item;
  }

  return newRecipe
}

function deleteUselessRecipes(data) {
  const toDelete = [
    "coal-liquefaction",
    "empty-crude-oil-barrel",
    "empty-heavy-oil-barrel",
    "empty-light-oil-barrel",
    "empty-lubricant-barrel",
    "empty-petroleum-gas-barrel",
    "empty-sulfuric-acid-barrel",
    "empty-water-barrel",
    "fill-crude-oil-barrel",
    "fill-heavy-oil-barrel",
    "fill-light-oil-barrel",
    "fill-lubricant-barrel",
    "fill-petroleum-gas-barrel",
    "fill-sulfuric-acid-barrel",
    "fill-water-barrel"
  ];

  toDelete.forEach(function (value) {
    delete data.recipes[value];
    delete data.expensiveRecipes[value];
  });

  return data;
}

var random = require('../utility/RandomGenerator');
var PriorityQueue = require('js-priority-queue');

module.exports = {
  /**
   * Random select k recipes.
   * @param recipes recipes from db
   * @param k number of recipes selected at most
   * @returns {Promise<*>} random selected recipes
   */
  randomPick: function(recipes, k) {
    if (recipes.length <= k) {
      return recipes;
    }
    var selectedRecipes = new Array(k);
    var randomIndices = random.random(0, recipes.length-1, k);
    for (var i = 0; i < k; i++) {
      selectedRecipes[i] = recipes[randomIndices[i]];
    }
    return selectedRecipes;
  },

  /**
   * Select the top k rated recipes
   * @param recipes all recipes
   * @param k number of recipes selected
   * @returns top k rated recipes
   */
  topRated: function (recipes, k) {
    if (recipes.length <= k) {
      return recipes;
    }
    var priorityQueue = new PriorityQueue({comparator: (r1, r2) => r1['rating'] - r2['rating']});
    for (var i = 0; i < recipes.length; i++) {
      priorityQueue.queue(recipes[i]);
      if (priorityQueue.length > k) {
        priorityQueue.dequeue();
      }
    }
    var topRecipes = new Array(k);
    for (var i = k-1; i >= 0; i--) {
      topRecipes[i] = priorityQueue.dequeue();
    }
    return topRecipes;
  },

  searchByIngredient: async function (ingredientName) {
    var ingredientList = await Ingredient.find({
      ingredientName: {
        contains: ingredientName,
      },
    });
    ingredientList = ingredientList.map(x => x.id);
    return await Recipe.findByIngredientId(ingredientList);
  }
};

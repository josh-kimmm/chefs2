var random = require('../utility/RandomGenerator');

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
};

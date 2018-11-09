module.exports = {
  /**
   * Get all associated info for that recipe
   * @param recipeId id
   * @returns {Promise<*>} full info for that recipe
   */
  findRecipeById: async function (recipeId) {
    return await Recipe.find({id: recipeId}).populateAll();
  },

  /**
   * Find all recipes with full info.
   * @returns {Promise<*>} all recipes
   */
  findAllRecipe: async function() {
    return await Recipe.find().populateAll();
  },
};

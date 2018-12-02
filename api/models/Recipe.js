/**
 * Recipe.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    recipeName: {
      type: 'string',
      required: true,
    },
    instructions: {
      type: 'string',
      required: true,
    },
    image: {
      type: 'string',
    },
    /**
     * foreign key: Ingredient
     * many to many
     */
    ingredients: {
      collection: 'Ingredient',
      via: 'recipe',
    },

    dietType: {
      type: 'string',
    },

    prepTime: {
      type: 'string',
    },

    cookingMethod: {
      type: 'string',
    },

    rating: {
      type: 'number',
    },

    /**
     * foreign key: UserProfile
     * many to many
     */
    userProfile: {
      collection: 'UserProfile',
      via: 'cookbook',
    },

    /**
     * foreign key: Review
     * one to many
     */
    review: {
      collection: 'Review',
      via: 'recipe',
    },
  },

  /**
   * Get all associated info for that recipe
   * @param recipeId id
   * @returns {Promise<*>} full info for that recipe
   */
  findRecipeById: async function (recipeId) {
    return await Recipe.findOne({id: recipeId}).populateAll();
  },

  /**
   * Find all recipes with full info.
   * @returns {Promise<*>} all recipes
   */
  findAllRecipes: async function() {
    return await Recipe.find().populateAll();
  },
};


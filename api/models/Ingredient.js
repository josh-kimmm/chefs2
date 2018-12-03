/**
 * Ingredient.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    ingredientName: {
      type: 'string',
      required: true,
      unique: true,
    },

    /**
     * foreign key: UserProfile
     * many to many
     */
    userProfileIngredientPreference: {
      collection: 'UserProfile',
      via: 'ingredientPreference',
    },

    /**
     * foreign key: Recipe
     * many to many
     */
    recipe: {
      collection: 'Recipe',
      via: 'ingredients',
    },
  },

  /**
     * Get all ingredients
     * @returns {Promise<*>} full info for all ingredients
     */
    findAll: async function () {
        return await Ingredient.find();
    },

};


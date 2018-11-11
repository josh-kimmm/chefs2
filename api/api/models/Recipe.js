/**
 * Recipe.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
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
};


/**
 * UserProfile.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    /**
     * foreign key: User
     * one to one association
     */
    user: {
      collection: 'User',
      via: 'userProfile',
    },

    /**
     * foreign key: Recipe
     * many to many
     */
    cookbook: {
      collection: 'Recipe',
      via: 'userProfile',
    },

    followingList: {
      collection: 'User',
      via: 'userProfileFollowingList',
    },

    followerList: {
      collection: 'User',
      via: 'userProfileFollowerList',
    },

    /**
     * foreign key: Ingredient
     * many to many
     */
    dietaryRestriction: {
      collection: 'Ingredient',
      via: 'userProfileDietaryRestriction',
    },

    /**
     * foreign key: Ingredient
     * many to many
     */
    ingredientPreference: {
      collection: 'Ingredient',
      via: 'userProfileIngredientPreference',
    },

    emailNotification: {
      type: 'string',
    },

    cookedRecipes: {
      type: 'string',
    },

    /**
     * foreign key: Review
     * one to many
     */
    reviews: {
      collection: 'Review',
      via: 'userProfile',
    },
  },

};


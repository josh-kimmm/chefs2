/**
 * Review.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    /**
     * foreign key: UserProfile
     * many to one
     */
    userProfile: {
      collection: 'UserProfile',
      via: 'reviews',
    },

    rating: {
      type: 'number',
    },

    reviewBody: {
      type: 'string',
    },

    /**
     * foreign key: UserProfile
     * many to one
     */
    recipe: {
      model: 'Recipe',
    }
  },

};


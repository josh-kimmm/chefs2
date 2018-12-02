/**
 * CommunityRecipe.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
    attributes: {
        userProfile: {
            collection: 'UserProfile',
            via: 'communityRecipes',
        },

        recipeId: {
            model: 'Recipe',
        },

        savedBy: {
            model: 'User',
        },
    }
};

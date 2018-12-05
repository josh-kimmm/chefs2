module.exports = {
    checkSavedRecipe: async function(userId, recipe) {
        let currentUser = await User.findOne({
            id: userId,
        }).populateAll();
        let savedRecipe = await UserProfile.findOne({
            id: currentUser.userProfile[0].id,
        }).populate('cookbook', {
            id: recipe.id,
        });
        return savedRecipe.cookbook.length > 0 ? true : false;
    },

    addToCookbook: async function(currentUser, recipe) {
        await UserProfile.addToCollection(currentUser.userProfile[0].id, 'cookbook').members([recipe.id]);

        let followers = await UserProfile.findOne({
            id: currentUser.userProfile[0].id
        });

        await CommunityRecipe.create({
            userProfile: followers.followerList,
            recipeId: recipe.id,
            savedBy: currentUser.id,
        });
    },

    removeFromCookbook: async function(currentUser, recipe) {
        await CommunityRecipe.destroy({
            recipeId: recipe.id,
            savedBy: currentUser.id,
        });

        await UserProfile.removeFromCollection(currentUser.userProfile[0].id, 'cookbook').members([recipe.id]);
    },

    createReview: async function(recipeId, rating, review, userId) {
        await Review.create({
            user: userId,
            rating: rating,
            reviewBody: review,
            recipe: recipeId,
        });

        let recipe = await Recipe.findOne(recipeId);
        
        let allReviews = await Review.find({
            recipe: recipeId,
        });

        let newRating = recipe.rating == 0 ? rating : ((Number(recipe.rating) * (Number(allReviews.length) - 1)) + Number(rating)) / Number(allReviews.length);

        await Recipe.update(recipeId, {
            rating: newRating,
        });
    }
}
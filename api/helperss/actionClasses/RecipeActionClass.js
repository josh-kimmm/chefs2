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
}
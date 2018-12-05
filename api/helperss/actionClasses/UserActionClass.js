module.exports = {
    updateDietaryPreferences: async function(userId, dietaryPreferences) {
        let user = (await User.findOne(userId).populateAll()).userProfile[0];
        await UserProfile.update(user, {
            dietaryPreferences: dietaryPreferences.join(','),
        });
    },

    followUser: async function(currentUser, userToFollow) {
        await UserProfile.addToCollection(currentUser.userProfile[0].id, 'followingList').members([userToFollow.id]);
        await UserProfile.addToCollection(userToFollow.userProfile[0].id, 'followerList').members([currentUser.id]);

        let communityRecipes = await CommunityRecipe.find({
            select: 'id',
            where: {
                savedBy: userToFollow.id,
            },
        });
        await CommunityRecipe.addToCollection(communityRecipes.map((obj) => obj.id), 'userProfile').members([currentUser.id]);

    },

    unfollowUser: async function(currentUser, userToFollow) {
        await UserProfile.removeFromCollection(currentUser.userProfile[0].id, 'followingList').members([userToFollow.id]);
        await UserProfile.removeFromCollection(userToFollow.userProfile[0].id, 'followerList').members([currentUser.id]);
        let communityRecipes = await CommunityRecipe.find({
            select: 'id',
            where: {
                savedBy: userToFollow.id,
            },
        });
        await CommunityRecipe.removeFromCollection(communityRecipes.map((obj) => obj.id), 'userProfile').members([currentUser.id]);

    }
}
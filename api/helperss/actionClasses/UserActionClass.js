module.exports = {
    updateDietaryPreferences: async function(userId, dietaryPreferences) {
        let user = (await User.findOne(userId).populateAll()).userProfile[0];
        await UserProfile.update(user, {
            dietaryPreferences: dietaryPreferences.join(','),
        });
    }
}
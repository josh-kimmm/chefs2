module.exports = {
    validateDietaryPreferencesForm: async function(inputs) {
        let dietaryPreferences = [];
        if (inputs.vegan) dietaryPreferences.push('vegan');
        if (inputs.vegetarian) dietaryPreferences.push('vegetarian');

        return dietaryPreferences;
    }
};
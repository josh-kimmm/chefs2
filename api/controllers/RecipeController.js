
module.exports= {
    createIngredient: async function(req, res) {
        let ingredientName = req.param('ingredientName');
        let ingredient = await Ingredient.create({
            ingredientName: ingredientName,
        }).fetch();

        return res.view('pages/homepage', {
            result: JSON.stringify({
                successMessage: 'Successfully created an ingredient',
                ingredient: ingredient,
            }),
        });
    },

    createRecipe: async function(req, res) {
        let recipeName = req.param('recipeName');
        let instructions = req.param('instructions')

        let recipe = await Recipe.create({
            recipeName: recipeName,
            instructions: instructions,
        }).fetch();

        return res.view('pages/homepage', {
            result: JSON.stringify({
                successMessage: 'Successfully created a recipe',
                recipe: recipe,
            }),
        });
    }
}
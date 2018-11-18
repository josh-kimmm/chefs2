
module.exports= {
    createIngredient: async function(req, res) {
        let ingredientName = req.param('ingredientName');

        if (!ingredientName) {
            return res.view('pages/homepage', {
                result: JSON.stringify({
                    errorMessages: 'You must enter an ingredient name.',
                    successMessage: '',
                    ingredient: null,
                }),
            });
        } else {
            let existingIngredient = await Ingredient.findOne({
                ingredientName: ingredientName,
            });
            if (existingIngredient) {
                return res.view('pages/homepage', {
                    result: JSON.stringify({
                        errorMessages: 'An ingredient already exists with this name.',
                        successMessage: '',
                        ingredient: existingIngredient,
                    }),
                });
            }
        }

        let ingredient = await Ingredient.create({
            ingredientName: ingredientName,
        }).fetch();

        return res.view('pages/homepage', {
            result: JSON.stringify({
                errorMessages: '',
                successMessage: 'Successfully created an ingredient',
                ingredient: ingredient,
            }),
        });
    },

    createRecipe: function(req, res) {
        console.log(req.allParams())
    }
}
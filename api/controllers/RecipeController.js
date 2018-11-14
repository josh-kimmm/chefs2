
module.exports= {
    createIngredient: async function(req, res) {
        let ingredientName = req.param('ingredientName');

        if (!ingredientName) {
            return res.view('pages/homepage', {
                result: {
                    errorMessages: 'You must enter an ingredient name.',
                    successMessage: '',
                    ingredient: null,
                },
            });
        } else {
            let existingIngredient = await Ingredient.findOne({
                ingredientName: ingredientName,
            });
            if (existingIngredient) {
                return res.view('pages/homepage', {
                    result: {
                        errorMessages: 'An ingredient already exists with this name.',
                        successMessage: '',
                        ingredient: null,
                    },
                });
            }
        }

        let ingredient = await Ingredient.create({
            ingredientName: ingredientName,
        });

        return res.view('pages/homepage', {
            result: {
                errorMessages: '',
                successMessage: 'Successfully created an ingredient',
                ingredient: ingredient,
            },
        });
    },

    createRecipe: function(req, res) {
        console.log(req.allParams())
    }
}
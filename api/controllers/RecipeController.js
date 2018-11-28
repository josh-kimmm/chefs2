
module.exports= {
    createIngredient: async function(req, res) {
        let ingredientName = req.param('ingredientName');
        let existingIngredient = await Ingredient.findOne({
            ingredientName: ingredientName,
        });
        if (existingIngredient == null) {
            existingIngredient = await Ingredient.create({
                ingredientName: ingredientName,
            }).fetch();
        }

        // UNCOMMENT IF WANT RESPONSE FOR WEBSERVER
        // return res.view('pages/homepage', {
        //     result: JSON.stringify({
        //         successMessage: 'Successfully created an ingredient',
        //         ingredient: existingIngredient,
        //     }),
        // });
        return res.json(existingIngredient)
    },

    createRecipe: async function(req, res) {
        let recipeName = req.param('recipeName');
        let instructions = req.param('instructions');
        let ingredients = req.param('ingredients');
        let dietType = req.param('dietType');
        let prepTime = req.param('prepTime');
        let cookingMethod = req.param('cookingMethod');
        let rating = req.param('rating');
        let image = req.param('image');

        let recipe = await Recipe.create({
            recipeName: recipeName,
            instructions: instructions,
            dietType: dietType,
            prepTime: prepTime,
            cookingMethod: cookingMethod,
            rating: rating,
            image: image,
        }).fetch();

        await Recipe.addToCollection(recipe.id, 'ingredients').members(ingredients);

        // UNCOMMENT IF WANT RESPONSE FOR WEBSERVER
        // return res.view('pages/homepage', {
        //     result: JSON.stringify({
        //         successMessage: 'Successfully created a recipe',
        //         recipe: recipe,
        //     }),
        // });
        return res.json(recipe)
    },

    viewRecipe: async function(req, res) {
        let recipeId = req.param('recipeId', null);

        if (!recipeId) {
            return res.notFound();
        }

        let recipe = await Recipe.findOne({
            id: recipeId,
        }).populateAll();
        
        if (!recipe) {
            return res.notFound();
        }

        recipe.saved = false;
        if (req.session.userId) {
            // check if user has this recipe saved
            let currentUser = await User.findOne({
                id: req.session.userId,
            }).populateAll();
            let savedRecipe = await UserProfile.findOne({
                id: currentUser.userProfile[0].id,
            }).populate('cookbook', {
                id: recipe.id,
            });
            recipe.saved = savedRecipe.cookbook.length > 0 ? true : false;
        }
        recipe.pageName = 'viewRecipe';

        return res.view('pages/view-recipe', recipe);
    },

    saveRecipe: async function(req, res) {
        let recipeId = req.param('recipeId', null);
        
        if (!recipeId || !req.session.userId) {
            return res.notFound();
        }

        let currentUser = await User.findOne({
            id: req.session.userId,
        }).populateAll();

        if (!currentUser) {
            return res.notFound();
        }

        let recipe = await Recipe.findOne({
            id: recipeId,
        }).populateAll();

        if (!recipe) {
            return res.notFound();
        }

        await UserProfile.addToCollection(currentUser.userProfile[0].id, 'cookbook').members([recipe.id]);
        recipe.pageName = 'viewRecipe';

        return res.redirect('/recipe/' + recipe.id);
    },

    unsaveRecipe: async function(req, res) {
        let recipeId = req.param('recipeId', null);
        
        if (!recipeId || !req.session.userId) {
            return res.notFound();
        }

        let currentUser = await User.findOne({
            id: req.session.userId,
        }).populateAll();

        if (!currentUser) {
            return res.notFound();
        }

        let recipe = await Recipe.findOne({
            id: recipeId,
        }).populateAll();

        if (!recipe) {
            return res.notFound();
        }

        await UserProfile.removeFromCollection(currentUser.userProfile[0].id, 'cookbook').members([recipe.id]);
        recipe.pageName = 'viewRecipe';

        return res.redirect('/recipe/' + recipe.id);
    }
}
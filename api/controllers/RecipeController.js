const RecipeActionClass = require('../helperss/actionClasses/RecipeActionClass');

module.exports= {

    searchPriority: async function (req, res) {
        var ingredientId = req.param('ingredients');
        var keyWords = req.param('keyWords');
        if (keyWords != null) {
            keyWords = keyWords.split(/[^a-zA-Z0-9]/).filter(Boolean);
        }
        var dietType = req.param('dietType');
        if (dietType != null) {
            dietType = dietType.toLowerCase();
        }
        var prepTime = req.param('prepTime');
        if (prepTime != null) {
            prepTime = prepTime.toLowerCase();
        }
        var cookingMethod = req.param('cookingMethod');
        if (cookingMethod != null) {
            cookingMethod = cookingMethod.toLowerCase();
        }

        console.log("diet: " + dietType + "|");
        console.log("prep: " + prepTime + "|");
        console.log("cook: " + cookingMethod + "|");

        var ingredientIdSet = new Set(ingredientId);

        var PriorityQueue = require('js-priority-queue');
        var priorityQueue = new PriorityQueue({comparator: (r1, r2) => r2[1] - r1[1]});

        var recipes = await Recipe.find().populateAll();
        var regExps = []
        for (var i = 0; i < keyWords.length; i++) {
            regExps.push(new RegExp(keyWords[i].toLowerCase(), "gi"));
        }
        for (var i = 0; i < recipes.length; i++) {
            // filter out those recipes with a different dietType/prepTime/cookingMethod
            if (recipes[i]["dietType"] !== "" && dietType != null && recipes[i]["dietType"].toLowerCase() !== dietType) {
                continue;
            }
            if (recipes[i]["prepTime"] !== "" && prepTime != null && recipes[i]["prepTime"].toLowerCase() !== prepTime) {
                continue;
            }
            if (recipes[i]["cookingMethod"] !== "" && cookingMethod != null && recipes[i]["cookingMethod"].toLowerCase() !== cookingMethod) {
                continue;
            }

            var rate = 0;
            // count frequencies of each key word appearing in recipe name
            for (var j = 0; j < regExps.length; j++) {
                rate += (recipes[i]["recipeName"].toLowerCase().match(regExps[j]) || []).length;
            }
            // count how many ingredients matches to the searching query
            for (var j = 0; j < recipes[i].ingredients.length; j++) {
                if (ingredientIdSet.has(Number(recipes[i].ingredients[j].id))) {
                    rate++;
                }
            }
            if (rate > 0) {
                priorityQueue.queue([recipes[i], rate]);
            }
        }

        var sortedRecipes = [];
        while (priorityQueue.length > 0) {
            var t = priorityQueue.dequeue();
            console.log(t[0].recipeName + "," + t[1]);
            sortedRecipes.push(t[0]);
        }
        return res.json(sortedRecipes);
    },

    searchByKeyWords: async function (req, res) {
        var keyWords = ['fish', 'apple','beef'];
        var keyWordConditions = [];
        for (var i = 0; i < keyWords.length; i++) {
            keyWordConditions.push({recipeName: {contains: keyWords[i]}});
            keyWordConditions.push({instructions: {contains: keyWords[i]}});
        }
        var recipes = await Recipe.find({
            or: keyWordConditions,
        }).populateAll();
        return res.json(recipes);
    },

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

        if (!recipeId || isNaN(recipeId)) {
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
            recipe.saved = await RecipeActionClass.checkSavedRecipe(req.session.userId, recipe)
        }
        recipe.pageName = 'viewRecipe';

        recipe.reviews = await Review.find({
            recipe: recipeId,
        }).populateAll();

        return res.view('pages/view-recipe', recipe);
    },

    saveRecipe: async function(req, res) {
        let recipeId = req.param('recipeId', null);

        if (!recipeId) {
            return res.notFound();
        }

        if (!req.session.userId) {
            return res.redirect('/login');
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

        await RecipeActionClass.addToCookbook(currentUser, recipe);

        recipe.pageName = 'viewRecipe';

        return res.redirect('/recipe/' + recipe.id);
    },

    unsaveRecipe: async function(req, res) {
        let recipeId = req.param('recipeId', null);

        if (!recipeId) {
            return res.notFound();
        }

        if (!req.session.userId) {
            return res.redirect('/login');
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

        await RecipeActionClass.removeFromCookbook(currentUser, recipe);

        recipe.pageName = 'viewRecipe';

        return res.redirect('/recipe/' + recipe.id);
    },

    createReview: async function(req, res) {
        let recipeId = req.param('recipeId');
        let rating = req.param('rating');
        let review = req.param('review');

        if (!req.session.userId) {
            return res.redirect('/');
        }

        if (!recipeId) {
            return res.notFound();
        }

        if (typeof rating == 'undefined' || rating > 5 || rating < 1 || review == '') {
            return res.notFound();
        }

        await RecipeActionClass.createReview(recipeId, rating, review, req.session.userId);

        return res.redirect('/recipe/' + recipeId);

    },
}

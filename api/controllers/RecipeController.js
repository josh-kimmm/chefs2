
module.exports= {

    searchPriority: async function (req, res) {
        var ingredientId = req.param('ingredients');
        var keyWords = req.param('keyWords').split(/[^a-zA-Z0-9]/).filter(Boolean);

        var ingredientIdSet = new Set(ingredientId);
        var PriorityQueue = require('js-priority-queue');
        var priorityQueue = new PriorityQueue({comparator: (r1, r2) => r2[1] - r1[1]});

        console.log(ingredientIdSet);

        var recipes = await Recipe.find().populateAll();
        var regExps = []
        for (var i = 0; i < keyWords.length; i++) {
            regExps.push(new RegExp(keyWords[i].toLowerCase(), "gi"));
        }
        for (var i = 0; i < recipes.length; i++) {
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

        recipe.reviews = await Review.find({
            recipe: recipeId,
        }).populateAll();

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

        let followers = await UserProfile.findOne({
            id: currentUser.userProfile[0].id
        });

        await CommunityRecipe.create({
            userProfile: followers.followerList,
            recipeId: recipe.id,
            savedBy: currentUser.id,
        });

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

        await CommunityRecipe.destroy({
            recipeId: recipe.id,
            savedBy: currentUser.id,
        });

        await UserProfile.removeFromCollection(currentUser.userProfile[0].id, 'cookbook').members([recipe.id]);
        recipe.pageName = 'viewRecipe';

        return res.redirect('/recipe/' + recipe.id);
    },

    createReview: async function(req, res) {
        let recipeId = req.param('recipeId');
        let rating = req.param('rating');
        let review = req.param('review');

        if (!req.session.userId) {
            return res.notFound();
        }

        if (!recipeId) {
            return res.notFound();
        }

        if (typeof rating == 'undefined' || rating > 5 || rating < 1 || review == '') {
            return res.notFound();
        }

        await Review.create({
            user: req.session.userId,
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

        return res.redirect('/recipe/' + recipeId);

    },
}

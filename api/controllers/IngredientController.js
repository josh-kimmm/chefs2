module.exports = {
    findAllIngredients: async function (req, res) {
        var ingredients = await Ingredient.findAll();
        return res.json(ingredients);
    }
};
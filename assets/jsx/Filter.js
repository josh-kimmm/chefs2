class Filter extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            ingredientNameInput: null
        }

        this.handleIngredientInput = this.handleIngredientInput.bind(this);
    }

    componentDidMount() {

    }

    handleIngredientInput(e) {

        console.log(e);
        this.props.ingredientNameInput = e.target.value;

    }

    render() {

        var testIngredients = ["apple", "applet", "app"];
        var ingredientNameInput = this.state.ingredientNameInput;

        

        return (
            <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="filter" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Filters
                </button>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="filter">
                    <form class="px-4 py-3 row">
                        <div class="form-group col-sm-6">
                            <label class="filter-label" for="ingredientsInput">Add Ingredients</label>
                            <input type="ingredient" class="form-control" value={ingredientNameInput} onChange={this.handleIngredientInput} id="ingredientsInput" placeholder="Type to search and add ingredients" />

                            <label class="filter-label" for="cookingMethods">Add Cooking Methods</label>
                            <button class="btn btn-secondary dropdown-item dropdown-toggle" type="button" id="cooking-method" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Choose Cooking Method
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="diet">
                                <li><input type="checkbox"/>Oven Bake</li>
                            </ul>
                        </div>
                        <div class="col-sm-6">

                            <label class="filter-label" for="diet">Add Dietary Restrictions</label>
                            <button class="btn btn-secondary dropdown-item dropdown-toggle" type="button" id="diet" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Choose Dietary Restriction
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="diet">
                                <li><input type="checkbox"/>Vegetarian</li>
                                <li><input type="checkbox"/>Vegan</li>
                            </ul>


                            <label class="filter-label">Add Time Limit</label>
                            <div>
                                <select name="hrs" class="custom-select" id="hours">
                                    <option selected>0 hr 0 min</option>
                                    <option>0 hr 10 min</option>
                                    <option>0 hr 30 min</option>
                                    <option>1 hr 00 min</option>
                                    <option>1 hr 30 min</option>
                                    <option>2 hr 00 min</option>
                                    <option>2 hr 30 min</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </div>
    	    </div>

        );
    }

}

export default Filter;

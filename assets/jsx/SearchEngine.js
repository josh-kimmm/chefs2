import Filter from './Filter.js';

class SearchEngine extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            recipeNameInput: "",
            ingredientSearchList: [],
            totalIngredientList: [],
            searchResults: false


        };

        this.updateSearchInput = this.updateSearchInput.bind(this);
        this.handleSearchInput = this.handleSearchInput.bind(this);
        this.startSearchQuery = this.startSearchQuery.bind(this);
        this.addNewIngredientFilter = this.addNewIngredientFilter.bind(this);
    }

    componentDidMount() {
        var url = "http://localhost:1337/allingredients"
        var opts = {
                  method: "GET"
        };

        fetch(url, opts).then(function (res) {
            console.log(res);
            window.tester = res;
            return res.json();
        })
        .then(function (res) {
            window.tester = res;
            res = _(res).map(function(ingredient) {
                ingredient.ingredientName = ingredient.ingredientName.toLowerCase();
                return ingredient;
            }).value();

            this.setState({totalIngredientList: res});
        }.bind(this));
    }

    updateSearchInput(e) {
        this.setState({recipeNameInput: e.target.value});
    }

    handleSearchInput(e) {
        if(e.key === "Enter"){
            console.log("Enter is pressed");
            this.startSearchQuery();
        }
    }

    addNewIngredientFilter(ingredient) {

        var ingredientArr = this.state.ingredientSearchList;
        ingredientArr.push(ingredient);

        this.setState({ingredientSearchList: ingredientArr});
    }

    startSearchQuery() {

        var ingredientIdList = _(this.state.ingredientSearchList).map(function(ingredient) {
            return ingredient.id;
        }).value(); 
        var recipeNameInput = this.state.recipeNameInput;

        var url = "http://localhost:1337/search"
        var opts = {
            method: "POST",
            body: JSON.stringify({
                ingredients: ingredientIdList,
                keyWords: recipeNameInput
            })
        };

        fetch(url, opts).then(function (res) {

            return res.json();
        })
        .then(function (res) {
            window.blah = res;
            console.log(res);
        }.bind(this));
    }

    render() {

        var totalIngredientList = this.state.totalIngredientList;
        var addNewIngredientFilter = this.state.addNewIngredientFilter;
        var recipeNameInput = this.state.recipeNameInput;
        

        return (
            <div>
                <div class="input-group">
                    <input type="text" class="form-control" id="searchinput" placeholder="Search Recipes" 
                           value={recipeNameInput} onChange={this.updateSearchInput} onKeyDown={this.handleSearchInput}></input>
                    <div class="input-group-btn">
                        <button class="btn" type="button" onClick={this.startSearchQuery} id="searchit">
                            <i class="fa fa-search"></i>
                        </button>
                    </div>
                </div>

                <Filter addIngredientHandler={this.addNewIngredientFilter} ingredientList={totalIngredientList}/>
            </div>

        );
    }
}

export default SearchEngine;

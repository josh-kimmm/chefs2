import SearchEngine from './SearchEngine.js';



const Router = ReactRouterDOM.Router;

class Home extends React.Component {
  
	constructor(props) {
		super(props);

		this.state = {
			showSearchResults: false,
			searchResultList: [],
			searchInput: ""
		}

		this.changeSearchResults = this.changeSearchResults.bind(this);
	}

	changeSearchResults(showResults, recipeList, input) {
		this.setState({
			showSearchResults: showResults,
			searchResultList: recipeList,
			searchInput: input
		});
	}

 	render() {

 		var searchresults = this.state.showSearchResults ? (<SearchResults list={this.state.searchResultList} searchInput={this.state.searchInput} />) : null;

	    return (
	    	<div id="wrap">
		        <SearchEngine changeSearchResults={this.changeSearchResults} showSearchResults={this.state.showSearchResults} />

		        {searchresults}
	    	</div>
	    );
  	}

}

function SearchResults(props) {
	
	var list = props.list;
	list = _(list).map(function(recipe) {
		return <SearchResultItem key={recipe.id} recipe={recipe} />
	}).value();


	return(
		<div>
			<h3 id="show-results-label">Showing search results for '<span id="keyword">{props.searchInput}</span>'</h3>
	       	{list}
        </div>
	);
}

function SearchResultItem(props) {

	var recipe = props.recipe;

	var cookingmethod = recipe.cookingMethod === "" ? "None" : recipe.cookingMethod;
	var diettype = recipe.dietType === "" ? "N/A" : recipe.dietType;
	var preptime = recipe.prepTime === "" ? "N/A" : recipe.prepTime;

	var recipeURL = "/recipe/" + recipe.id;

	return(
		<section id="search-results">
            <div class="result">
                <div class="row">
                    <div class="col-md-4">            
                        <a href={recipeURL}>
                        	<img class="recipe-img" src={recipe.image} />
                    	</a>
                    </div>
                    <div class="col-md-8">
                    	<a href={recipeURL}>
                        	<h2 class="recipe-title">{recipe.recipeName}</h2>
                        </a>
                        <p class="recipe-description">
                        	 <p>Cooking Methods: {cookingmethod}</p>
                        	 <p>Dietary Restrictions: {diettype}</p>
                        	 <p>Cooking Time: {preptime} </p>
                        </p>
                    </div>
                </div>
        	</div>
	    </section>
	);
}

export default Home;

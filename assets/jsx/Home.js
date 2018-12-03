import SearchEngine from './SearchEngine.js';



const Router = ReactRouterDOM.Router;

class Home extends React.Component {
  
	constructor(props) {
		super(props);

		this.state = {
			showSearchResults: false
		}

		this.changeSearchResults = this.changeSearchResults.bind(this);
	}

	changeSearchResults(val) {
		this.setState({showSearchResults: val});
	}

 	render() {

 		var searchresults = this.state.showSearchResults ? (<SearchResults />) : null;

	    return (
	    	<div id="wrap">
		        <SearchEngine changeSearchResults={this.changeSearchResults} showSearchResults={this.state.showSearchResults}/>

		        {searchresults}
	    	</div>
	    );
  	}

}

function SearchResults() {
	return(
		<div>
		<h3 id="show-results-label">Showing search results for '<span id="keyword">boop</span>'</h3>
	        <section id="search-results">
	            <div class="result">
	                <div class="row">
	                    <div class="col-sm-6">            
	                        <img class="recipe-img" src="https://raw.githubusercontent.com/josh-kimmm/chefs2/search-results/assets/images/search-result-test.jpg" />
	                    </div>
	                    <div class="col-sm-6">
	                        <h2 class="recipe-title">Recipe Title</h2>
	                        <p class="recipe-description"> this is a description. this is a description. this is a description. this is a description.
	                                this is a description. this is a description. this is a description. this is a description. this is a description.
	                                this is a description. this is a description. this is a description. this is a description. this is a description. 
	                                this is a description. this is a description. this is a description. this is a description. this is a description. 
	                                this is a description.
	                        </p>
	                    </div>
	                </div>
	            </div>
	        </section>
        </div>
	);
}

export default Home;

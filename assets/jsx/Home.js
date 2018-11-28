import SearchEngine from './SearchEngine.js';
import Filter from './Filter.js';


const Router = ReactRouterDOM.Router;

class Home extends React.Component {

	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		var opts = {
                  method: "POST",
                  body: JSON.stringify({
                    email: "josh_kimmm@yahoo.com",
                    password: "test",
                  })
                };
		fetch('http://localhost:2000/test', opts).then(function(res){
			console.log('wassup');
			return res.json();
		}).then(function(res) {
			console.log('yas');
			return res;
		});
	}
  
  	render() {
    return (
    	<div id="wrap">
	        <img src="/images/chefs-logo-red.png" alt="" class="center" />
	        <SearchEngine />

	        <Filter />  

	        <button onClick={this.handleClick}> TESTTERERSDFDSF </button>

	        <div class="input-group">
	            <input type="text" class="form-control" id="searchinput" placeholder="Search Recipes"></input>
	            <div class="input-group-btn">
	                <button class="btn" type="button" id="searchit">
	                    <i class="fa fa-search"></i>
	                </button>
	            </div>
	        </div>

	        <div class="dropdown">
	            <button class="btn btn-secondary dropdown-toggle" type="button" id="filter" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
	                Filters
	            </button>
	            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="filter">
	                <form class="px-4 py-3">
	                    <div class="form-group col-sm-6">
	                        
	                        <label for="ingredientsInput">Add Ingredients</label>
	                        <input type="ingredient" class="form-control" id="ingredientsInput" placeholder="Type to search and add ingredients" />
	                        
	                        <label for="cookingMethods">Add Cooking Methods</label>
	                        <input type="cookMethods" class="form-control" id="cookingMethods" placeholder="Type to search and add cooking methods" />
	                    </div>
	                    <div class="col-sm-6">
	                        <label for="diet">Add Dietary Restrictions</label>
	                        <button class="btn btn-secondary dropdown-item dropdown-toggle" type="button" id="diet" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
	                            Choose dietary restrictions
	                        </button>
	                        <div class="dropdown-menu" aria-labelledby="diet">
	                            <a class="dropdown-item" href="#">This</a>
	                        </div>
	                        <div>
	                            <label>Add Time Restraint</label>
	                        </div>
	                        <div>
	                            <select name="hrs" class="custom-select" id="hours">
	                                <option selected>
	                                    -
	                                </option>
	                            </select>

	                            <select name="mins" class="custom-select" id="minutes">
	                                <option selected>
	                                    -
	                                </option>
	                            </select>
	                        </div>
	                    </div>
	                </form>
	            </div>
	        </div>  
    	</div>
    );
  }

}
export default Home;
import Filter from './Filter.js';

class SearchEngine extends React.Component {

    constructor(props){
        super(props);

        this.handleSearchInput = this.handleSearchInput.bind(this);
        this.startSearchQuery = this.startSearchQuery.bind(this);
    }

    handleSearchInput(e) {
        if(e.key === "Enter"){
            console.log("Enter is pressed");
            startSearchQuery();
        }
        
    }

    startSearchQuery() {

    }

    render() {
        return (
            <div>
                <div class="input-group">
                    <input type="text" class="form-control" id="searchinput" placeholder="Search Recipes" 
                           onKeyPress={this.handleSearchInput}></input>
                    <div class="input-group-btn">
                        <button class="btn" type="button" onClick={this.startSearchQuery} id="searchit">
                            <i class="fa fa-search"></i>
                        </button>
                    </div>
                </div>

                <Filter />
            </div>

        );
    }

}

export default SearchEngine;

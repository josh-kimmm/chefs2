class SearchEngine extends React.Component {

  render() {
    return (
        <div class="input-group">
            <input type="text" class="search form-control" id="searchinput" placeholder="Search Recipes"></input>
            <div class="input-group-btn">
                <button class="btn btn-secondary"  id="searchit">
                    <i class="fa fa-search"></i>
                </button>
            </div>
        </div>

    );
  }

}

export default SearchEngine;

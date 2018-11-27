class SearchEngine extends React.Component {
  
  render() {
    return (
        <div class="input-group">
            <input type="text" class="form-control" id="searchinput" placeholder="Search Recipes"></input>
            <div class="input-group-btn">
                <button class="btn" type="button" id="searchit">
                    <i class="fa fa-search"></i>
                </button>
            </div>
        </div>

    );
  }

}

export default SearchEngine;
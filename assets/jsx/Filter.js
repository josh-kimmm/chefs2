
class Filter extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            ingredientNameInput: null,
            autoCompleteList: [],
            selectedIngredientIndex: 0
        };

        this.handleIngredientInput = this.handleIngredientInput.bind(this);
        this.handleIngredientSelection = this.handleIngredientSelection.bind(this);
    }

    handleIngredientInput(e) {

        var inputVal = e.target.value === "" ? null : e.target.value;
        var ingredientList = this.props.ingredientList;
        var index = -1;
        var newIndex = 0;
        var autocompletelist = this.state.autoCompleteList;


        if(inputVal !== this.state.ingredientNameInput){
            autocompletelist = _.chain(ingredientList).filter(function(ingredient) {
                return ingredient.ingredientName.includes(inputVal);
            }).sortBy('ingredientName').slice(0,8).map(function(ingredient){
                ingredient.selectorIndex = ++index;
                return ingredient;
            }).value();
        }

        if(_(autocompletelist).isEqual(this.state.autoCompleteList))
            newIndex = this.state.selectedIngredientIndex;            


        this.setState({
            ingredientNameInput: inputVal,
            autoCompleteList: autocompletelist,
            selectedIngredientIndex: newIndex
        });
    } 

    handleIngredientSelection(e) {
        var newIndex = this.state.selectedIngredientIndex;
        var autocompletelist = this.state.autoCompleteList;
        var ingredientNameInput = this.state.ingredientNameInput;
        var autoCompleteList = this.state.autoCompleteList;

        if((autocompletelist.length === 0) || (e.key !== "ArrowUp" && e.key !== "ArrowDown" && e.key !== "Enter")) return;
        
        if(e.key === "ArrowDown")
            newIndex = newIndex + 1 === autocompletelist.length ? 0 : newIndex + 1;
        else if(e.key === "ArrowUp")
            newIndex = newIndex - 1 === -1 ? autocompletelist.length - 1 : newIndex - 1;
        else if(e.key === "Enter"){
            var newIngredient = _(autocompletelist).find(function(ingredient){
                return ingredient.selectorIndex === newIndex;
            });
            this.props.editIngredientHandler(newIngredient, "add");
            ingredientNameInput = "";
            autoCompleteList = [];
            newIndex = 0;
        }

        e.preventDefault();
        e.stopPropagation();

        this.setState({
            selectedIngredientIndex: newIndex,
            ingredientNameInput: ingredientNameInput,
            autoCompleteList: autoCompleteList
        });
    }

    componentDidMount() {
        $('#cook').on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
        });
    }

    componentDidUpdate() {
        $('#cook').off('click');
        $('#cook').on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
        });
    }

    componentWillUnmount() {
        $('#cook').off('click');
    }

    render() {
        var ingredientNameInput = this.state.ingredientNameInput;
        var autoCompleteDropdown = this.state.autoCompleteList;
        var ingredientBubbleList = this.props.searchedIngredients;

        var positionStyle = this.props.positionStyle ? this.props.positionStyle : "filter";
        var dropdownStyleInResults = this.props.positionStyle ? "dropdownStyleInResults" : "blah";
        

        return (
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id={positionStyle} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Filters
                </button>
                <div className="dropdown-menu dropdown-menu-right" id={dropdownStyleInResults} style={{top: '18.5 rem'}} aria-labelledby="filter">
                    <form className="px-4 py-3 row">
                        <div className="form-group col-sm-12">
                            <label className="filter-label" for="ingredientsInput">Add Ingredients</label>
                            
                            <div class="ingredient-filter-wrapper">
                                <input type="ingredient" className="form-control" value={ingredientNameInput} onChange={this.handleIngredientInput} onKeyDown={this.handleIngredientSelection} id="ingredientsInput" placeholder="Type to search and add ingredients" />
                                <AutoCompleteList list={autoCompleteDropdown} selector={this.state.selectedIngredientIndex} />
                            </div>
                            <IngredientBubbleChain list={ingredientBubbleList} deleteHandler={this.props.editIngredientHandler}/>
                            
                        </div>  
                    </form>
                </div>
    	    </div>

        );
    }

}

function AutoCompleteList(props) {
    var list = props.list;
    var selectedIndex = props.selector;


    if(!list.length) return null;

    // alphabetize the autocompletelist and show only first 7 results
    list = _(list).map(function(ingredient) {
        var showSelection = false;
        if(selectedIndex === ingredient.selectorIndex)
            showSelection = true;

        return <ListItem key={ingredient.id} ingredientName={ingredient.ingredientName} showselection={showSelection} />
    }).value();

    return(
        <div className="result-container">
            {list}
        </div>
    );
}

function ListItem(props) {
    if(props.showselection)
        return <p className="result selected">{props.ingredientName}</p>

    return <p className="result">{props.ingredientName}</p>;
}


function IngredientBubbleChain(props){
    var list = props.list;

    if(!list.length) return null;

    //iterate thru list and return bubble
    list = _(list).map(function(ingredient) {
        return <IngredientBubble key={ingredient.id} ingredient={ingredient} deleteHandler={props.deleteHandler}/>
    }).value();



    //bubbles to append to html
    return(
        <div className="ingredientBubbleChain">
            {list}
        </div>
    );
}

function IngredientBubble(props){
    var deleteHandler = props.deleteHandler;
    var ingredientName = props.ingredient.ingredientName;

    return (
        <div class="bubble">
            {ingredientName}<button class="bubble-delete" onClick={deleteHandler.bind({}, props.ingredient, "delete")}><i class="fa fa-times" aria-hidden="true"></i></button>
        </div>
    );
}


export default Filter;

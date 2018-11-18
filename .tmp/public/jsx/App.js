'use strict';

if (typeof result == 'undefined') {
  result = {};
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      csrf: typeof csrf == 'undefined' || !csrf ? '' : csrf,
      errorMessages: typeof result.errorMessages == 'undefined' || !result.errorMessages ? '' : result.errorMessages,
      successMessage: typeof result.successMessage == 'undefined' || !result.successMessage ? '' : result.successMessage,
      ingredient: typeof result.ingredient == 'undefined' || !result.ingredient ? '' : result.ingredient.ingredientName,
    };
  }

  render() {
    return (
      <div>
        <p>{this.state.errorMessages}</p>
        <p>{this.state.successMessage}</p>
        <p>{this.state.ingredient}</p>
        <form action="/create-ingredient" method="POST">
          <input type="hidden" name="_csrf" value={this.state.csrf}/>
          <input name="ingredientName"/>
          <button>Submit blah</button>
        </form>
      </div>
    );
  }
}

let domContainer = document.querySelector('#react');
ReactDOM.render(<App />, domContainer);
'use strict';

class App extends React.Component {
  render() {
    return (
      <div>
        Hello everyone, this text is made with React.
      </div>
    );
  }
}

let domContainer = document.querySelector('#react');
ReactDOM.render(<App />, domContainer);
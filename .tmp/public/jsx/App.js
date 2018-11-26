'use strict';
import Test from './test.js';
import Home from './Home.js';

const Route = ReactRouterDOM.Route;
const Router = ReactRouterDOM.BrowserRouter;

class App extends React.Component {

  render() {
    return (
      <Router>
        <Route exact path="/" component={Home} />
      </Router>
    );
  }
}

let domContainer = document.querySelector('#react');
ReactDOM.render(<App />, domContainer);

export default App;
'use strict';
import Home from './Home.js';
// import SignUp from './Signup.js';
// import Login from './Login.js';

const Route = ReactRouterDOM.Route;
const Router = ReactRouterDOM.BrowserRouter;

class App extends React.Component {

  render() {
    return (
      <div>
        <Router>
          <Route exact path="/" component={Home} />
        </Router>
      </div>
    );
  }
}

let domContainer = document.querySelector('#react');
ReactDOM.render(<App />, domContainer);

export default App;
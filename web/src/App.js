import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {tester: "CHANGE MEeee"};

    this.callBackEnd = this.callBackEnd.bind(this);
  }

  callBackEnd(e) {
    console.log("WUBBAS LUBBBB");

    var poop = "poop";
    var url = "http://localhost:1337/test"
    var opts = {method: "GET"};

    fetch(url, opts).then(function (res) {
          console.log(res);
          window.tester = res;
          return res.json();
        })
        .then(function (res) {
          console.log(res);
        });

  }

  render() {

    var test = this.state.tester;

    return (
      /* UNCOMMENT FOR TEMP SIGNUP FORM */
      <div>
        <form action="http://localhost:1337/signup" method="post">
          <input name="email" placeholder="email"/>
          <input name="password" type="password" placeholder="password"/>
          <input name="confirmPassword" type="password" placeholder="confirmPassword"/>
          <input name="firstName" placeholder="firstName"/>
          <input name="lastName" placeholder="lastName"/>
          <button class="btn">Registerrr</button>
        </form>

        <form action="http://localhost:1337/login" method="post">
          <input name="email" placeholder="email"/>
          <input name="password" type="password" placeholder="password"/>
          <button>Login</button>
        </form>
      </div>
    );
  }
}

export default App;

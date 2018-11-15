import React, { Component } from 'react';
import logo from './CHEFSlogo.png';

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
      <div id="wrap">
        <nav class="navbar navbar-default navbar-fixed-top">
        <div class="container-fluid">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">
              <img src={logo}/>
            </a>
          </div>
          <div id="navbar" class="navbar-collapse collapse">
            <ul class="nav navbar-nav navbar-right">
              <li><a href="login.html">LOG IN</a></li>
              <li><a href="#"><div id="signup">SIGN UP</div></a></li>
            </ul>
          </div>
        </div>
        </nav>

        <div id="maincontent">
          <div class= "center">
            <div class="input-group">
              <input type="text" class="form-control" placeholder="Search Recipes"></input>
              <div class="input-group-btn">
                <button class="btn" type="button"><i class="glyphicon glyphicon-search"></i></button>
              </div>
            </div>

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
        </div>
      </div>
    );
  }
}

export default App;

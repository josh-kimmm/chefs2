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
    var url = "http://localhost:1337/login"
    var opts = {
                  method: "POST",
                  body: JSON.stringify({
                    email: "josh_kimmm@yahoo.com",
                    password: "test",
                  })
                };

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
        <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">
              <img src={logo}/>
            </a>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav navbar-right">
              <li><a href="login.html">LOG IN</a></li>
              <li><a href="#"><div id="signup">SIGN UP</div></a></li>
            </ul>
          </div>
        </div>
        </nav>

        <div id="maincontent">
          <div className= "center">
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Search Recipes"></input>
              <div className="input-group-btn">
                <button className="btn" type="button"><i className="glyphicon glyphicon-search"></i></button>
              </div>
            </div>

          <form action="http://localhost:1337/signup" method="post">
            <input name="email" placeholder="email"/>
            <input name="password" type="password" placeholder="password"/>
            <input name="confirmPassword" type="password" placeholder="confirmPassword"/>
            <input name="firstName" placeholder="firstName"/>
            <input name="lastName" placeholder="lastName"/>
            <button className="btn">Registerrr</button>
          </form>

          <form action="http://localhost:1337/login" method="post">
            <input name="email" placeholder="email"/>
            <input name="password" type="password" placeholder="password"/>
            <button>Login</button>
          </form>
          <button onClick={this.callBackEnd}>YASSS</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

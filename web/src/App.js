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
      <div>
        <button className="button" onClick={this.callBackEnd}>{test}</button>
      </div>
    );
  }
}

export default App;

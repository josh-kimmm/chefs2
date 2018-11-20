'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
  }

  _createClass(App, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { id: "wrap" },
        React.createElement(
          "nav",
          { "class": "navbar navbar-default navbar-fixed-top" },
          React.createElement(
            "div",
            { "class": "container-fluid" },
            React.createElement(
              "div",
              { "class": "navbar-header" },
              React.createElement(
                "button",
                { type: "button", "class": "navbar-toggle collapsed", "data-toggle": "collapse", "data-target": "#navbar", "aria-expanded": "false", "aria-controls": "navbar" },
                React.createElement(
                  "span",
                  { "class": "sr-only" },
                  "Toggle navigation"
                ),
                React.createElement("span", { "class": "icon-bar" }),
                React.createElement("span", { "class": "icon-bar" }),
                React.createElement("span", { "class": "icon-bar" })
              ),
              React.createElement(
                "a",
                { "class": "navbar-brand", href: "#" },
                React.createElement("img", { src: logo })
              )
            ),
            React.createElement(
              "div",
              { id: "navbar", "class": "navbar-collapse collapse" },
              React.createElement(
                "ul",
                { "class": "nav navbar-nav navbar-right" },
                React.createElement(
                  "li",
                  null,
                  React.createElement(
                    "a",
                    { href: "login.html" },
                    "LOG IN"
                  )
                ),
                React.createElement(
                  "li",
                  null,
                  React.createElement(
                    "a",
                    { href: "#" },
                    React.createElement(
                      "div",
                      { id: "signup" },
                      "SIGN UP"
                    )
                  )
                )
              )
            )
          )
        ),
        React.createElement(
          "div",
          { id: "maincontent" },
          React.createElement(
            "div",
            { "class": "center" },
            React.createElement(
              "div",
              { "class": "input-group" },
              React.createElement("input", { type: "text", "class": "form-control", placeholder: "Search Recipes" }),
              React.createElement(
                "div",
                { "class": "input-group-btn" },
                React.createElement(
                  "button",
                  { "class": "btn", type: "button" },
                  React.createElement("i", { "class": "glyphicon glyphicon-search" })
                )
              )
            ),
            React.createElement(
              "form",
              { action: "http://localhost:1337/signup", method: "post" },
              React.createElement("input", { name: "email", placeholder: "email" }),
              React.createElement("input", { name: "password", type: "password", placeholder: "password" }),
              React.createElement("input", { name: "confirmPassword", type: "password", placeholder: "confirmPassword" }),
              React.createElement("input", { name: "firstName", placeholder: "firstName" }),
              React.createElement("input", { name: "lastName", placeholder: "lastName" }),
              React.createElement(
                "button",
                { "class": "btn" },
                "Registerrr"
              )
            ),
            React.createElement(
              "form",
              { action: "http://localhost:1337/login", method: "post" },
              React.createElement("input", { name: "email", placeholder: "email" }),
              React.createElement("input", { name: "password", type: "password", placeholder: "password" }),
              React.createElement(
                "button",
                null,
                "Login"
              )
            )
          )
        )
      );
    }
  }]);

  return App;
}(React.Component);

export default App;
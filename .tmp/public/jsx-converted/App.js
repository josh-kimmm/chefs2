'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (typeof result == 'undefined') {
  var result = {};
} else {
  result = JSON.parse(result);
}

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.state = {
      csrf: typeof csrf == 'undefined' || !csrf ? '' : csrf,
      errorMessages: typeof result.errorMessages == 'undefined' || !result.errorMessages ? '' : result.errorMessages,
      successMessage: typeof result.successMessage == 'undefined' || !result.successMessage ? '' : result.successMessage,
      ingredient: typeof result.ingredient == 'undefined' || !result.ingredient ? '' : result.ingredient
    };
    return _this;
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'p',
          null,
          this.state.errorMessages
        ),
        React.createElement(
          'p',
          null,
          this.state.successMessage
        ),
        React.createElement(
          'p',
          null,
          this.state.ingredient
        ),
        React.createElement(
          'form',
          { action: '/create-ingredient', method: 'POST' },
          React.createElement('input', { type: 'hidden', name: '_csrf', value: this.state.csrf }),
          React.createElement('input', { name: 'ingredientName' }),
          React.createElement(
            'button',
            null,
            'Submit blah'
          )
        )
      );
    }
  }]);

  return App;
}(React.Component);

var domContainer = document.querySelector('#react');
ReactDOM.render(React.createElement(App, null), domContainer);
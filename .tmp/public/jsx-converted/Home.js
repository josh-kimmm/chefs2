var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import SearchEngine from './SearchEngine.js';

var Router = ReactRouterDOM.Router;

var Home = function (_React$Component) {
	_inherits(Home, _React$Component);

	function Home(props) {
		_classCallCheck(this, Home);

		var _this = _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).call(this, props));

		_this.state = {
			showSearchResults: false
		};

		_this.changeSearchResults = _this.changeSearchResults.bind(_this);
		return _this;
	}

	_createClass(Home, [{
		key: "changeSearchResults",
		value: function changeSearchResults(val) {
			this.setState({ showSearchResults: val });
		}
	}, {
		key: "render",
		value: function render() {

			var searchresults = this.state.showSearchResults ? React.createElement(SearchResults, null) : null;

			return React.createElement(
				"div",
				{ id: "wrap" },
				React.createElement(SearchEngine, { changeSearchResults: this.changeSearchResults, showSearchResults: this.state.showSearchResults }),
				searchresults
			);
		}
	}]);

	return Home;
}(React.Component);

function SearchResults() {
	return React.createElement(
		"div",
		null,
		React.createElement(
			"h3",
			{ id: "show-results-label" },
			"Showing search results for '",
			React.createElement(
				"span",
				{ id: "keyword" },
				"boop"
			),
			"'"
		),
		React.createElement(
			"section",
			{ id: "search-results" },
			React.createElement(
				"div",
				{ "class": "result" },
				React.createElement(
					"div",
					{ "class": "row" },
					React.createElement(
						"div",
						{ "class": "col-sm-6" },
						React.createElement("img", { "class": "recipe-img", src: "https://raw.githubusercontent.com/josh-kimmm/chefs2/search-results/assets/images/search-result-test.jpg" })
					),
					React.createElement(
						"div",
						{ "class": "col-sm-6" },
						React.createElement(
							"h2",
							{ "class": "recipe-title" },
							"Recipe Title"
						),
						React.createElement(
							"p",
							{ "class": "recipe-description" },
							" this is a description. this is a description. this is a description. this is a description. this is a description. this is a description. this is a description. this is a description. this is a description. this is a description. this is a description. this is a description. this is a description. this is a description. this is a description. this is a description. this is a description. this is a description. this is a description. this is a description."
						)
					)
				)
			)
		)
	);
}

export default Home;
//# sourceMappingURL=Home.js.map
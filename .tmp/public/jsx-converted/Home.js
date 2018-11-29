var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Router = ReactRouterDOM.Router;

var Home = function (_React$Component) {
	_inherits(Home, _React$Component);

	function Home() {
		_classCallCheck(this, Home);

		return _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).apply(this, arguments));
	}

	_createClass(Home, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				{ id: "wrap" },
				React.createElement("img", { src: "/images/chefs-logo-red.png", alt: "", "class": "center" }),
				React.createElement(
					"div",
					{ "class": "input-group" },
					React.createElement("input", { type: "text", "class": "form-control", id: "searchinput", placeholder: "Search Recipes" }),
					React.createElement(
						"div",
						{ "class": "input-group-btn" },
						React.createElement(
							"button",
							{ "class": "btn", type: "button", id: "searchit" },
							React.createElement("i", { "class": "fa fa-search" })
						)
					)
				),
				React.createElement(
					"div",
					{ "class": "dropdown" },
					React.createElement(
						"button",
						{ "class": "btn btn-secondary dropdown-toggle", type: "button", id: "filter", "data-toggle": "dropdown", "aria-haspopup": "true", "aria-expanded": "false" },
						"Filters"
					),
					React.createElement(
						"div",
						{ "class": "dropdown-menu dropdown-menu-right", "aria-labelledby": "filter" },
						React.createElement(
							"form",
							{ "class": "px-4 py-3" },
							React.createElement(
								"div",
								{ "class": "form-group col-sm-6" },
								React.createElement(
									"label",
									{ "for": "ingredientsInput" },
									"Add Ingredients"
								),
								React.createElement("input", { type: "ingredient", "class": "form-control", id: "ingredientsInput", placeholder: "Type to search and add ingredients" }),
								React.createElement(
									"label",
									{ "for": "cookingMethods" },
									"Add Cooking Methods"
								),
								React.createElement("input", { type: "cookMethods", "class": "form-control", id: "cookingMethods", placeholder: "Type to search and add cooking methods" })
							),
							React.createElement(
								"div",
								{ "class": "col-sm-6" },
								React.createElement(
									"label",
									{ "for": "diet" },
									"Add Dietary Restrictions"
								),
								React.createElement(
									"button",
									{ "class": "btn btn-secondary dropdown-item dropdown-toggle", type: "button", id: "diet", "data-toggle": "dropdown", "aria-haspopup": "true", "aria-expanded": "false" },
									"Choose dietary restrictions"
								),
								React.createElement(
									"div",
									{ "class": "dropdown-menu", "aria-labelledby": "diet" },
									React.createElement(
										"a",
										{ "class": "dropdown-item", href: "#" },
										"This"
									)
								),
								React.createElement(
									"div",
									null,
									React.createElement(
										"label",
										null,
										"Add Time Restraint"
									)
								),
								React.createElement(
									"div",
									null,
									React.createElement(
										"select",
										{ name: "hrs", "class": "custom-select", id: "hours" },
										React.createElement(
											"option",
											{ selected: true },
											"-"
										)
									),
									React.createElement(
										"select",
										{ name: "mins", "class": "custom-select", id: "minutes" },
										React.createElement(
											"option",
											{ selected: true },
											"-"
										)
									)
								)
							)
						)
					)
				)
			);
		}
	}]);

	return Home;
}(React.Component);

export default Home;
//# sourceMappingURL=Home.js.map
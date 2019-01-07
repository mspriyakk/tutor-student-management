'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import JSONdata from './app.js';

var e = React.createElement;

var CourseCategories = function (_React$Component) {
	_inherits(CourseCategories, _React$Component);

	function CourseCategories(props) {
		_classCallCheck(this, CourseCategories);

		return _possibleConstructorReturn(this, (CourseCategories.__proto__ || Object.getPrototypeOf(CourseCategories)).call(this, props));
		/*this.state = {liked:false};*/
	}

	_createClass(CourseCategories, [{
		key: 'render',
		value: function render() {
			var skills = JSONdata.skillsData;

			function handleClick(evt) {
				evt.preventDefault();

				console.log("this link was clicked.");
			}

			var courseNames = Object.keys(skills);
			var courses = courseNames.map(function (name) {
				return React.createElement(
					'li',
					{ key: name },
					React.createElement(
						'a',
						{ href: '', onClick: handleClick },
						name
					)
				);
			});

			return React.createElement(
				'ul',
				null,
				React.createElement(
					'li',
					null,
					'All Courses'
				),
				courses
			);
		}
	}]);

	return CourseCategories;
}(React.Component);

var domContainer = document.getElementById('course-group');
ReactDOM.render(e(CourseCategories), domContainer);
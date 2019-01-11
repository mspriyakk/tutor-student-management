'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import JSONdata from './app.js';

var e = React.createElement;
var curDay = 1;
var curHour = new Date().getHours();
var skills = JSONdata.skillsData;
var tutor = JSONdata.tutorData;

function SkillBoard(props) {
	var tutorName = props.name;
	var skillBoard = [];

	for (var s in skills) {
		if (skills[s].toString().includes(tutorName)) {
			skillBoard.push(React.createElement(
				'p',
				{ key: s },
				s
			));
		}
	}

	return React.createElement(
		'aside',
		{ className: 'skill-board' },
		skillBoard
	);
}

var TutorsList = function (_React$Component) {
	_inherits(TutorsList, _React$Component);

	function TutorsList() {
		_classCallCheck(this, TutorsList);

		return _possibleConstructorReturn(this, (TutorsList.__proto__ || Object.getPrototypeOf(TutorsList)).apply(this, arguments));
	}

	_createClass(TutorsList, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var schedule = JSONdata.scheduleData;
			var currentCourse = this.props.activeCourse;
			var counter = this.props.tutorServingCounter;

			console.log(tutor, skills[currentCourse]);
			var curDayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

			var scheduleTime = Object.keys(schedule[curDayName[curDay]]);
			var scheduleTimeHashMap = new Object();

			for (var j = 0; j < scheduleTime.length; j++) {
				scheduleTimeHashMap[scheduleTime[j]] = scheduleTime[j];
			}

			var flag;
			if (curHour < 13) {
				for (var item in scheduleTimeHashMap) {
					if (item.substr(0, 2) === curHour) {
						flag = item;
						break;
					}
				}
			} else {
				for (var _item in scheduleTimeHashMap) {
					if (_item.substr(0, 1) == curHour - 12) {
						flag = _item;
						break;
					}
				}
			}

			var arryTutors = schedule[curDayName[curDay]][flag];
			var arryTutorBySkill = [];

			for (var k = 0; k < arryTutors.length; k++) {
				if (skills[currentCourse].toString().includes(arryTutors[k])) {
					arryTutorBySkill.push(arryTutors[k]);
				}
			}

			var tutors = [];
			for (var _k = 0; _k < arryTutorBySkill.length; _k++) {
				var tutorName = arryTutorBySkill[_k];
				var photo = tutor[tutorName].photo;

				tutors.push(React.createElement(
					'article',
					{ key: tutorName },
					React.createElement('img', { src: photo, alt: tutorName, className: 'float-left' }),
					React.createElement(SkillBoard, { name: tutorName }),
					React.createElement(
						'form',
						null,
						React.createElement('input', { type: 'text',
							value: counter[tutorName][currentCourse],
							onChange: function onChange(tutorName, currentCourse) {
								return _this2.props.onChange(tutorName, currentCourse);
							} }),
						React.createElement(
							'button',
							{ onClick: function onClick(tutorName, currentCourse) {
									return _this2.props.onPlusClick(tutorName, currentCourse);
								} },
							'+'
						),
						React.createElement(
							'button',
							{ onClick: function onClick(tutorName, currentCourse) {
									return _this2.props.onMinusClick(tutorName, currentCourse);
								} },
							'-'
						)
					)
				));
			}

			return React.createElement(
				'section',
				{ id: 'tutor-listing', className: 'flexbox' },
				tutors
			);
		}
	}]);

	return TutorsList;
}(React.Component);

var Courses = function (_React$Component2) {
	_inherits(Courses, _React$Component2);

	function Courses() {
		_classCallCheck(this, Courses);

		return _possibleConstructorReturn(this, (Courses.__proto__ || Object.getPrototypeOf(Courses)).apply(this, arguments));
	}

	_createClass(Courses, [{
		key: 'render',
		value: function render() {
			var _this4 = this;

			var courseNames = Object.keys(skills);
			var courses = courseNames.map(function (name) {
				return React.createElement(
					'li',
					{ key: name },
					React.createElement(
						'a',
						{ name: name, onClick: function onClick() {
								return _this4.props.onClick({ name: name });
							} },
						name
					)
				);
			});

			return React.createElement(
				'ul',
				null,
				courses
			);
		}
	}]);

	return Courses;
}(React.Component);

var Page = function (_React$Component3) {
	_inherits(Page, _React$Component3);

	function Page(props) {
		_classCallCheck(this, Page);

		var _this5 = _possibleConstructorReturn(this, (Page.__proto__ || Object.getPrototypeOf(Page)).call(this, props));

		_this5.handleChange = function (param1, param2) {
			return function (evt) {
				console.log(param1, param2);
				// this.setState({value: event.target.value});
			};
		};

		_this5.handleAdd = function (param1, param2) {
			return function (evt) {
				console.log(param1, param2);
				// this.setState({value: event.target.value});
			};
		};

		_this5.handleMinus = function (param1, param2) {
			return function (evt) {
				console.log(param1, param2);
				// this.setState({value: event.target.value});
			};
		};

		var newObj = {};
		var skillsArry = Object.keys(skills);
		var tutorArry = Object.keys(tutor);

		for (var j = 0; j < tutorArry.length; j++) {
			newObj[tutorArry[j]] = {};
			for (var i = 0; i < skillsArry.length; i++) {
				newObj[tutorArry[j]][skillsArry[i]] = 0;
			}
		}

		_this5.state = {
			tutorStudentCounter: newObj,
			activeLink: "ALL COURSES"
		};

		_this5.handleChange = _this5.handleChange.bind(_this5);
		_this5.handleAdd = _this5.handleAdd.bind(_this5);
		_this5.handleMinus = _this5.handleMinus.bind(_this5);
		return _this5;
	}

	_createClass(Page, [{
		key: 'handleClick',
		value: function handleClick(i) {
			var currentClicked = i.name;
			this.setState({
				activeLink: currentClicked
			});
		}
	}, {
		key: 'render',
		value: function render(i) {
			var _this6 = this;

			return React.createElement(
				'div',
				{ className: 'flexbox' },
				React.createElement(
					'aside',
					null,
					React.createElement(
						'h2',
						null,
						'Course'
					),
					React.createElement(
						'nav',
						{ id: 'course-group' },
						React.createElement(Courses, { value: this.state.activeLink, onClick: function onClick(i) {
								return _this6.handleClick(i);
							} })
					),
					React.createElement(
						'p',
						null,
						React.createElement('img', { src: 'images/mcslc-logo.png', alt: 'MSCLC logo' })
					)
				),
				React.createElement(
					'main',
					null,
					React.createElement(
						'header',
						{ className: 'flexbox' },
						React.createElement('h2', { id: 'day-of-the-week' }),
						React.createElement('p', { id: 'time-of-the-week', className: 'subhead' })
					),
					React.createElement('h3', { id: 'course-info' }),
					React.createElement(TutorsList, { activeCourse: this.state.activeLink, tutorServingCounter: this.state.tutorStudentCounter,
						onChange: function onChange(t, s) {
							return _this6.handleChange(t, s);
						},
						onPlusClick: function onPlusClick(t, s) {
							return _this6.handleAdd(t, s);
						},
						onMinusClick: function onMinusClick(t, s) {
							return _this6.handleMinus(t, s);
						} })
				)
			);
		}
	}]);

	return Page;
}(React.Component);

var domContainer = document.getElementById('allwrapper');
ReactDOM.render(e(Page), domContainer);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import JSONdata from './app.js';

var e2 = React.createElement;
var curDay = 1;
var curHour = new Date().getHours();

function SkillBoard(props) {
	var tutorName = props.name;
	var skills = JSONdata.skillsData;
	console.log(skills);

	var skillBoard = [];

	for (var s in skills) {
		console.log(s, skills[s], skills[s].toString().includes(tutorName));
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

	function TutorsList(props) {
		_classCallCheck(this, TutorsList);

		return _possibleConstructorReturn(this, (TutorsList.__proto__ || Object.getPrototypeOf(TutorsList)).call(this, props));
		/*this.state = {liked:false};*/
	}

	_createClass(TutorsList, [{
		key: 'render',
		value: function render() {
			var schedule = JSONdata.scheduleData;
			var tutor = JSONdata.tutorData;

			console.log(tutor);
			var curDayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

			console.log(schedule[curDayName[curDay]]);

			var scheduleTime = Object.keys(schedule[curDayName[curDay]]);
			var scheduleTimeHashMap = new Object();

			for (var j = 0; j < scheduleTime.length; j++) {
				scheduleTimeHashMap[scheduleTime[j]] = scheduleTime[j];
			}

			console.log(scheduleTimeHashMap);

			var flag;
			if (curHour < 13) {
				for (var item in scheduleTimeHashMap) {
					console.log(item.substr(0, 1));
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

			console.log(flag, schedule[curDayName[curDay]][flag]);
			var arryTutors = schedule[curDayName[curDay]][flag];

			var tutors = [];
			for (var k = 0; k < arryTutors.length; k++) {
				var tutorName = arryTutors[k];
				var photo = tutor[tutorName].photo;
				var count = tutor[tutorName].count;

				tutors.push(React.createElement(
					'article',
					{ key: tutorName },
					React.createElement('img', { src: photo, alt: tutorName, className: 'float-left' }),
					React.createElement(SkillBoard, { name: tutorName })
				));
			}

			return React.createElement(
				'div',
				{ className: 'flexbox' },
				tutors
			);
		}
	}]);

	return TutorsList;
}(React.Component);

var domContainer2 = document.getElementById('tutor-listing');
ReactDOM.render(e2(TutorsList), domContainer2);
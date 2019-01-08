'use strict';

var domContainer = document.querySelector("#category-container");
var skills = Object.keys(skillsData);
var listItems = skills.map(function (skills) {
	return React.createElement(
		"li",
		{ key: skills.toString() },
		skills
	);
});
ReactDOM.render(React.createElement(
	"ul",
	null,
	listItems
), domContainer);
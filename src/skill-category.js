'use strict';

const domContainer = document.querySelector("#category-container");
const skills = Object.keys(skillsData);
const listItems = skills.map((skills) => 
	<li key={skills.toString()}>{skills}</li>
);
ReactDOM.render(
	<ul>{listItems}</ul>, domContainer
	);
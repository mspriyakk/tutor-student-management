'use strict';
import JSONdata from './app.js';

const e = React.createElement;

class CourseCategories extends React.Component {

	constructor(props){
		super(props);
		/*this.state = {liked:false};*/
	}
	render(){
		let skills = JSONdata.skillsData;

		function handleClick(evt){
			evt.preventDefault();

			console.log("this link was clicked.");

		}

		let courseNames = Object.keys(skills);
		const courses = courseNames.map((name) =>
			<li key={name}><a href="" onClick={handleClick}>{name}</a></li>
		);	
		
		return (
			<ul>
			    <li>All Courses</li>
				{courses}
			</ul>
			)
	}
}
const domContainer = document.getElementById('course-group');
ReactDOM.render(e(CourseCategories), domContainer);

import schedule from "./schedule";
import skills from "./skills";
import tutor from "./tutor";

import React from 'react';
import ReactDOM from 'react-dom';

//console.log(schedule, skills, tutor);
const curDay = 1; 
const curHour = new Date().getHours();
const curDayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function Courses(props) {
	let courseNames = Object.keys(skills);

	const courses = courseNames.map((course) =>{
		let courseCounter = 0;
		for (let student in props.studentCounter) {
			courseCounter += props.studentCounter[student][course];
		}

		return (<li key={course}><a name={course} onClick={() => props.onClick({ course })}>{course} ({courseCounter})</a></li>);
	});	

	
	return (
			<ul>			
				{courses}
			</ul>				
		);
}

function SkillBoard(props) {
	let tutorName = props.name;
	const skillBoard =[];

	for(let s in skills){
		if(skills[s].toString().includes(tutorName)){
			skillBoard.push(<p key={s}>{s}</p>);			
		}
	}

	return (
		<aside className="skill-board">
		{skillBoard}
		</aside>
	);
}

function tutorsBySkill(currentCourse) {
	//console.log(tutor, skills[currentCourse]);

	let scheduleTime = Object.keys(schedule[curDayName[curDay]]);
	let scheduleTimeHashMap = {};

	for (let j = 0; j < scheduleTime.length; j++) {
		scheduleTimeHashMap[scheduleTime[j]] = scheduleTime[j];
	}

	var flag;
	if (curHour < 13) {
		for (let item in scheduleTimeHashMap) {
			if (Number(item.substr(0, 2)) === curHour) {
				flag = item;
				break;
			}
		}
	} else {
		for (let item in scheduleTimeHashMap) {
			if (Number(item.substr(0, 1)) === curHour - 12) {
				flag = item;
				break;
			}
		}
	}

	let arryTutors = schedule[curDayName[curDay]][flag];
	let arryTutorBySkill = [];
	console.log(arryTutorBySkill);
	if(arryTutors === undefined){
		//lab hasn't opened to give tutors for the current time
		return null;
	}else {
		for (let k = 0; k < arryTutors.length; k++) {
			if (skills[currentCourse].toString().includes(arryTutors[k])) {
				arryTutorBySkill.push(arryTutors[k]);
			}
		}

		return arryTutorBySkill;
	}
}

function TutorsList(props) {
	return (<p>
		<img src={props.photo}
			alt={props.name}
			className="float-left" />
		</p>);
}


class Page extends React.Component {
	constructor(props){
		super(props);

		let newObj = {};
		let skillsArry = Object.keys(skills);
		let tutorArry = Object.keys(tutor);

		for (let j = 0; j < tutorArry.length; j++) {
			newObj[tutorArry[j]] = {};
			for (let i = 0; i < skillsArry.length; i++) {
				newObj[tutorArry[j]][skillsArry[i]] = 0;
			}
		}

		this.state = {
			activeLink: "ALL COURSES", 
			studentCounter: newObj
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
		this.handleMinus = this.handleMinus.bind(this);
	}

	handleChange(tutor, evt) {
		evt.preventDefault();
		//console.log(this.state.activeLink,this.state.studentCounter);
		const counter = this.state.studentCounter;
		counter[tutor][this.state.activeLink] = evt.target.value;

		this.setState({ studentCounter: counter });
	}
	handleAdd(tutor, evt) {
		evt.preventDefault();
		//console.log(this.state.activeLink,this.state.studentCounter);
		const counter = this.state.studentCounter;
		counter[tutor][this.state.activeLink] = counter[tutor][this.state.activeLink] + 1;

		this.setState({ studentCounter: counter });
	}
	handleMinus(tutor, evt) {
		evt.preventDefault();
		//console.log(this.state.activeLink,this.state.studentCounter);
		const counter = this.state.studentCounter;
		if (counter[tutor][this.state.activeLink] === 0) return;
		counter[tutor][this.state.activeLink] = counter[tutor][this.state.activeLink] - 1;

		this.setState({ studentCounter: counter });
	}

	handleClick(i){
		let currentClicked = i.course;
		this.setState({
			activeLink : currentClicked
		});
		
	}
	
	render(i){	
		let currentCourse = this.state.activeLink;
		let counter = this.state.studentCounter;
		let arryTutorBySkill = tutorsBySkill(currentCourse);
		const tutorsSection = [];

		
		if(arryTutorBySkill ===  null) {
			tutorsSection.push(<p key="noservice">Sorry, the lab is not open.</p>);
		}else {
			for (let k = 0; k < arryTutorBySkill.length; k++) {
				let tutorName = arryTutorBySkill[k];
				let photo = tutor[tutorName].photo;

				tutorsSection.push( <article key = {tutorName} >
					<TutorsList name={tutorName} photo={photo} />
					<SkillBoard name={tutorName} /> 
					<form>
						<input type="text"
							value={counter[tutorName][currentCourse]}
							onChange={(e) => this.handleChange(tutorName, e)} />
						<button onClick={(e) => this.handleAdd(tutorName, e)}>+</button>
						<button onClick={(e) => this.handleMinus(tutorName, e)}>-</button>
					</form>
				</article>);
			}
		}

		return (
			<div className="flexbox">
				<aside>
					<h2>Course</h2>
			  		<nav id="course-group">
						<Courses 
						studentCounter = {this.state.studentCounter}
						value = {this.state.activeLink}
						onClick = {
							(i) => this.handleClick(i)
						}
						/>
			  		</nav> 
			  		<p><img src="images/mcslc-logo.png" alt="MSCLC logo" /></p>
				</aside>
				<main>
					<header className="flexbox">
						<h2 id="day-of-the-week"></h2>
						<p id="time-of-the-week" className="subhead"></p>
					</header>
					<h3 id="course-info"></h3>


					<section id="tutor-listing" className="flexbox">
						{tutorsSection}
					</section>

				</main>
			</div>
			);
	}
}
const domContainer = document.getElementById('root');
ReactDOM.render(<Page />, domContainer);

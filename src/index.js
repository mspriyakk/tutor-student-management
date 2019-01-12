import schedule from "./schedule";
import skills from "./skills";
import tutor from "./tutor";

import React from 'react';
import ReactDOM from 'react-dom';

//console.log(schedule, skills, tutor);
const curDay = 1; 
const curHour = new Date().getHours();

class Courses extends React.Component {
	render(){
		let courseNames = Object.keys(skills);
		const courses = courseNames.map((name) =>
			<li key={name}><a name={name} onClick={()=>this.props.onClick({name})}>{name}</a></li>
		);	
		
		return (
	  			<ul>			
					{courses}
				</ul>				
			)
	}
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

class TutorsList extends React.Component {
	constructor(props){
		super(props);

		let newObj = {};
		let skillsArry = Object.keys(skills);
		let tutorArry = Object.keys(tutor);

		for(let j=0;j<tutorArry.length;j++){
			newObj[tutorArry[j]] = {};
			for(let i=0;i<skillsArry.length; i++){ 
				newObj[tutorArry[j]][skillsArry[i]] = 0;
			}
		}

		this.state = {
			tutorStudentCounter: newObj,
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
		this.handleMinus = this.handleMinus.bind(this);
	}
	handleChange(tutor, evt)  {
		evt.preventDefault();
		console.log(this.props.activeCourse,this.state.tutorStudentCounter);
		const counter = this.state.tutorStudentCounter;
		counter[tutor][this.props.activeCourse] = evt.target.value;

		this.setState({tutorStudentCounter: counter});
	}
	handleAdd(tutor, evt){
		evt.preventDefault();
		console.log(this.props.activeCourse,this.state.tutorStudentCounter);
		const counter = this.state.tutorStudentCounter;
		counter[tutor][this.props.activeCourse] = counter[tutor][this.props.activeCourse]+1;

		this.setState({tutorStudentCounter: counter});
	}
	handleMinus(tutor, evt){
		evt.preventDefault();
		console.log(this.props.activeCourse,this.state.tutorStudentCounter);
		const counter = this.state.tutorStudentCounter;
		counter[tutor][this.props.activeCourse] = counter[tutor][this.props.activeCourse]-1;

		this.setState({tutorStudentCounter: counter});
	}	
	render(){
		let currentCourse = this.props.activeCourse;
		let counter = this.state.tutorStudentCounter;

		console.log(tutor, skills[currentCourse]);
		const curDayName = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


		let scheduleTime = Object.keys(schedule[curDayName[curDay]]);
		let scheduleTimeHashMap=new Object();
		
		for(let j=0;j<scheduleTime.length; j++){
			scheduleTimeHashMap[scheduleTime[j]] = scheduleTime[j];
		}


		var flag;
		if(curHour < 13){
			for(let item in scheduleTimeHashMap) { 
				if(item.substr(0,2) === curHour) {
				  flag =  item;
				 break;
				}
			}
		}else {
			for(let item in scheduleTimeHashMap) { 
				if(item.substr(0,1) == curHour-12) {
				  flag =  item;
				 break;
				}
			}
		}

		let arryTutors = schedule[curDayName[curDay]][flag];
		let arryTutorBySkill =[];

		for(let k=0; k<arryTutors.length;k++){
			if(skills[currentCourse].toString().includes(arryTutors[k])){
				arryTutorBySkill.push(arryTutors[k]);
			}

		}

		const tutors =[];
		for(let k=0; k<arryTutorBySkill.length;k++){
			let tutorName = arryTutorBySkill[k];
			let photo = tutor[tutorName].photo;

			tutors.push(<article key={tutorName}>
				<img src={photo} alt={tutorName} className="float-left" />
				<SkillBoard name={tutorName} />

			<form>
				<input type="text" 
				value={counter[tutorName][currentCourse]} 
				onChange={(e)=>this.handleChange(tutorName,e)} />
				<button onClick={(e)=>this.handleAdd(tutorName,e)}>+</button>
				<button onClick={(e)=>this.handleMinus(tutorName,e)}>-</button>
			</form>			
			
			</article>);
		}

		return (
				<section id="tutor-listing" className="flexbox">
					{tutors}
				</section>
			);
	}
}


class Page extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			activeLink: "ALL COURSES"
		};
	}

	handleClick(i){
		let currentClicked = i.name;
		this.setState({
			activeLink : currentClicked
		});
		
	}
	
	render(i){	
		return (
			<div className="flexbox">
				<aside>
					<h2>Course</h2>
			  		<nav id="course-group">
						<Courses value={this.state.activeLink} onClick={ (i) => this.handleClick(i) } />
			  		</nav>
			  		<p><img src="images/mcslc-logo.png" alt="MSCLC logo" /></p>
				</aside>
				<main>
					<header className="flexbox">
						<h2 id="day-of-the-week"></h2>
						<p id="time-of-the-week" className="subhead"></p>
					</header>
					<h3 id="course-info"></h3>

					<TutorsList activeCourse={this.state.activeLink}   />
				</main>
			</div>
			);
	}
}
const domContainer = document.getElementById('root');
ReactDOM.render(<Page />, domContainer);

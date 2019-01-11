'use strict';
import JSONdata from './app.js';

const e = React.createElement;
const curDay = 1; 
const curHour = new Date().getHours();
let skills = JSONdata.skillsData;
let tutor = JSONdata.tutorData;	


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
	render(){
		let schedule = JSONdata.scheduleData;
		let currentCourse = this.props.activeCourse;
		let counter = this.props.tutorServingCounter;

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
				onChange={(tutorName, currentCourse)=>this.props.onChange(tutorName, currentCourse)} />
				<button onClick={(tutorName, currentCourse)=>this.props.onPlusClick(tutorName, currentCourse)}>+</button>
				<button onClick={(tutorName, currentCourse)=>this.props.onMinusClick(tutorName, currentCourse)}>-</button>
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


class Page extends React.Component {
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
			activeLink: "ALL COURSES"
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
		this.handleMinus = this.handleMinus.bind(this);
	}

	handleClick(i){
		let currentClicked = i.name;
		this.setState({
			activeLink : currentClicked
		});
		
	}
	handleChange =  (param1, param2) => (evt) => {
		console.log(param1, param2);
		// this.setState({value: event.target.value});
	}
	handleAdd =  (param1, param2) => (evt) => {
		console.log(param1, param2);
		// this.setState({value: event.target.value});
	}
	handleMinus =  (param1, param2) => (evt) => {
		console.log(param1, param2);
		// this.setState({value: event.target.value});
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

					<TutorsList activeCourse={this.state.activeLink}  tutorServingCounter={this.state.tutorStudentCounter} 
						onChange={(t,s) => this.handleChange(t,s)} 
						onPlusClick={(t,s) => this.handleAdd(t,s)} 
						onMinusClick={(t,s) => this.handleMinus(t,s)} />

				</main>
			</div>
			);
	}
}
const domContainer = document.getElementById('allwrapper');
ReactDOM.render(e(Page), domContainer);

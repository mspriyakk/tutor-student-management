'use strict';
import JSONdata from './app.js';

const e = React.createElement;
const curDay = 1; 
const curHour = new Date().getHours();
let skills = JSONdata.skillsData;


function SkillBoard(props) {
	let tutorName = props.name;
	//console.log(skills);

	const skillBoard =[];

	for(let s in skills){
		//console.log(s,skills[s],skills[s].toString().includes(tutorName))
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
		let tutor = JSONdata.tutorData;	
		let currentCourse = this.props.value;

		console.log(tutor, skills[currentCourse]);
		const curDayName = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

		//console.log(schedule[curDayName[curDay]]);

		let scheduleTime = Object.keys(schedule[curDayName[curDay]]);
		let scheduleTimeHashMap=new Object();
		
		for(let j=0;j<scheduleTime.length; j++){
			scheduleTimeHashMap[scheduleTime[j]] = scheduleTime[j];
		}

		//console.log(scheduleTimeHashMap);

		var flag;
		if(curHour < 13){
			for(let item in scheduleTimeHashMap) { 
				//console.log(item.substr(0,1));
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

		//console.log(flag, schedule[curDayName[curDay]][flag]);
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
			let count = tutor[tutorName].count;

			tutors.push(<article key={tutorName}>
				<img src={photo} alt={tutorName} className="float-left" />
				<SkillBoard name={tutorName} />
			</article>);
		}

		return (
				<section id="tutor-listing" className="flexbox">
					{tutors}
				</section>
			)
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
		this.state = {activeLink: "ALL COURSES"};
	}

	handleClick(i){
		let currentClicked = i.name;
		this.setState({activeLink : currentClicked});
		//console.log("this link was clicked.");
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

					<TutorsList value={this.state.activeLink} />

				</main>
			</div>
			);
	}
}
const domContainer = document.getElementById('allwrapper');
ReactDOM.render(e(Page), domContainer);

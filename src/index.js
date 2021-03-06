import "./index.css"
import schedule from "./schedule";
import skills from "./skills";
import tutor from "./tutor";
import Courses from "./Courses";
import TutorsList from "./TutorsList";
import SkillBoard from "./SkillBoard";

import React from 'react';
import ReactDOM from 'react-dom';

//console.log(schedule, skills, tutor);
const today = new Date();
const curDay = today.getDay(); 
const curHour = today.getHours();
const curDayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const curScheduleTime = getCurrentScheduleTime();


function getCurrentScheduleTime(){
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
	return flag;
}

function tutorsBySkill(currentCourse) {
	//console.log(tutor, skills[currentCourse]);


	let arryTutors = schedule[curDayName[curDay]][curScheduleTime];
	let arryTutorBySkill = [];

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

function updateAllCourse(counter, tutor){
	let count = 0;
	for (let tutorSkill in counter[tutor]){
		//console.log(tutorSkill);
		if (tutorSkill !== "ALL COURSES"){
			count += counter[tutor][tutorSkill];
		}
	}
	counter[tutor]["ALL COURSES"] =  count;
	//console.log(counter[tutor]["ALL COURSES"]);
	
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
		if (isNaN(Number(evt.target.value)) )	return;
		counter[tutor][this.state.activeLink] = Number(evt.target.value);

		updateAllCourse(counter, tutor);

		this.setState({ studentCounter: counter });
	}
	handleAdd(tutor, evt) {
		evt.preventDefault();
		//console.log(this.state.activeLink,this.state.studentCounter);
		const counter = this.state.studentCounter;
		counter[tutor][this.state.activeLink] = counter[tutor][this.state.activeLink] + 1;
		updateAllCourse(counter, tutor);

		this.setState({ studentCounter: counter });
	}
	handleMinus(tutor, evt) {
		evt.preventDefault();
		//console.log(this.state.activeLink,this.state.studentCounter);
		const counter = this.state.studentCounter;
		if (counter[tutor][this.state.activeLink] === 0) return;
		counter[tutor][this.state.activeLink] = counter[tutor][this.state.activeLink] - 1;
		updateAllCourse(counter, tutor);

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

				if(currentCourse === "ALL COURSES"){
					tutorsSection.push(<article key={tutorName}>
						<TutorsList name={tutorName} photo={photo} />
						<SkillBoard name={tutorName} value={counter[tutorName]} />
		            </article>);
				}else{
					tutorsSection.push(<article key={tutorName}>
              <TutorsList name={tutorName} photo={photo} />
              <SkillBoard name={tutorName} value={counter[tutorName]} />
              <form>
				<input type="text" 
				value={counter[tutorName][currentCourse]} 
				onChange={e => this.handleChange(tutorName, e)} />
                <button onClick={e => this.handleAdd(tutorName, e)}>+</button>
                <button onClick={e => this.handleMinus(tutorName, e)}>-</button>
              </form>
            </article>);
				}

			}
		}

		return <div className="flexbox">
        <aside>
          <h2>Course</h2>
          <nav id="course-group">
            <Courses studentCounter={this.state.studentCounter} value={this.state.activeLink} onClick={i => this.handleClick(i)} />
          </nav>
          <p>
            <img src="images/mcslc-logo.png" alt="MSCLC logo" />
          </p>
        </aside>
        <main>
          <header className="flexbox">
			<h2 id="day-of-the-week">
			{curDayName[curDay]} 
			<span id="time-of-the-week" className="subhead"> ({curScheduleTime})</span>
			</h2>
          </header>
			<h3 id="course-info">{this.state.activeLink}</h3>

          <section id="tutor-listing" className="flexbox fwrap">
            {tutorsSection}
          </section>
        </main>
      </div>;
	}
}
const domContainer = document.getElementById('root');
ReactDOM.render(<Page />, domContainer);

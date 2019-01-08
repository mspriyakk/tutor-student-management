'use strict';
import JSONdata from './app.js';

const e2 = React.createElement;
const curDay = 1; 
const curHour = new Date().getHours();


function SkillBoard(props) {
	let tutorName = props.name;
	let skills = JSONdata.skillsData;
	console.log(skills);

	const skillBoard =[];

	for(let s in skills){
		console.log(s,skills[s],skills[s].toString().includes(tutorName))
		if(skills[s].toString().includes(tutorName)){
			skillBoard.push(<p>{s}</p>);			
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
		/*this.state = {liked:false};*/
	}
	render(){
		let schedule = JSONdata.scheduleData;
		let tutor = JSONdata.tutorData;	

		console.log(tutor);
		const curDayName = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

		console.log(schedule[curDayName[curDay]]);

		let scheduleTime = Object.keys(schedule[curDayName[curDay]]);
		let scheduleTimeHashMap=new Object();
		
		for(let j=0;j<scheduleTime.length; j++){
			scheduleTimeHashMap[scheduleTime[j]] = scheduleTime[j];
		}

		console.log(scheduleTimeHashMap);

		var flag;
		if(curHour < 13){
			for(let item in scheduleTimeHashMap) { 
				console.log(item.substr(0,1));
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

		console.log(flag, schedule[curDayName[curDay]][flag]);
		let arryTutors = schedule[curDayName[curDay]][flag];

		const tutors =[];
		for(let k=0; k<arryTutors.length;k++){
			let tutorName = arryTutors[k];
			let photo = tutor[tutorName].photo;
			let count = tutor[tutorName].count;

			tutors.push(<article key={tutorName}>
				<img src={photo} alt={tutorName} className="float-left" />
				<SkillBoard name={tutorName} />
			</article>);
		}

		return (
				<div className="flexbox">
				{tutors}
				</div>
			)
	}
}
const domContainer2 = document.getElementById('tutor-listing');
ReactDOM.render(e2(TutorsList), domContainer2);

'use strict';
import JSONdata from './app.js';


class SkillBoard extends React.Component {

	constructor(props){
		super(props);
	}

	render(){
		let skills = JSONdata.skillsData;
		console.log(skills);

		const skillBoard =[];
		let tutorName = {props.name};

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
			)
	}
}

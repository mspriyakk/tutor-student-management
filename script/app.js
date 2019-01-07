'use strict';
const JSONdata = {
	loadScheduleJSON(callback)  {
		let xobj = new XMLHttpRequest();
		xobj.open("GET", "data/schedule.json", false);
		xobj.onreadystatechange = function() {
			if(xobj.readyState === 4 && xobj.status === 200) {
				callback(xobj.responseText);			
			}
		};
		xobj.send(null);
	},

	loadSkillsJSON(callback)  {
		let xobj = new XMLHttpRequest();
		xobj.open("GET", "data/skills.json", false);
		xobj.onreadystatechange = function() {
			if(xobj.readyState === 4 && xobj.status === 200) {
				callback(xobj.responseText);			
			}
		};
		xobj.send(null);
	},

	loadTutorJSON(callback)  {
		let xobj = new XMLHttpRequest();
		xobj.open("GET", "data/tutor.json", false);
		xobj.onreadystatechange = function() {
			if(xobj.readyState === 4 && xobj.status === 200) {
				callback(xobj.responseText);			
			}
		};
		xobj.send(null);
	},

	get scheduleData(){
		let scheduleData;
		this.loadScheduleJSON((response)=> {
			scheduleData = JSON.parse(response);
			console.log(scheduleData);
		});
		return scheduleData;		
	},

	get skillsData (){
		let skillsData;
		this.loadSkillsJSON((response)=> {
			skillsData = JSON.parse(response);
			console.log(skillsData);
		});		
		return skillsData;
	},
	
	get tutorData(){
		let tutorData;
		this.loadTutorJSON((response)=> {
			tutorData = JSON.parse(response);
			console.log(tutorData);
		});		
		return tutorData;
	},
}
export default JSONdata;
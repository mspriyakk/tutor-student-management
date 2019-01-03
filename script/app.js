function loadScheduleJSON(callback)  {
	var xobj = new XMLHttpRequest();
	xobj.open("GET", "data/schedule.json", true);
	xobj.onreadystatechange = function() {
		if(xobj.readyState === 4 && xobj.status === 200) {
			callback(xobj.responseText);			
		}
	};
	xobj.send(null);
}

function loadSkillsJSON(callback)  {
	var xobj = new XMLHttpRequest();
	xobj.open("GET", "data/skills.json", true);
	xobj.onreadystatechange = function() {
		if(xobj.readyState === 4 && xobj.status === 200) {
			callback(xobj.responseText);			
		}
	};
	xobj.send(null);
}

function loadTutorJSON(callback)  {
	var xobj = new XMLHttpRequest();
	xobj.open("GET", "data/tutor.json", true);
	xobj.onreadystatechange = function() {
		if(xobj.readyState === 4 && xobj.status === 200) {
			callback(xobj.responseText);			
		}
	};
	xobj.send(null);
}
(function init() {
	let scheduleData, skillsData, tutorData;

 loadScheduleJSON((response)=> {
 	scheduleData = JSON.parse(response);
 	console.log(scheduleData);
 });

  loadSkillsJSON((response)=> {
 	var skillsData = JSON.parse(response);
 	console.log(skillsData);
 });

  loadTutorJSON((response)=> {
 	var tutorData = JSON.parse(response);
 	console.log(tutorData);
 });

})();
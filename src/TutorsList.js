import React from "react";

function TutorsList(props) {
	return (<p>
		<img src={props.photo}
			alt={props.name}
			className="float-left" />
		</p>);
}

export default TutorsList;
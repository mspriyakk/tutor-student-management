import skills from "./skills";
import React from "react";

function Courses(props) {
    let courseNames = Object.keys(skills);

    const courses = courseNames.map((course) => {
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

export default Courses;
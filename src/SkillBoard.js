import skills from "./skills";
import React from "react";

function SkillBoard(props) {
    let tutorName = props.name;
    let tutorSkillCounter = props.value;
    const skillBoard = [];

    for (let s in skills) {
        if (skills[s].toString().includes(tutorName)) {
            skillBoard.push(<p key={s}>
                {s} ({tutorSkillCounter[s]})
              </p>);
        }
    }

    return (
        <aside className="skill-board">
            {skillBoard}
        </aside>
    );
}

export default SkillBoard;
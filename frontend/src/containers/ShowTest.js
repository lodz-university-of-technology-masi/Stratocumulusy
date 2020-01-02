import React from "react";
import "./SolveTest.css";
import { Button } from "react-bootstrap";
import {Link} from "react-router-dom";
import EditableQuestion from "./EditableQuestion";


function saveChanges(props) {
// console.log(props.location)
}

function ShowTest(props){
    //console.log(props.location);
    return (
        <div className="solvetest">
            <div>
                <Button><Link to={{pathname: '/customerMenager'}}>Cancel</Link></Button>
                <Button onClick={() => saveChanges(props)}><Link to={{pathname: '/customerMenager'}}>Save changes</Link></Button>
                <h1>Title: {props.location.ShowTestProps.testTitle}</h1>
            </div>
                {props.location.ShowTestProps.questions.map(c => <EditableQuestion id={c.questionID} question={c.question} questionType={c.questionType} choices={c.choices} correctAnswer={c.correctAnswer}/>)}
        </div>
    );
}

export default ShowTest;

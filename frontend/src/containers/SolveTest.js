import React, { Component } from "react";
import "./SolveTest.css";
import TestList from "./TestList"
import Test from "./Test"
import SolveQuestion from "./SolveQuestion";
import { Button } from "react-bootstrap";
import {Link} from "react-router-dom";



function SolveTest(props){
    
    return (
        <div className="solvetest">
            <div>
                <Button><Link to={{pathname: '/tests'}}>Back</Link></Button>
                <h1>Test title: {props.location.SolveTestProps.testTitle}</h1>
            </div>
                {props.location.SolveTestProps.questions.map(c => <SolveQuestion id={c.questionID} question={c.question} questionType={c.questionType} choices={c.choices} correctAnswer={c.correctAnswer}/>)}
               <button onClick={console.log("Siema")}>Save test</button>
            </div>

    );
}

export default SolveTest;



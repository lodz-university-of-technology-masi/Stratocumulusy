import React, { Component } from "react";
import "./SolveTest.css";
import TestList from "./TestList"
import Test from "./Test"
import SolveQuestion from "./SolveQuestion";




function SolveTest(props){
    return (
        <div className="solvetest">
            <div>
                <h1>Id: {props.location.SolveTestProps.testId}</h1>
            </div>
                {props.location.SolveTestProps.questions.map(c => <SolveQuestion id={c.id} question={c.question} questionType={c.questionType} choices={c.choices} correctAnswer={c.correctAnswer}/>)}
        </div>
    );

}

export default SolveTest;



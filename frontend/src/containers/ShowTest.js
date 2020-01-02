import React, { Component } from "react";
import "./SolveTest.css";
import TestList from "./TestList"
import Test from "./Test"
import { Button } from "react-bootstrap";
import {Link} from "react-router-dom";
import Question from "./Question";



function SolveTest(props){
    return (
        <div className="solvetest">
            <div>
                <Button><Link to={{pathname: '/customerMenager'}}>Back</Link></Button>
                <h1>Title: {props.location.SolveTestProps.testTitle}</h1>
            </div>
                {props.location.SolveTestProps.questions.map(c => <Question id={c.questionID} question={c.question} questionType={c.questionType} choices={c.choices} correctAnswer={c.correctAnswer}/>)}
        </div>
    );

}

export default SolveTest;



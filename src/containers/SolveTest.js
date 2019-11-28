import React, { Component } from "react";
import "./SolveTest.css";
import Question from "./Question";
import TestList from "./TestList"
import Test from "./Test"




function SolveTest(props){
    return (
        <div className="solvetest">
            <div>
                <h1>Title: {props.location.SolveTestProps.testTitle}</h1>
            </div>
                {props.location.SolveTestProps.questions.map(c => <Question id={c.id} questionTitle={c.questionTitle} questionContent={c.questionContent}/>)}
        </div>
    );

}

export default SolveTest;



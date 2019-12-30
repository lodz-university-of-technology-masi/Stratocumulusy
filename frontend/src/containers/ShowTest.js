import React, { Component } from "react";
import "./SolveTest.css";
import Question from "./Question";
import TestList from "./TestList"
import Test from "./Test"
import { Button } from "react-bootstrap";
import {Link} from "react-router-dom";



function SolveTest(props){
    return (
        <div className="solvetest">
            <div>
                <Button><Link to={{pathname: '/customerMenager'}}>Back</Link></Button>
                <h1>Title: {props.location.SolveTestProps.testTitle}</h1>
            </div>
                {props.location.SolveTestProps.questions.map(c => <Question id={c.id} questionTitle={c.questionTitle} questionContent={c.questionContent}/>)}
        </div>
    );

}

export default SolveTest;



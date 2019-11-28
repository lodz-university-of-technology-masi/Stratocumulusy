import React, { Component } from "react";
import "./Test.css";
import PropTypes from "prop-types";
import {Button} from "reactstrap"
import {Link} from "react-router-dom";



function Test(props){
    return (
    <div className="test">
         <div>
             <h1>{props.id}. Title: {props.testTitle}</h1>
             <h5>No. of questions:{props.numberOfQuestions}</h5>
             <h5>Added: {props.dateAdded}</h5>

             <Button color="success"><Link to={{
                 pathname: '/solvetest',
                 SolveTestProps:{
                     testTitle : props.testTitle,
                     numberOfQuestions: props.numberOfQuestions,
                     dateAdded: props.dateAdded,
                     questions: props.questions
                 }
             }}>Start</Link></Button>{}
        </div>
    </div>
    );

}

export default Test;



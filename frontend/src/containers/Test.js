import React, { Component } from "react";
import "./Test.css";
import PropTypes from "prop-types";
import {Button} from "reactstrap"
import {Link} from "react-router-dom";



function Test(props){
    return (
    <div className="test">
         <div>
             <h1>{props.id}. Title: {props.title}</h1>

             <Button color="success"><Link to={{
                 pathname: '/solvetest',
                 SolveTestProps:{
                     testId : props.testId,
                     testTitle : props.title,
                     questions: props.questions
                 }
             }}>Start</Link></Button>{}
        </div>
    </div>
    );
}

export default Test;



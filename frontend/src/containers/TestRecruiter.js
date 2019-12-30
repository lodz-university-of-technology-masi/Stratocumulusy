import React, { Component } from "react";
import "./Test.css";
import PropTypes from "prop-types";
import {Button} from "reactstrap"
import {Link} from "react-router-dom";


function deleteTest(key) {
    return (fetch('https://nbbmfshcof.execute-api.us-east-1.amazonaws.com/test/emptytest', {
        dataType: "json",
        method: 'DELETE',
        body: JSON.stringify({"date": key}),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
    }})
    )}


function TestRecruiter(props){
    return (
    <div className="test">
         <div>
             <h1>{props.id}. Title: {props.testTitle}</h1>
             <h5>No. of questions:{props.numberOfQuestions}</h5>
             <h5>Added: {props.dateAdded}</h5>

             <Button color="success"><Link to={{
                 pathname: '/showtest',
                 SolveTestProps:{
                     testTitle : props.testTitle,
                     numberOfQuestions: props.numberOfQuestions,
                     dateAdded: props.dateAdded,
                     questions: props.questions
                 }
             }}>Show</Link></Button>
             <Button color="success" onClick={() => deleteTest(props.dateAdded)}>Delete</Button>
        </div>
    </div>
    );
}

export default TestRecruiter;



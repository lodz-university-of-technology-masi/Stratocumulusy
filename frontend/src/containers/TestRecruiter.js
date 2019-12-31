import React, { Component } from "react";
import "./Test.css";
import PropTypes from "prop-types";
import {Button} from "reactstrap"
import {Link} from "react-router-dom";


function onClickFunction(key) {
    deleteTest(key);
    reloadPage();
}

function deleteTest(key) {
    return (fetch('https://nbbmfshcof.execute-api.us-east-1.amazonaws.com/test/emptytest', {
        dataType: "json",
        method: 'DELETE',
        body: JSON.stringify({"testId": key}),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
    }})
    )
}

function reloadPage() {
    window.location.reload();
}


function TestRecruiter(props){
    return (
    <div className="test">
         <div>
             <h1>{props.id}. Title: {props.testTitle}</h1>
             <h5>Number of questions: {props.numberOfQuestions}</h5>
             <h5>ID: {props.testId}</h5>

             <Button color="success"><Link to={{
                 pathname: '/showtest',
                 SolveTestProps:{
                     testTitle : props.testTitle,
                     numberOfQuestions: props.numberOfQuestions,
                     questions: props.questions
                 }
             }}>Show</Link></Button>
             <Button color="success" onClick={() => onClickFunction(props.testId)}>Delete</Button>
        </div>
    </div>
    );
}

export default TestRecruiter;



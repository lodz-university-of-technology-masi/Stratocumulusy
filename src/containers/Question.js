import React, { Component } from "react";
import "./Question.css";
import {Button} from "reactstrap"
import {Link} from "react-router-dom";



function Question(props){
    return (
        <div className="test">
            <div>
                <h1>Id:{props.id}. {props.questionTitle}</h1>
                <h5>{props.questionContent}</h5>
            </div>
        </div>
    );

}

export default Question;



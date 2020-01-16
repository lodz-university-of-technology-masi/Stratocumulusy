import React from "react";
import "./Test.css";
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
                     questions: props.questions,
                     currentUserEmail: props.currentUserEmail,
                     recruiterEmail: props.recruiterEmail
                 }
             }}>Start</Link></Button>{}
        </div>
    </div>
    );
}

export default Test;

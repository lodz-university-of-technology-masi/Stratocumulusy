import React from "react";
import "./Test.css";
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

             <Button color="success"><Link to={{
                 pathname: '/showtest',
                 ShowTestProps:{
                     testId : props.id,
                     questions: props.questions
                 }
             }}>Edit</Link></Button>
             <Button color="success" onClick={() => onClickFunction(props.testId)}>Delete</Button>
        </div>
    </div>
    );
}

export default TestRecruiter;



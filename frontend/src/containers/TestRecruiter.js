import React from "react";
import "./Test.css";
import {Button} from "reactstrap"
import {Link} from "react-router-dom";


function onClickFunction(key) {
    deleteTest(key);
    reloadPage();
}

function translateOnClick(test) {
    saveTestInDifferentLanguage(test);
   // reloadPage();
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

function saveTestInDifferentLanguage(props) {
    let testInDiffLanguage = JSON.parse(JSON.stringify(props));
    testInDiffLanguage["fromLang"] = props.testId.substring(props.testId.length - 2, props.testId.length);
    if (testInDiffLanguage.fromLang === "pl") {
        testInDiffLanguage["toLang"] = "en";
    } else {
        testInDiffLanguage["toLang"] = "pl";
    }
    let res = (fetch('https://nbbmfshcof.execute-api.us-east-1.amazonaws.com/test/translatetest', {
            dataType: "json",
            method: 'POST',
            body: JSON.stringify(testInDiffLanguage),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }}).finally(()=> reloadPage())
    )
    console.log(res);

}

function reloadPage() {
    window.location.reload();
}


function TestRecruiter(props){
    let testVar = JSON.parse(JSON.stringify(props));
    if (props.testId.length === 38) {
        if (testVar.testId.substring(testVar.testId.length - 2, testVar.testId.length) === "pl") {
            testVar.testTitle += "(pl)";
        }
        if (testVar.testId.substring(testVar.testId.length - 2, testVar.testId.length) === "en") {
            testVar.testTitle += "(eng)";
        }
    }
    return (
    <div className="test">
         <div>
             <h1>{props.id}. Title: {testVar.testTitle}</h1>

             <Button color="success"><Link to={{
                 pathname: '/edittest',
                 EditTestProps:{
                     testId : props.testId,
                     testTitle: props.testTitle,
                     questions: props.questions
                 }
             }}>Edit</Link></Button>
             <Button color="success" onClick={() => onClickFunction(props.testId)}>Delete</Button>
             <Button color="success" onClick={() => translateOnClick(props)}>Auto translate</Button>
        </div>
    </div>
    );
}

export default TestRecruiter;



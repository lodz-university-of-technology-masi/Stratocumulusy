import React from "react";
import "./Test.css";
import {Button} from "reactstrap"
import {Link} from "react-router-dom";



function CheckTest(props){
    return (
        <div className="test">
            <div>
                <h1>{props.id}. Title: {props.title}</h1>

                <Button color="success"><Link to={{
                    pathname: '/checkSelectedTest',
                    SolveTestProps:{
                        testId : props.testId,
                        testTitle : props.title,
                        questions: props.questions,
                        candidateEmail: props.candidateEmail
                    }
                }}>Check test</Link></Button>{}
            </div>
        </div>
    );
}

export default CheckTest;
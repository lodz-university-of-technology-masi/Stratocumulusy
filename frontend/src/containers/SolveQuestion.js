import React, { Component } from "react";
import "./Question.css";
import {Button} from "reactstrap"
import {Link} from "react-router-dom";


function SolveQuestion(props){


    if(props.questionType === '1'){
        return (
            <div className="test">
            <div>
                <h1>Id:{props.id}. {props.question}</h1>
            </div>
            <div>
                <form>
                    <input type="text" name="Anwser"/>
                </form>
            </div>
        </div>
        );
    }
    if(props.questionType === '2'){
        return (
            <div className="test">
            <div>
                <h1>Id:{props.id}. {props.question}</h1>
            </div>
            <div>
                <form>
                    <input type="checkbox" value={props.choices[0]} ></input>{props.choices[0]}<br/>
                    <input type="checkbox" value={props.choices[1]} ></input>{props.choices[1]}<br/>
                    <input type="checkbox" value={props.choices[2]} ></input>{props.choices[2]}<br/>
                    <input type="checkbox" value={props.choices[3]} ></input>{props.choices[3]}<br/>
                </form>
            </div>
        </div>
        );
    }
    if(props.questionType === '3'){
        return (
            <div className="test">
            <div>
                <h1>Id:{props.id}. {props.question}</h1>
            </div>
            <div>testTitle
                <form>
                    <input type="number" name="Anwser"/>
                </form>
            </div>
        </div>
        );
    }
    else{
        return (
            <div className="test">
            <div>
                <h1>Id:{props.questionID}. {props.question}</h1>
            </div>
            <div>
                <form>
                    <input type="number" name="Anwser"/>
                </form>
            </div>
        </div>
        );
    }
}

export default SolveQuestion;



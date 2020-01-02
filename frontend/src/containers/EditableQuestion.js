import React from "react";
import "./Question.css";


function EditableQuestion(props){
    if(props.questionType == '1'){
        return (
            <div className="test">
            <div>
                <h1>Id:{props.id}. <input defaultValue={props.question} /></h1>
            </div>
        </div>
        );
    }
    if(props.questionType == '2'){
        return (
            <div className="test">
            <div>
                <h1>Id:{props.id}. <input defaultValue={props.question} /></h1>
            </div>
            <div>
                <form>
                    <input type="checkbox" value={props.choices[0]} checked/><input defaultValue={props.choices[0]} /><br/>
                    <input type="checkbox" value={props.choices[1]} checked/><input defaultValue={props.choices[1]} /><br/>
                    <input type="checkbox" value={props.choices[2]} checked/><input defaultValue={props.choices[2]} /><br/>
                    <input type="checkbox" value={props.choices[3]} checked/><input defaultValue={props.choices[3]} /><br/>
                </form>
            </div>
            <div>
                <h5>Anwser: <input defaultValue={props.correctAnswer} /></h5>
            </div>
        </div>
        );
    }
    if(props.questionType == '3'){
        return (
            <div className="test">
            <div>
                <h1>Id:{props.id}. <input defaultValue={props.question} /></h1>
            </div>
            <div>
                <h5>Anwser: <input defaultValue={props.correctAnswer}  onChange={() => {props.correctAnswer="XD"}, () => {console.log(props.correctAnswer)}}/></h5>
            </div>
        </div>
        );
    }
}

export default EditableQuestion;
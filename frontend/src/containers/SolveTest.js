import React, {Component} from "react";
import "./SolveTest.css";
import TestList from "./TestList"
import Test from "./Test"
import SolveQuestion from "./SolveQuestion";
import { Button } from "react-bootstrap";
import {Link} from "react-router-dom";
import { ThemeConsumer } from "styled-components";

class SolveTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions : props.location.SolveTestProps.questions
        }
        this.saveTestToDynamoDB = this.saveTestToDynamoDB.bind(this);
    }

    saveTestToDynamoDB(event) {
        const questions = [];
        console.log(this.props.location.SolveTestProps.questions[0].currentCandidatesAnswer);
        for (let i = 0; i < this.state.questions.length; i++) {
            if(this.state.questions[i].questionType==1){ //open
                questions.push({
                    QuestionID: this.state.questions[i].questionID,
                    questionType: this.state.questions[i].questionType,
                    question: this.state.questions[i].question,
                    currentCandidatesAnswer: this.state.questions[i].currentCandidatesAnswer
                })
            }
            if(this.state.questions[i].questionID==2){
                const choices = this.state.questions[i].choices;
                questions.push({ // multiple
                    QuestionID: this.state.questions[i].questionID,
                    questionType: this.state.questions[i].questionType,
                    question: this.state.questions[i].question,
                    currentCandidatesAnswer: this.state.questions[i].currentCandidatesAnswer,
                    choices: choices,
                    correctAnswer: this.state.questions[i].correctAnswer,
                })
            }
            if(this.state.questions[i].questionType==3){
                questions.push({ //number
                    QuestionID: this.state.questions[i].questionID,
                    questionType: this.state.questions[i].questionType,
                    question: this.state.questions[i].question,
                    currentCandidatesAnswer: this.state.questions[i].currentCandidatesAnswer,
                    correctAnswer: this.state.questions[i].correctAnswer,
                })
            }

        }


        //console.log("questions "+questions.toSource());
        function uuidv4() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
        const testId =  uuidv4();

        const test = {
            "testTitle": this.props.location.SolveTestProps.testTitle,
            "testId": testId,
            "questions": questions,
        };
        console.log(test);

        const response = fetch(' https://nbbmfshcof.execute-api.us-east-1.amazonaws.com/test/solvedtest', {
            dataType: "json",
            method: 'POST',
            body: JSON.stringify(test),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        return false;
    }

    
    render() {
        let listItems = this.state.questions.map((d,index) => {
            if(d.questionType == '1'){
                return (
                    <div className="test">
                    <div>
                        <h1>Id:{d.questionID}. {d.question}</h1>
                    </div>
                    <div>
                        <form>
                        <textarea id="question" rows="5" cols="100" value={d.currentCandidatesAnswer}
                                      />
                        </form>
                    </div>
                </div>
                );
            }
            if(d.questionType == '2'){
                return (
                    <div className="test">
                    <div>
                        <h1>Id:{d.questionID}. {d.question}</h1>
                    </div>
                    <div>
                        <form>
                            <input type="checkbox" value={d.choices[0]} onSelect={this.state.questions[index].currentCandidatesAnswer=d.choices[0]} ></input>{d.choices[0]}<br/>
                            <input type="checkbox" value={d.choices[1]} onSelect={this.state.questions[index].currentCandidatesAnswer=d.choices[1]}></input>{d.choices[1]}<br/>
                            <input type="checkbox" value={d.choices[2]} onSelect={this.state.questions[index].currentCandidatesAnswer=d.choices[2]}></input>{d.choices[2]}<br/>
                            <input type="checkbox" value={d.choices[3]} onSelect={this.state.questions[index].currentCandidatesAnswer=d.choices[3]}></input>{d.choices[3]}<br/>
                        </form>
                    </div>
                </div>
                );
            }
            if(d.questionType == '3'){
                return (
                    <div className="test">
                    <div>
                        <h1>Id:{d.questionID}. {d.question}</h1>
                    </div>
                    <div>
                        <form>
                            <input type="number" name="Anwser"></input>
                        </form>
                    </div>
                </div>
                );
            }

        });

        return (
            
            <div className="AddTest">
                <div className="lander">

                    <div>
                        <label>Test Title</label>
                        <output id="testTitle" type="text" value={this.props.location.SolveTestProps.testTitle}/>
                        <button onClick={this.saveTestToDynamoDB.bind(this)}>Save test</button>
                        <br/><br/>
                        <label>Number of question: {this.props.location.SolveTestProps.questions.length}</label>
                        <br/><br/>
                    </div>
                </div>
                {listItems}     
            </div>


        );
    }
}

export default SolveTest;

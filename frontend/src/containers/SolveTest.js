import React, {Component} from "react";
import "./SolveTest.css";
import {Button} from "react-bootstrap";
import notifier from "simple-react-notifications";

class SolveTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: props.location.SolveTestProps.questions,
            answersFromView: [],
            answers: [],
            currentUserEmail: props.location.SolveTestProps.currentUserEmail,
            recruiterEmail: props.location.SolveTestProps.recruiterEmail
        }
        // console.log("props.location.SolveTestProps.questions.length " + props.location.SolveTestProps.questions.length)
        for (let i = 0; i < props.location.SolveTestProps.questions.length; i++) {
            this.state.answersFromView.push('');
        }
        // console.log("this.state.answersFromView in constructoe " + this.state.answersFromView)
        this.saveOpen = this.saveOpen.bind(this);
        this.updateAnswer = this.updateAnswer.bind(this);
        this.saveTestToDynamoDB = this.saveTestToDynamoDB.bind(this);
        this.saveMulti = this.saveMulti.bind(this);
        this.saveNumber = this.saveNumber.bind(this);
    }

    updateAnswer = (event) => {
        let numberOfQuestion = event.target.getAttribute('numberOfQuestion');
        const answersFromView = this.state.answersFromView.slice();
        answersFromView[numberOfQuestion] = event.target.value;
        // console.log("answersFromView " + answersFromView)
        this.setState({
            answersFromView: answersFromView
        })
    }


    saveOpen = (event) => {
        const answers = this.state.answers.slice();
        const questionID = event.target.getAttribute("questionID");
        const open = this.state.answersFromView[questionID];
        let ifExists = false;
        for (let i = 0; i < answers.length; i++) {
            if (answers[i].questionID == event.target.getAttribute("questionID")) {
                answers[i].candidatesAnwser = open;
                ifExists = true;
            }
        }
        if (ifExists == false) {
            answers.push({
                questionID: event.target.getAttribute("questionID"),
                candidatesAnwser: open
            });
        }
        this.setState({
            openQuestion: "",
            answers: answers
        })

    }


    saveMulti = (event) => {
        const answers = this.state.answers.slice();
        const questionID = event.target.getAttribute("questionID");
        const multiple = this.state.answersFromView[questionID];
        // console.log(" multi " + multiple);
        let ifExists = false;
        for (let i = 0; i < answers.length; i++) {
            if (answers[i].questionID == event.target.getAttribute("questionID")) {
                answers[i].candidatesAnwser = multiple;
                ifExists = true;
            }
        }
        if (ifExists == false) {
            answers.push({
                questionID: event.target.getAttribute("questionID"),
                candidatesAnwser: multiple
            });
        }

        this.setState({
            multipeQuestion: "",
            answers: answers
        })

    }
    saveNumber = (event) => {
        const answers = this.state.answers.slice();
        const questionID = event.target.getAttribute("questionID");
        const number = this.state.answersFromView[questionID];
        let ifExists = false;
        for (let i = 0; i < answers.length; i++) {
            if (answers[i].questionID == event.target.getAttribute("questionID")) {
                answers[i].candidatesAnwser = number;
                ifExists = true;
            }
        }
        if (ifExists == false) {
            answers.push({
                questionID: event.target.getAttribute("questionID"),
                candidatesAnwser: number
            });
        }
        this.setState({
            numberQuestion: "",
            answers: answers
        })

    }

    saveTestToDynamoDB(event) {
        notifier.success("Test was successfully solved.");
        let questionsToDb = [];
        let questions = this.state.questions.slice();
        let answersFromView = this.state.answersFromView.slice();

        // console.log("this.state.answers"+ answersFromView.toSource());
        for (let i = 0; i < questions.length; i++) {
            let myAnswer = answersFromView[i];
            // console.log("i= "+i+"   myAnswer "+myAnswer);
            if (questions[i].questionType == 1) { //open
                questionsToDb.push({
                    QuestionID: questions[i].questionID,
                    questionType: questions[i].questionType,
                    question: questions[i].question,
                    candidatesAnwser: myAnswer
                })
            }
            if (questions[i].questionType == 2) {
                const choices = questions[i].choices;

                questionsToDb.push({ // multiple
                    QuestionID: questions[i].questionID,
                    questionType: questions[i].questionType,
                    question: questions[i].question,
                    candidatesAnwser: myAnswer,
                    choices: choices,
                    correctAnswer: questions[i].correctAnswer,
                })
            }
            if (questions[i].questionType == 3) {
                questionsToDb.push({ //number
                    QuestionID: questions[i].questionID,
                    questionType: questions[i].questionType,
                    question: questions[i].question,
                    candidatesAnwser: myAnswer,
                    correctAnswer: questions[i].correctAnswer,
                })
            }

        }


        //console.log("questions "+questions.toSource());
        function uuidv4() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }

        const testId = uuidv4();
        const currentUserEmail = this.state.currentUserEmail;
        // console.log("currentUserEmail "+currentUserEmail);
        const test = {
            "testTitle": this.props.location.SolveTestProps.testTitle,
            "testId": testId,
            "questions": questionsToDb,
            "candidateEmail": currentUserEmail,
            "points": "-",
            "recruiterEmail": this.state.recruiterEmail
        };
        // console.log(test);

        const response = fetch('https://nbbmfshcof.execute-api.us-east-1.amazonaws.com/test/solvedtest', {
            dataType: "json",
            method: 'POST',
            body: JSON.stringify(test),
            headers: {
                "Content-type": "application/json;"
            }
        })
            //.finally(() =>  window.location.replace("/tests"));;
        return false;
    }


    render() {
        const openQuestion = this.state.openQuestion;
        const multipeQuestion = this.state.multipeQuestion;
        const numberQuestion = this.state.numberQuestion;

        const answersFromView = this.state.answersFromView;
        // console.log("answersFromView " + answersFromView);
        let listItems = this.state.questions.map((d, index) => {
            if (d.questionType == '1') {
                return (
                    <div className="test">
                        <div>
                            <h1>Id:{d.questionID}. {d.question}</h1>
                        </div>
                        <div>
                            <form>
                        <textarea id="question" rows="5" cols="100" value={answersFromView[index]}
                                  onChange={this.updateAnswer} numberOfQuestion={index}/>
                                <Button variant="outline-primary" onClick={this.saveOpen} questionID={d.questionID}>Save
                                    your answer</Button>
                            </form>
                        </div>
                    </div>
                );
            }
            if (d.questionType == '2') {
                return (
                    <div className="test">
                        <div>
                            <h1>Id:{d.questionID}. {d.question}</h1>
                        </div>
                        <div>
                            <form>
                                <input type="checkbox" value={d.choices[0]} checked={this.state.check}
                                       onClick={this.updateAnswer} numberOfQuestion={index}></input>{d.choices[0]}<br/>
                                <input type="checkbox" value={d.choices[1]} checked={this.state.check}
                                       onClick={this.updateAnswer} numberOfQuestion={index}></input>{d.choices[1]}<br/>
                                <input type="checkbox" value={d.choices[2]} checked={this.state.check}
                                       onClick={this.updateAnswer} numberOfQuestion={index}></input>{d.choices[2]}<br/>
                                <input type="checkbox" value={d.choices[3]} checked={this.state.check}
                                       onClick={this.updateAnswer} numberOfQuestion={index}></input>{d.choices[3]}<br/>
                                <Button variant="outline-primary" onClick={this.saveMulti} questionID={d.questionID}>Save
                                    your answer</Button>
                            </form>
                        </div>
                    </div>
                );
            }
            if (d.questionType == '3') {
                return (
                    <div className="test">
                        <div>
                            <h1>Id:{d.questionID}. {d.question}</h1>
                        </div>
                        <div>
                            <form>
                                <input type="number" value={answersFromView[index]} onChange={this.updateAnswer}
                                       numberOfQuestion={index}></input>
                                <Button variant="outline-primary" onClick={this.saveNumber} questionID={d.questionID}>Save
                                    your answer</Button>
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

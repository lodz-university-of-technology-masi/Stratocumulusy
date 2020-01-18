import React, {Component} from "react";
import "./SolveTest.css";
import {Button} from "reactstrap";
import {Link} from "react-router-dom";
import notifier from "simple-react-notifications";
import "simple-react-notifications/dist/index.css";


function reloadPage() {
    window.location.reload();
}

class EditTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentQuestionNumber: 0,
            test: props.location.EditTestProps,
        };


        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleQuestionContent = this.handleQuestionContent.bind(this);

        this.previousQuestion = this.previousQuestion.bind(this);
        this.nextQuestion = this.nextQuestion.bind(this);

        this.saveTestToDynamoDB = this.saveTestToDynamoDB.bind(this);
    }

    handleTitleChange = (event) => {
        const newTitle = {...this.state.test, testTitle: event.target.value}
        this.setState({
            test: newTitle
        })
    }

    handleQuestionContent = (event) => {
        const newQuestion = Object.assign({}, this.state.test);
        newQuestion.questions[this.state.currentQuestionNumber].question = event.target.value;
        this.setState({
            test: newQuestion
        })
    }

    handleQuestionType = (event) => {
        const newType = Object.assign({}, this.state.test);
        newType.questions[this.state.currentQuestionNumber].questionType = event.target.value;
        this.setState({
            test: newType
        })
    }

    handleCurrentAnswer1 = (event)  => {
        const newAnswer = Object.assign({}, this.state.test);
        newAnswer.questions[this.state.currentQuestionNumber].choices[0] = event.target.value;
        this.setState({
            test: newAnswer
        })
    }

    handleCurrentAnswer2 = (event)  => {
        const newAnswer = Object.assign({}, this.state.test);
        newAnswer.questions[this.state.currentQuestionNumber].choices[1] = event.target.value;
        this.setState({
            test: newAnswer
        })
    }

    handleCurrentAnswer3 = (event)  => {
        const newAnswer = Object.assign({}, this.state.test);
        newAnswer.questions[this.state.currentQuestionNumber].choices[2] = event.target.value;
        this.setState({
            test: newAnswer
        })
    }

    handleCurrentAnswer4 = (event)  => {
        const newAnswer = Object.assign({}, this.state.test);
        newAnswer.questions[this.state.currentQuestionNumber].choices[3] = event.target.value;
        this.setState({
            test: newAnswer
        })
    }

    handleCurrentGoodAnswer = (event)  => {
        const newAnswer = Object.assign({}, this.state.test);
        newAnswer.questions[this.state.currentQuestionNumber].correctAnswer = event.target.value;
        this.setState({
            test: newAnswer
        })
    }

    handleDeleteQuestion = (event) => {
        const newTest = Object.assign({}, this.state.test);
        newTest.questions.splice(this.state.currentQuestionNumber, 1);
        this.previousQuestion();
        this.setState({
            test: newTest
        })
    }

    handleAddQuestion = (event) => {
        const newTest = Object.assign({}, this.state.test);
        newTest.questions.push({
            question: '',
            questionType: 1,
            correctAnswer: '',
            choices: [],
        });

        var currentQuestionNumber = this.state.test.questions.length - 1;
            this.setState({
                currentQuestionNumber: currentQuestionNumber
            });
    }

    previousQuestion(event) {
        if (this.state.currentQuestionNumber > 0) {
            var currentQuestionNumber = this.state.currentQuestionNumber - 1;
            this.setState({
                currentQuestionNumber: currentQuestionNumber
            });
        }
    }

    nextQuestion(event) {
        if (this.state.currentQuestionNumber < this.state.test.questions.length - 1) {
            var currentQuestionNumber = this.state.currentQuestionNumber + 1;
            this.setState({
                currentQuestionNumber: currentQuestionNumber
            });
        }
    }


    saveTestToDynamoDB(event) {
        notifier.success("Test was successfully saved.");
        const test = {
            "testId": this.state.test.testId,
            "testTitle": this.state.test.testTitle,
            "questions": this.state.test.questions,
            "recruiterEmail": this.state.test.recruiterEmail,
        };

        const response = fetch('https://nbbmfshcof.execute-api.us-east-1.amazonaws.com/test/emptytest', {
            dataType: "json",
            method: 'POST',
            body: JSON.stringify(test),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).finally(() => reloadPage());

        return false;
    }

    render() {
        return (
                <div className="lander">
                    <div>
                        <Button><Link to={{
                            pathname: '/customerMenager'}}>Back</Link></Button>
                            <br/><br/>
                        <label>Test title</label>
                        <input id="testTitle" type="text" defaultValue={this.state.test.testTitle} onChange={this.handleTitleChange}/>
                        <br/><br/>
                        <label>Number of question: {this.state.test.questions.length}</label>
                        <br/><br/>
                        <label>Current question: {this.state.currentQuestionNumber + 1}</label>
                        <button onClick={this.previousQuestion}>Previous question</button>
                        <button onClick={this.nextQuestion}>Next question</button>
                        <br/><br/>
                    </div>
                    <div>
                        <label>Choose question type</label>
                        <select value={this.state.test.questions[this.state.currentQuestionNumber].questionType} onChange={this.handleQuestionType}>
                            <option value='1'>Open</option>
                            <option value='2'>Multiple choice</option>
                            <option value='3'>Number</option>
                        </select>
                        <>

                            <br/>
                            < label> Content of the question</label>
                            <br/>
                            <textarea id="question" rows="5" cols="100" defaultValue={""} value={this.state.test.questions[this.state.currentQuestionNumber].question}
                                      onChange={this.handleQuestionContent}/>
                            <br/><br/>

                            <br/>
                            {this.state.test.questions[this.state.currentQuestionNumber].questionType == 2 ?
                                <>
                                    <label>1st answer</label>
                                    <br/>
                                    <input type="text" name="1answer" defaultValue={""} value={this.state.test.questions[this.state.currentQuestionNumber].choices[0]}
                                           onChange={this.handleCurrentAnswer1}/>
                                    <br/><br/>
                                    <label>2nd answer</label>
                                    <br/>
                                    <input type="text" name="2answer" defaultValue={""} value={this.state.test.questions[this.state.currentQuestionNumber].choices[1]}
                                           onChange={this.handleCurrentAnswer2}/>
                                    <br/><br/>
                                    <label>3rd answer</label>
                                    <br/>
                                    <input type="text" name="3answer" defaultValue={""} value={this.state.test.questions[this.state.currentQuestionNumber].choices[2]}
                                           onChange={this.handleCurrentAnswer3}/>
                                    <br/><br/>
                                    <label>4th answer</label>
                                    <br/>
                                    <input type="text" name="4answer" defaultValue={""} value={this.state.test.questions[this.state.currentQuestionNumber].choices[3]}
                                           onChange={this.handleCurrentAnswer4}/>
                                    <br/><br/>
                                    <label>Good answer</label>
                                    <br/>
                                    <input type="text" name="4answer" defaultValue={""} value={this.state.test.questions[this.state.currentQuestionNumber].correctAnswer}
                                           onChange={this.handleCurrentGoodAnswer}/>
                                </> : null
                            }
                            {this.state.test.questions[this.state.currentQuestionNumber].questionType == 3 ?
                                <>
                                    <label>Number answer</label>
                                    <br/>
                                    <input type="text" name="1answer" defaultValue={""} value={this.state.test.questions[this.state.currentQuestionNumber].correctAnswer}
                                           onChange={this.handleCurrentGoodAnswer}/>
                                    <br/><br/>
                                </> : null
                            }
                            <br/><br/>
                            <Button onClick={this.handleDeleteQuestion}>Delete this question</Button>
                            <Button onClick={this.handleAddQuestion}>Add new question</Button>
                            <br/><br/>
                            <Button onClick={this.saveTestToDynamoDB}><Link to={{
                            pathname: '/customerMenager'}}>Save test</Link></Button>
                        </>

                    </div>
                </div>


        );
    }
}


export default EditTest;

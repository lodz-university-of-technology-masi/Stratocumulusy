import React, {Component} from "react";
import "./SolveTest.css";
import CSVReader from "react-csv-reader";


class ShowTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentQuestionNumber: 0,
            test: props.location.ShowTestProps
        };

        //console.log(props.location.ShowTestProps);
        console.log(this.state);

        this.handleTitleChange = this.handleTitleChange.bind(this);

        this.previousQuestion = this.previousQuestion.bind(this);
        this.nextQuestion = this.nextQuestion.bind(this);

        this.saveOpenQuestion = this.saveOpenQuestion.bind(this);
        this.saveTestToDynamoDB = this.saveTestToDynamoDB.bind(this);
    }

    handleTitleChange = (event) => {
        const newTitle = {...this.state.test, testTitle: event.target.value}
        this.setState({
            test: newTitle
        })
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

    saveOpenQuestion = (event) => {
        var currentQuestionNumber = this.state.currentQuestionNumber + 1;
        var numberOfQuestions = this.state.numberOfQuestions + 1
        console.log("currentQuestionNumber: " + this.state.currentQuestionNumber);

        const questionsTypes = this.state.questionsTypes.slice();
        questionsTypes[currentQuestionNumber - 1] = this.state.currentQuestionType;


        const questions = this.state.questions.slice();
        console.log("przed questions: " + questions);
        questions[this.state.currentQuestionNumber - 1] = this.state.currentQuestion;
        console.log("po questions: " + questions);


        const answers1 = this.state.answers1.slice();
        answers1[currentQuestionNumber - 1] = this.state.currentanswer1;

        const answers2 = this.state.answers2.slice();
        answers2[currentQuestionNumber - 1] = this.state.currentanswer2;

        const answers3 = this.state.answers3.slice();
        answers3[currentQuestionNumber - 1] = this.state.currentanswer3;

        const answers4 = this.state.answers4.slice();
        answers4[currentQuestionNumber - 1] = this.state.currentanswer4;

        const goodAnswers = this.state.goodAnswers.slice();
        goodAnswers[currentQuestionNumber - 1] = this.state.currentgoodAnswer;
    };



    saveTestToDynamoDB(event) {
        const test = {
            "testId": this.state.test.testId,
            "testTitle": this.state.test.testTitle,
            "questions": this.state.test.questions
        };
        // console.log("test "+test.toSource());

        const response = fetch('https://nbbmfshcof.execute-api.us-east-1.amazonaws.com/test/emptytest', {
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
        return (
            <div className="AddTest">
                <div className="lander">

                    <div>
                        <label>Test title</label>
                        <input id="testTitle" type="text" defaultValue={this.state.test.testTitle} onChange={this.handleTitleChange}/>
                        <button onClick={this.saveTestToDynamoDB}>Save test</button>
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
                            <textarea id="question" rows="5" cols="100" defaultValue={this.state.test.questions[this.state.currentQuestionNumber].question}
                                      onChange={this.handleCurrentQuestion}/>
                            <br/><br/>

                            <br/>
                            {this.state.test.questions[this.state.currentQuestionNumber].questionType == 2 ?
                                <>
                                    <label>1st answer</label>
                                    <br/>
                                    <input type="text" name="1answer" defaultValue={this.state.test.questions[this.state.currentQuestionNumber].answers1}
                                           onChange={this.handleCurrentAnswer1}/>
                                    <br/><br/>
                                    <label>2nd answer</label>
                                    <br/>
                                    <input type="text" name="2answer" defaultValue={this.state.test.questions[this.state.currentQuestionNumber].answers2}
                                           onChange={this.handleCurrentAnswer2}/>
                                    <br/><br/>
                                    <label>3rd answer</label>
                                    <br/>
                                    <input type="text" name="3answer" defaultValue={this.state.test.questions[this.state.currentQuestionNumber].answers3}
                                           onChange={this.handleCurrentAnswer3}/>
                                    <br/><br/>
                                    <label>4th answer</label>
                                    <br/>
                                    <input type="text" name="4answer" defaultValue={this.state.test.questions[this.state.currentQuestionNumber].answers4}
                                           onChange={this.handleCurrentAnswer4}/>
                                    <br/><br/>
                                    <label>Good answer</label>
                                    <br/>
                                    <input type="text" name="4answer" defaultValue={this.state.test.questions[this.state.currentQuestionNumber].goodAnswers}
                                           onChange={this.handleCurrentGoodAnswer}/>
                                </> : null
                            }
                            {this.state.test.questions[this.state.currentQuestionNumber].questionType == 3 ?
                                <>
                                    <label>Number answer</label>
                                    <br/>
                                    <input type="text" name="1answer" defaultValue={this.state.test.questions[this.state.currentQuestionNumber].goodAnswers}
                                           onChange={this.handleCurrentGoodAnswer}/>
                                    <br/><br/>
                                </> : null
                            }

                            <br/><br/>
                            <button onClick={this.saveOpenQuestion}>Save question</button>
                        </>

                    </div>
                </div>
            </div>


        );
    }
}


export default ShowTest;

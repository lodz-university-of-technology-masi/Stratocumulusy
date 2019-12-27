import React, { Component } from "react";
import "./Recruiter.css";




class Recruiter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            testTittle: '',
            numberOfQuestions: 0,
            currentQuestionNumber: 0,
            questionsTypes: [{
                questionType: 1,
            }],
            questions: [{
                question: '',
            }],
            answers1: [{
                answer1: '',
            }],
            answers2: [{
                answer2: '',
            }],
            answers3: [{
                answer3: '',
            }],
            answers4: [{
                answer4: '',
            }],
            goodAnswers: [{
                goodAnswer: '',
            }],


            currentquestionType: '',
            currentQuestion: '',
            currentanswer1: '',
            currentanswer2: '',
            currentanswer3: '',
            currentanswer4: '',
            currentgoodAnswer: '',


        };

        this.handleQuestionType=this.handleQuestionType.bind(this);
        this.handleCurrentQuestion=this.handleCurrentQuestion.bind(this);
        this.handleTestTittleChange=this.handleTestTittleChange.bind(this);
        this.saveOpenQuestion=this.saveOpenQuestion.bind(this);
        this.previousQuestion=this.previousQuestion.bind(this);
        this.nextQuestion=this.nextQuestion.bind(this);
        this.saveTestToDynamoDB=this.saveTestToDynamoDB.bind(this);

    }
    handleTestTittleChange = (event) => {
        this.setState({
            testTittle: document.getElementById("testTitle").value
        })
    };

    handleQuestionType = (event)=> {
        this.setState({
            currentquestionType: event.target.value,
        })
    };

    handleCurrentQuestion = (event) => {
        this.setState({
            currentQuestion: event.target.value,
        })
    };



    handleCurrentGoodAnswer = (event) => {
        this.setState({
            currentgoodAnswer:  event.target.value,
        })
    };

    handleCurrentAnswer1 = (event) => {
        this.setState({
            currentanswer1: event.target.value,
        })
    };
    handleCurrentAnswer2 = (event) => {
        this.setState({
            currentanswer2: event.target.value,
        })
    };
    handleCurrentAnswer3 = (event) => {
        this.setState({
            currentanswer3: event.target.value,
        })
    };
    handleCurrentAnswer4 = (event) => {
        this.setState({
            currentanswer4: event.target.value,
        })
    };

    saveOpenQuestion = (event) => {
        var currentQuestionNumber = this.state.currentQuestionNumber+1;
        var numberOfQuestions = this.state.numberOfQuestions+1
        console.log("currentQuestionNumber: " + currentQuestionNumber);

        const questionsTypes = this.state.questionsTypes.slice();
        questionsTypes[currentQuestionNumber-1] = this.state.currentquestionType;


        const questions = this.state.questions.slice();
        console.log("przed questions: " + questions);
        questions[currentQuestionNumber-1] = this.state.currentQuestion;
        console.log("po questions: " + questions);


        const answers1 = this.state.answers1.slice();
        answers1[currentQuestionNumber-1] = this.state.currentanswer1;

        const answers2 = this.state.answers2.slice();
        answers2[currentQuestionNumber-1] = this.state.currentanswers2;

        const answers3 = this.state.answers3.slice();
        answers3[currentQuestionNumber-1] = this.state.currentanswers3;

        const answers4 = this.state.answers4.slice();
        answers4[currentQuestionNumber-1] = this.state.currentanswers4;

        const goodAnswers = this.state.goodAnswers.slice();
        goodAnswers[currentQuestionNumber-1] = this.state.currentgoodAnswer;

        this.setState({
            currentQuestionNumber: currentQuestionNumber,
            numberOfQuestions: numberOfQuestions,
            questionsTypes: questionsTypes,
            questions: questions,
            answers1: answers1,
            answers2: answers2,
            answers3: answers3,
            answers4: answers4,
            goodAnswers: goodAnswers,

            currentquestionType: '',
            currentQuestion: '',
            currentanswer1: '',
            currentanswer2: '',
            currentanswer3: '',
            currentanswer4: '',
            currentgoodAnswer: '',
        });
    }
    previousQuestion (event) {
        if(this.state.currentQuestionNumber>0) {
            const currentQuestionNumber = this.state.currentQuestionNumber - 1;
            this.setState({
                currentQuestionNumber: currentQuestionNumber,

                currentquestionType: this.state.questionsTypes[currentQuestionNumber],
                currentQuestion: this.state.questions[currentQuestionNumber],
                currentanswer1: this.state.answers1[currentQuestionNumber],
                currentanswer2: this.state.answers2[currentQuestionNumber],
                currentanswer3: this.state.answers3[currentQuestionNumber],
                currentanswer4: this.state.answers4[currentQuestionNumber],
                currentgoodAnswer: this.state.goodAnswers[currentQuestionNumber],
            });
        }
    }
    nextQuestion (event) {
        if(this.state.currentQuestionNumber<this.state.numberOfQuestions) {
            var currentQuestionNumber = this.state.currentQuestionNumber + 1;
            this.setState({
                currentQuestionNumber: currentQuestionNumber,

                currentquestionType: this.state.questionsTypes[currentQuestionNumber],
                currentQuestion: this.state.questions[currentQuestionNumber],
                currentanswer1: this.state.answers1[currentQuestionNumber],
                currentanswer2: this.state.answers2[currentQuestionNumber],
                currentanswer3: this.state.answers3[currentQuestionNumber],
                currentanswer4: this.state.answers4[currentQuestionNumber],
                currentgoodAnswer: this.state.goodAnswers[currentQuestionNumber],
            });
        }
    }

    saveTestToDynamoDB (event) {
        // const questions = globalQuestions.map((val, ind) => {
        //     return {"id": ind, "questionTitle": val, "questionContent": "----", "questionType": this.state.questionType}
        // })


        const test = {
            "testTittle": this.state.testTittle,
            "numberOfQuestions": this.state.numberOfQuestions,
            // "questions": questions
        }


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
        const currentQuestionNumber= this.state.currentQuestionNumber;

        const currentquestionType= this.state.currentquestionType;
        const currentQuestion= this.state.currentQuestion;
        const currentanswer1= this.state.currentanswer1;
        const currentanswer2= this.state.currentanswer2;
        const currentanswer3= this.state.currentanswer3;
        const currentanswer4= this.state.currentanswer4;
        const currentgoodAnswer= this.state.currentgoodAnswer;


        console.log("czy rendenruje this.state.questions  " + this.state.questions);

        // console.log("czy typeog currentQuestion  " + typeof currentQuestion);
        // console.log("czy rendenruje currentQuestion  " + currentQuestion);
        // console.log("czy rendenruje currentQuestion.question  " + currentQuestion);
        return (
            <div className="Recruiter">
                <div className="lander">

                    <div>
                        <label>Enter the test title</label>
                        <input id="testTitle" type="text" value={this.state.testTittle} onChange={this.handleTestTittleChange}/>
                        <button onClick={this.saveTestToDynamoDB}>Save test</button>
                        <br /><br />
                        <label>Number of question: {this.state.numberOfQuestions}</label>
                        <br /><br />
                        <label>Current question: {this.state.currentQuestionNumber}</label>
                        <button onClick={this.previousQuestion}>Previous question</button>
                        <button onClick={this.nextQuestion}>Next question</button>
                        <br /><br />
                    </div>
                    <div>
                        <label>Choose question type</label>
                        <select value={currentquestionType} onChange={this.handleQuestionType}>
                            <option value="1">Open</option>
                            <option value="2">Number</option>
                            <option value="3">Multiple choice</option>
                        </select>
                        <>

                                <br />
                                < label > Enter content of the question</label>
                                <br />
                                <textarea id="question" rows="5" cols="100" value={ currentQuestion }
                                     onChange={this.handleCurrentQuestion}/>
                                <br /><br />

                        <br />
                        {currentquestionType == 2 ?
                            <>
                                <label>Enter number answer</label>
                                <br/>
                                <input type="text" name="1answer"  value={currentgoodAnswer} onChange={this.handleCurrentGoodAnswer}/>
                                <br/><br/>
                            </> : null
                        }
                            {currentquestionType==3 ?
                                <>
                                    <label>Enter 1st answer</label>
                                    <br/>
                                    <input type="text" name="1answer" value={currentanswer1} onChange={this.handleCurrentAnswer1}/>
                                    <br/><br/>
                                    <label>Enter 2nd answer</label>
                                    <br/>
                                    <input type="text" name="2answer" value={currentanswer2} onChange={this.handleCurrentAnswer2}/>
                                    <br/><br/>
                                    <label>Enter 3rd answer</label>
                                    <br/>
                                    <input type="text" name="3answer" value={currentanswer3} onChange={this.handleCurrentAnswer3}/>
                                    <br/><br/>
                                    <label>Enter 4th answer</label>
                                    <br/>
                                    <input type="text" name="4answer" value={currentanswer4} onChange={this.handleCurrentAnswer4}/>
                                    <br/><br/>
                                    <label>Enter good answer</label>
                                    <br/>
                                    <input type="text" name="4answer" value={currentgoodAnswer} onChange={this.handleCurrentGoodAnswer}/>
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



export default Recruiter;

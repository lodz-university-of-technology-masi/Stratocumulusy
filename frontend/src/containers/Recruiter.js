import React, { Component } from "react";
import "./Recruiter.css";


let globalQuestions = [];

class Recruiter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            testTittle: '',
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

            numberOfQuestions: 0,
            currentQuestionNumber: 0,
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
        const questionsTypes = this.state.questionsTypes.slice();
        const currentQuestionNumber = this.state.currentQuestionNumber;
        questionsTypes[currentQuestionNumber] = event.target.value;
        this.setState({
            questionsTypes: questionsTypes
        })
    };

    handleCurrentQuestion = (event) => {
        const questions = this.state.questions.slice();
        const currentQuestionNumber = this.state.currentQuestionNumber;
        questions[currentQuestionNumber] = event.target.value;
        console.log("event.target.value : " + event.target.value);
        console.log("questions : " + questions);
        this.setState({
            questions: questions
        })
    };


    handleCurrentGoodAnswer = (event) => {
        const goodAnswers = this.state.goodAnswers.slice();
        const currentQuestionNumber = this.state.currentQuestionNumber;
        goodAnswers[currentQuestionNumber] = event.target.value;
        this.setState({
            goodAnswers: goodAnswers
        })
    };

    handleCurrentAnswer1 = (event) => {
        const answers1 = this.state.answers1.slice();
        const currentQuestionNumber = this.state.currentQuestionNumber;
        answers1[currentQuestionNumber] = event.target.value;
        this.setState({
            answers1: answers1
        })
    };
    handleCurrentAnswer2 = (event) => {
        const answers2 = this.state.answers2.slice();
        const currentQuestionNumber = this.state.currentQuestionNumber;
        answers2[currentQuestionNumber] = event.target.value;
        this.setState({
            answers2: answers2
        })
    };
    handleCurrentAnswer3 = (event) => {
        const answers3 = this.state.answers3.slice();
        const currentQuestionNumber = this.state.currentQuestionNumber;
        answers3[currentQuestionNumber] = event.target.value;
        this.setState({
            answers3: answers3
        })
    };
    handleCurrentAnswer4 = (event) => {
        const answers4 = this.state.answers4.slice();
        const currentQuestionNumber = this.state.currentQuestionNumber;
        answers4[currentQuestionNumber] = event.target.value;
        this.setState({
            answers4: answers4
        })
    };

    saveOpenQuestion = (event) => {
        var currentQuestionNumber = this.state.currentQuestionNumber+1;
        var numberOfQuestions = this.state.numberOfQuestions+1
        console.log("currentQuestionNumber: " + currentQuestionNumber);

        const questionsTypes = this.state.questionsTypes.slice();
        const questionType = questionsTypes[questionsTypes.length - 1];
        console.log("Question Type" + questionType);

        const questions = this.state.questions.slice();
        const question = questions[questions.length - 1];
        console.log("Question " + question);

        const answers1 = this.state.answers1.slice();
        const answer1 = answers1[answers1.length - 1];
        console.log("answer1 " + answer1);

        const answers2 = this.state.answers2.slice();
        const answer2 = answers2[answers2.length - 1];
        console.log("answer2 " + answer2);

        const answers3 = this.state.answers3.slice();
        const answer3 = answers3[answers3.length - 1];
        console.log("answer3 " + answer3);

        const answers4 = this.state.answers4.slice();
        const answer4 = answers4[answers4.length - 1];
        console.log("answer4 " + answer4);

        const goodAnswers = this.state.goodAnswers.slice();
        const goodAnswer = goodAnswers[goodAnswers.length - 1];
        console.log("goodAnswer " + goodAnswer);


        globalQuestions.push(this.state.question);
        this.setState({
            currentQuestionNumber: currentQuestionNumber,
            numberOfQuestions: numberOfQuestions,
            questionsTypes: questionsTypes.concat([{
                questionType: questionType,
            }]),
            questions: questions.concat([{
                question: question,
            }]),
            answers1: answers1.concat([{
                answer1: answer1,
            }]),
            answers2: answers2.concat([{
                answer2: answer2,
            }]),
            answers3: answers3.concat([{
                answer3: answer3,
            }]),
            answers4: answers4.concat([{
                answer4: answer4,
            }]),
            goodAnswers: goodAnswers.concat([{
                goodAnswer: goodAnswer,
            }]),

        });

    }
    previousQuestion (event) {
        if(this.state.currentQuestionNumber>0) {
            const currentQuestionNumber = this.state.currentQuestionNumber - 1;
            const questionsTypes = this.state.questionsTypes.slice();
            const questions = this.state.questions.slice();
            this.setState({
                currentQuestionNumber: currentQuestionNumber,
                questionsTypes: questionsTypes,
                questions: questions,
                answers1: this.state.answers1,
                answers2: this.state.answers2,
                answers3:this.state.answers3,
                answers4:this.state.answers4,
                goodAnswers:this.state.goodAnswers,
            });
        }
    }
    nextQuestion (event) {
        if(this.state.currentQuestionNumber<this.state.numberOfQuestions) {
            var currentQuestionNumber = this.state.currentQuestionNumber + 1;
            this.setState({
                currentQuestionNumber: currentQuestionNumber,
            });
        }
    }

    saveTestToDynamoDB (event) {
        const questions = globalQuestions.map((val, ind) => {
            return {"id": ind, "questionTitle": val, "questionContent": "----", "questionType": this.state.questionType}
        })


        const test = {
            "testTittle": this.state.testTittle,
            "numberOfQuestions": this.state.numberOfQuestions,
            "questions": questions
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

        const currentquestionType= this.state.questionsTypes[currentQuestionNumber];
        const currentQuestion= this.state.questions[currentQuestionNumber];
        console.log("czy typeog this.state.questions[currentQuestionNumber]  " + typeof this.state.questions[currentQuestionNumber]);
        console.log("czy rendenruje this.state.questions[currentQuestionNumber]  " + this.state.questions[currentQuestionNumber]);

        console.log("czy typeog currentQuestion  " + typeof currentQuestion);
        console.log("czy rendenruje currentQuestion  " + currentQuestion);
        console.log("czy rendenruje currentQuestion.question  " + currentQuestion.question);
        const currentanswer1= this.state.answers1[currentQuestionNumber];
        const currentanswer2= this.state.answers2[currentQuestionNumber];
        const currentanswer3= this.state.answers3[currentQuestionNumber];
        const currentanswer4= this.state.answers4[currentQuestionNumber];
        const currentgoodAnswer= this.state.goodAnswers[currentQuestionNumber];
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

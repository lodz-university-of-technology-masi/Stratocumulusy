import React, {Component} from "react";
import "./AddTest.css";


class AddTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            testTittle: '',
            numberOfQuestions: 0,
            currentQuestionNumber: 0,
            questionsTypes: [{
                questionType: '',
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

            currentQuestionType: '1',
            currentQuestion: '',
            currentanswer1: '',
            currentanswer2: '',
            currentanswer3: '',
            currentanswer4: '',
            currentgoodAnswer: '',


        };
        this.handleTestTittle = this.handleTestTittle.bind(this);
        this.handleQuestionType = this.handleQuestionType.bind(this);
        this.handleCurrentQuestion = this.handleCurrentQuestion.bind(this);
        this.handleCurrentGoodAnswer = this.handleCurrentGoodAnswer.bind(this);
        this.handleCurrentAnswer1 = this.handleCurrentAnswer1.bind(this);
        this.handleCurrentAnswer2 = this.handleCurrentAnswer2.bind(this);
        this.handleCurrentAnswer3 = this.handleCurrentAnswer3.bind(this);
        this.handleCurrentAnswer4 = this.handleCurrentAnswer4.bind(this);

        this.previousQuestion = this.previousQuestion.bind(this);
        this.nextQuestion = this.nextQuestion.bind(this);

        this.saveOpenQuestion = this.saveOpenQuestion.bind(this);
        this.saveTestToDynamoDB = this.saveTestToDynamoDB.bind(this);
    }

    handleTestTittle = (event) => {
        this.setState({
            testTittle: event.target.value,
        })
    };

    handleQuestionType = (event) => {
        this.setState({
            currentQuestionType: event.target.value,
        })
    };

    handleCurrentQuestion = (event) => {
        this.setState({
            currentQuestion: event.target.value,
        })
    };

    handleCurrentGoodAnswer = (event) => {
        this.setState({
            currentgoodAnswer: event.target.value,
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

    previousQuestion(event) {
        if (this.state.currentQuestionNumber > 0) {
            const currentQuestionNumber = this.state.currentQuestionNumber - 1;
            this.setState({
                currentQuestionNumber: currentQuestionNumber,

                currentQuestionType: this.state.questionsTypes[currentQuestionNumber],
                currentQuestion: this.state.questions[currentQuestionNumber],
                currentanswer1: this.state.answers1[currentQuestionNumber],
                currentanswer2: this.state.answers2[currentQuestionNumber],
                currentanswer3: this.state.answers3[currentQuestionNumber],
                currentanswer4: this.state.answers4[currentQuestionNumber],
                currentgoodAnswer: this.state.goodAnswers[currentQuestionNumber],
            });
        }
    }

    nextQuestion(event) {
        if (this.state.currentQuestionNumber < this.state.numberOfQuestions - 1) {
            var currentQuestionNumber = this.state.currentQuestionNumber + 1;
            this.setState({
                currentQuestionNumber: currentQuestionNumber,

                currentQuestionType: this.state.questionsTypes[currentQuestionNumber],
                currentQuestion: this.state.questions[currentQuestionNumber],
                currentanswer1: this.state.answers1[currentQuestionNumber],
                currentanswer2: this.state.answers2[currentQuestionNumber],
                currentanswer3: this.state.answers3[currentQuestionNumber],
                currentanswer4: this.state.answers4[currentQuestionNumber],
                currentgoodAnswer: this.state.goodAnswers[currentQuestionNumber],
            });
        }
        // jak przenosimy się z powrotem do nowego pytania
        if (this.state.currentQuestionNumber == this.state.numberOfQuestions - 1) {
            var currentQuestionNumber = this.state.currentQuestionNumber + 1;
            this.setState({
                currentQuestionNumber: currentQuestionNumber,

                currentQuestionType: '1',
                currentQuestion: '',
                currentanswer1: '',
                currentanswer2: '',
                currentanswer3: '',
                currentanswer4: '',
                currentgoodAnswer: '',
            });
        }
    }

    saveOpenQuestion = (event) => {
        var currentQuestionNumber = this.state.currentQuestionNumber + 1;
        var numberOfQuestions = this.state.numberOfQuestions + 1
        console.log("currentQuestionNumber: " + currentQuestionNumber);

        const questionsTypes = this.state.questionsTypes.slice();
        questionsTypes[currentQuestionNumber - 1] = this.state.currentQuestionType;


        const questions = this.state.questions.slice();
        console.log("przed questions: " + questions);
        questions[currentQuestionNumber - 1] = this.state.currentQuestion;
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

            // ustawiamy stan na nowe pytanie
            // currentQuestionType: 1,
            currentQuestion: '',
            currentanswer1: '',
            currentanswer2: '',
            currentanswer3: '',
            currentanswer4: '',
            currentgoodAnswer: '',
        });
    };



    saveTestToDynamoDB(event) {
        const questions = [];

        for (let i = 0; i < this.state.numberOfQuestions; i++) {
            if(this.state.questionsTypes[i]==1){ //open
                questions.push({
                    QuestionID: i,
                    questionType: this.state.questionsTypes[i],
                    question: this.state.questions[i],
                    correctAnswer:"|",
                })
            }
            if(this.state.questionsTypes[i]==2){
                questions.push({ //number
                    QuestionID: i,
                    questionType: this.state.questionsTypes[i],
                    question: this.state.questions[i],
                    correctAnswer: this.state.goodAnswers[i],
                })
            }
            if(this.state.questionsTypes[i]==3){
                const choices = [];
                choices.push(this.state.answers1[i]);
                choices.push(this.state.answers2[i]);
                choices.push(this.state.answers3[i]);
                choices.push(this.state.answers4[i]);
                questions.push({ // multiple
                    QuestionID: i,
                    questionType: this.state.questionsTypes[i],
                    question: this.state.questions[i],
                    choices: choices,
                    correctAnswer: this.state.goodAnswers[i],
                })
            }

        }


        console.log("questions "+questions.toSource());
        function uuidv4() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
        const testId =  uuidv4();

        const test = {
            "testId": testId,
            "testTitle": this.state.testTittle,
            "questions": questions
        };
        console.log("test "+test.toSource());

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
        function uuidv4() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
        const testTittle = this.state.testTittle;
        const numberOfQuestions = this.state.numberOfQuestions;
        const currentQuestionNumber = this.state.currentQuestionNumber;
        const currentQuestionType = this.state.currentQuestionType;
        const currentQuestion = this.state.currentQuestion;
        const currentanswer1 = this.state.currentanswer1;
        const currentanswer2 = this.state.currentanswer2;
        const currentanswer3 = this.state.currentanswer3;
        const currentanswer4 = this.state.currentanswer4;
        const currentgoodAnswer = this.state.currentgoodAnswer;
        console.log("uuid:  "+uuidv4());
        console.log("czy rendenruje this.state.questions  " + this.state.questions);

        return (
            <div className="AddTest">
                <div className="lander">

                    <div>
                        <label>Enter the test title</label>
                        <input id="testTitle" type="text" value={testTittle} onChange={this.handleTestTittle}/>
                        <button onClick={this.saveTestToDynamoDB}>Save test</button>
                        <br/><br/>
                        <label>Number of question: {numberOfQuestions}</label>
                        <br/><br/>
                        <label>Current question: {currentQuestionNumber}</label>
                        <button onClick={this.previousQuestion}>Previous question</button>
                        <button onClick={this.nextQuestion}>Next question</button>
                        <br/><br/>
                    </div>
                    <div>
                        <label>Choose question type</label>
                        <select value={currentQuestionType} onChange={this.handleQuestionType}>
                            <option value='1'>Open</option>
                            <option value='2'>Number</option>
                            <option value='3'>Multiple choice</option>
                        </select>
                        <>

                            <br/>
                            < label> Enter content of the question</label>
                            <br/>
                            <textarea id="question" rows="5" cols="100" value={currentQuestion}
                                      onChange={this.handleCurrentQuestion}/>
                            <br/><br/>

                            <br/>
                            {currentQuestionType == 2 ?
                                <>
                                    <label>Enter number answer</label>
                                    <br/>
                                    <input type="text" name="1answer" value={currentgoodAnswer}
                                           onChange={this.handleCurrentGoodAnswer}/>
                                    <br/><br/>
                                </> : null
                            }
                            {currentQuestionType == 3 ?
                                <>
                                    <label>Enter 1st answer</label>
                                    <br/>
                                    <input type="text" name="1answer" value={currentanswer1}
                                           onChange={this.handleCurrentAnswer1}/>
                                    <br/><br/>
                                    <label>Enter 2nd answer</label>
                                    <br/>
                                    <input type="text" name="2answer" value={currentanswer2}
                                           onChange={this.handleCurrentAnswer2}/>
                                    <br/><br/>
                                    <label>Enter 3rd answer</label>
                                    <br/>
                                    <input type="text" name="3answer" value={currentanswer3}
                                           onChange={this.handleCurrentAnswer3}/>
                                    <br/><br/>
                                    <label>Enter 4th answer</label>
                                    <br/>
                                    <input type="text" name="4answer" value={currentanswer4}
                                           onChange={this.handleCurrentAnswer4}/>
                                    <br/><br/>
                                    <label>Enter good answer</label>
                                    <br/>
                                    <input type="text" name="4answer" value={currentgoodAnswer}
                                           onChange={this.handleCurrentGoodAnswer}/>
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

export default AddTest;

import React, {Component} from "react";
import "./SolveTest.css";
import {Button} from "react-bootstrap";
import notifier from "simple-react-notifications";


class SolveTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: props.location.SolveTestProps.questions,
            testId: props.location.SolveTestProps.testId,
            testTittle: props.location.SolveTestProps.testTitle,
            candidateEmail: props.location.SolveTestProps.candidateEmail,
            score: '',
            recruiterEmail: props.location.SolveTestProps.recruiterEmail,
        };
        this.updateScore = this.updateScore.bind(this);
        this.saveTestToDynamoDB = this.saveTestToDynamoDB.bind(this);
    }
    updateScore = (event) => {
        this.setState({
            score: event.target.value,
        })
    }

    saveTestToDynamoDB(event) {
        notifier.success("Test was successfully check.");

        const test = {
            "testId": this.state.testId,
            "testTitle": this.state.testTittle,
            "questions": this.state.questions,
            "candidateEmail": this.state.candidateEmail,
            "points": this.state.score,
            "recruiterEmail": this.state.recruiterEmail,
        };


        const response = fetch('https://nbbmfshcof.execute-api.us-east-1.amazonaws.com/test/solvedtest', {
            dataType: "json",
            method: 'POST',
            body: JSON.stringify(test),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).finally(() =>  window.location.replace("/testToCheck"));

        return false;
    }

render()
{
    const score = this.state.score;
    let listItems = this.state.questions.map((d, index) => {
        if (d.questionType == '1') {
            return (
                <div className="test">
                    <div>
                        <h1>Id:{index}. {d.question}</h1>
                        <h1>Answer: {d.candidatesAnwser} </h1>
                        <br/>
                    </div>
                </div>
            );
        }
        if (d.questionType == '2') {
            return (
                <div className="test">
                    <div>
                        <h1>Id:{index}. {d.question}</h1>
                        <h1>Answer: {d.candidatesAnwser} </h1>
                        <br/>
                    </div>

                </div>
            );
        }
        if (d.questionType == '3') {
            return (
                <div className="test">
                    <div>
                        <h1>Id:{index}. {d.question}</h1>
                        <h1>Answer: {d.candidatesAnwser} </h1>
                        <br/>
                    </div>

                </div>
            );
        }

    });

    return (

        <div>
            <div>

                <div>
                    <h1>Test Title: {this.state.testTittle}</h1>
                    <h1>Number of question: {this.state.questions.length}</h1>
                    <br/>
                </div>
            </div>
            {listItems}

            <div>
                <br/>

                <h1>Write score, max={this.state.questions.length}</h1>
                <form>
                    <input type="number" name="1answer" value={score}
                           onChange={this.updateScore}/>
                </form>
                    <button onClick={this.saveTestToDynamoDB}>Check Test</button>

            </div>

        </div>


    );
}
}

export default SolveTest;
import React, { Component } from "react";
import "./Recruiter.css";


let globalQuestions = [];

class Recruiter extends Component {
  constructor(props) {
    super(props);
    this.state = {
        testTittle: '',
       questionType: 3,
        numberOfQuestions: 0,
       question: ''
      };

    this.handleQuestionType=this.handleQuestionType.bind(this);
    this.handleQuestionTextChange=this.handleQuestionTextChange.bind(this);
    this.handleTestTittleChange=this.handleTestTittleChange.bind(this);
    this.saveOpenQuestion=this.saveOpenQuestion.bind(this);
    this.saveTestToDynamoDB=this.saveTestToDynamoDB.bind(this);

  }

  handleQuestionType = (event)=> {
    this.setState({
      questionType: event.target.value
    })
  }


    handleQuestionTextChange = (event) => {
        this.setState({
            question: event.target.value
        })
    };

    handleTestTittleChange = (event) => {
        this.setState({
            testTittle: document.getElementById("testTitle").value
        })
    };

    saveOpenQuestion = (event) => {
        this.state.numberOfQuestions++;

        globalQuestions.push(this.state.question);
        this.setState({
            question: ' '
        });

    }

    saveTestToDynamoDB (event) {
        const questions = globalQuestions.map((val, ind) => {
            return {"id": ind, "questionTitle": val, "questionContent": "----", "questionType": this.state.questionType}
        })

       // const testTittle = this.state.testTittle; // robie to bo takto jest undefined ....
        // alert(this.state.testTittle);

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
          </div>
          <div>
            <label>Choose question type</label>
            <select value={this.state.questionType} onChange={this.handleQuestionType}>
              <option value="1">Multiple choice</option>
              <option value="2">Open</option>
              <option value="3">Number</option>
            </select>
            <br />
              {this.state.questionType == 3 ?
                  <>
                      <br />
                      < label > Enter content of the question</label>
                      <br />
                      <textarea id="question" rows="5" cols="100" value={this.state.question} onChange={this.handleQuestionTextChange}/>
                      <br /><br />

                      <label>Enter answer</label>
                      <br/>
                      <input type="text" name="1answer" />
                  </> : null
              }
            {this.state.questionType==1 ?
              <>
                  <br />
                  <label>Enter content of the question</label>
                  <br />
                  <textarea id="question" rows="5" cols="100"/>
                  <br /><br />

                      <label>Enter 1st answer</label>
                      <br/>
                      <input type="text" name="1answer" />
                      <br/><br/>
                      <label>Enter 2nd answer</label>
                      <br/>
                      <input type="text" name="2answer" />
                      <br/><br/>
                      <label>Enter 3rd answer</label>
                      <br/>
                      <input type="text" name="3answer" />
                      <br/><br/>
                      <label>Enter 4th answer</label>
                      <br/>
                      <input type="text" name="4answer" />
                  </> : null
                  }

                  {this.state.questionType == 2 ?
                      <>
                          <br />
                      < label > Enter content of the question</label>
                      <br />
                      <textarea id="question" rows="5" cols="100"/>
                    </> : null
                  }

              <br/><br/>
              <button onClick={this.saveOpenQuestion}>Save question</button>

          </div>
          </div>
        </div>


    );
  }
}



export default Recruiter;

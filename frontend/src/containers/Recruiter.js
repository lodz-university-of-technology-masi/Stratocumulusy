import React, { Component } from "react";
import "./Recruiter.css";
import { NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";


let globalQuestions = [];
let globalNumber = 0;


class Recruiter extends Component {
  constructor(props) {
    super(props);
    this.state = {
       show: false,
       questionType: 3,
       question: ''
      };

    this.showDiv = this.showDiv.bind(this)
  }

  get qtype(){
    return this.questionType;
  }

  handleQuestionType = event => {
    this.setState({
      questionType: event.target.value
    })
  }

  showDiv = () => {
    const { show } = this.state;
    this.setState({ show: true });


  }


  render() {

      return (
      <div className="Recruiter">
        <div className="lander">

          <div>
            <label>Enter the test title</label>
            <input type="text" name="title" />
            <button onClick={function () {
                const response = fetch('https://k8mmeonpwf.execute-api.us-east-1.amazonaws.com/prod/emptytests', {
                    method: 'POST',
                    body: JSON.stringify({"question": {globalQuestions}}),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                });

                return false;
            }}>Save test</button>
            <br /><br />
              <label>Number of question: {globalNumber}</label>
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
            <button onClick={this.showDiv}>Add question</button>
              {this.state.show && this.state.questionType == 3 ?
                  <>
                      <label>Question no. 1</label>
                      < br/> < br />
                      < label > Enter content of the question</label>
                      <br />
                      <textarea id="question" rows="5" cols="100"/>
                      <br /><br />

                      <label>Enter answer</label>
                      <br/>
                      <input type="text" name="1answer" />
                      <br/><br/>
                      <button onClick={function () {
                          globalNumber++;
                          globalQuestions.push(document.getElementById("question").innerText);
                          return false;
                      }}>Save question</button>
                  </> : null
              }
            {/*{this.state.show && this.state.questionType==1 ?*/}
            {/*  <>*/}
            {/*      <label>Question no. 1</label>*/}
            {/*      <br /><br />*/}
            {/*      <label>Enter content of the question</label>*/}
            {/*      <br />*/}
            {/*      <textarea id="question" rows="5" cols="100"/>*/}
            {/*      <br /><br />*/}

            {/*          <label>Enter 1st answer</label>*/}
            {/*          <br/>*/}
            {/*          <input type="text" name="1answer" />*/}
            {/*          <br/><br/>*/}
            {/*          <label>Enter 2nd answer</label>*/}
            {/*          <br/>*/}
            {/*          <input type="text" name="2answer" />*/}
            {/*          <br/><br/>*/}
            {/*          <label>Enter 3rd answer</label>*/}
            {/*          <br/>*/}
            {/*          <input type="text" name="3answer" />*/}
            {/*          <br/><br/>*/}
            {/*          <label>Enter 4th answer</label>*/}
            {/*          <br/>*/}
            {/*          <input type="text" name="4answer" />*/}
            {/*          <br/><br/>*/}
            {/*          <button onClick={function () {*/}
            {/*              globalNumber++;*/}
            {/*              globalQuestions.push(document.getElementById("question").innerText);*/}
            {/*              return false;*/}
            {/*          }}>Save question</button>*/}
            {/*      </> : null*/}
            {/*      }*/}

            {/*      {this.state.show && this.state.questionType == 2 ?*/}
            {/*          <>*/}
            {/*          <label>Question no. 1</label>*/}
            {/*          < br/> < br />*/}
            {/*          < label > Enter content of the question</label>*/}
            {/*          <br />*/}
            {/*          <textarea id="question" rows="5" cols="100"/>*/}
            {/*          <br /><br />*/}

            {/*          <label>Enter answer</label>*/}
            {/*          <br/>*/}
            {/*          <input type="text" name="1answer" />*/}
            {/*              <br/><br/>*/}
            {/*              <button onClick={function () {*/}
            {/*                  globalNumber++;*/}
            {/*                  globalQuestions.push(document.getElementById("question").innerText);*/}
            {/*                  return false;*/}
            {/*              }}>Save question</button>*/}
            {/*        </> : null*/}
            {/*      }*/}

          </div>
          </div>
        </div>


    );
  }
}



export default Recruiter;

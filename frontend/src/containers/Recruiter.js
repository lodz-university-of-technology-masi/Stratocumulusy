import React, { Component } from "react";
import "./Recruiter.css";
import { NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";


class Recruiter extends Component {
  constructor(props) {
    super(props);
    this.state = {
       show: false,
       questionType: 1
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
    this.setState({ show: true })
  }

  render() {
    return (
      <div className="Recruiter">
        <div className="lander">

          <div>
            <label>Enter the test title</label>
            <input type="text" name="title" />
            <button>Save test</button>
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
            {this.state.show && <Question1 questionType={this.state.questionType}/>}
            
          </div>

        </div>

      </div>
    );
  }
}

class Question1 extends Component{
  render() {
    return (
      <div>
        <label>Question no. 1</label>
        <br /><br />
        <label>Enter content of the question</label>
        <br />
        <textarea rows="5" cols="100" />
        <br /><br />
        { this.props.questionType == 1 &&
        <div>
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
        </div>
        }
        { this.props.questionType == 3 &&
        <div>
        <label>Enter answer</label>
        <br/>
        <input type="text" name="1answer" />
        </div>
        }
        <br/><br/>
        <button>Save question</button>
      </div>
    )
  }
}

export default Recruiter;

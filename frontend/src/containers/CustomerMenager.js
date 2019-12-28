import React, { Component } from "react";
import {Button} from "reactstrap"
import {Link} from "react-router-dom";


class TestList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      testTitleLabel: '',
      testTitle: '',
      numberOfQuestionsLabel:'',
      numberOfQuestions: '',
        questions : [
            {
                id: 0,
                questionTitle: "",
                questionContent: ""
            }
        ]
    }
    
    this.loadFromDB = this.loadFromDB.bind(this)
  }

  loadFromDB() {
    fetch('https://nbbmfshcof.execute-api.us-east-1.amazonaws.com/test/emptytest')
            .then((response)=>{return response.json()})
            .then((data)=>{
            //var res = JSON.parse(data.body);
            this.setState({
                testTitleLabel:'Test title:',
                testTitle:data.Items[0].testTittle,
                numberOfQuestionsLabel:'Number of questions: ',
                numberOfQuestions:data.Items[0].numberOfQuestions
                })})
}

    
  render() {
    return (
            <div>
              <button onClick={this.loadFromDB}>Load tests from database</button>
                <h2> {this.state.testTitleLabel} {this.state.testTitle}</h2>
                <label>{this.state.numberOfQuestionsLabel} {this.state.numberOfQuestions}</label>
              </div>
          );
  }
}

export default TestList;

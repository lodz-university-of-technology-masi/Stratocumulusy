import React, { Component } from "react";
import {Button} from "reactstrap"
import {Link} from "react-router-dom";
import Test from "./Test";
import TestRecruiter from "./TestRecruiter";


class TestList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      testy: []
    }
    this.loadFromDB();
  }


  loadFromDB() {
    let testy = [];
    fetch('https://nbbmfshcof.execute-api.us-east-1.amazonaws.com/test/emptytest')
            .then((response)=>{return response.json()})
            .then((data)=>{
               console.log(data);
               console.log(data[0]);
              this.testy = data;
            }).finally(() => {
              this.setState({
                testy: this.testy
              })
            });
}

  render() {
    return (
      <div>
        {this.state.testy.map((c,index) => <TestRecruiter id={index}  testTitle={c.testTitle} numberOfQuestions={c.questions.length} testId={c.testId} questions={c.questions}/>)}
  </div> 
          );
  }
}

export default TestList;

import React, { Component } from "react";
import {Button} from "reactstrap"
import {Link} from "react-router-dom";
import Test from "./Test";
import TestRecruiter from "./TestRecruiter";


class TestList extends Component {
  constructor(props) {
    super(props)
    this.loadFromDB();
  }

  liczbaTestow = 0
  listaTytulow = []
  testy = [];


  loadFromDB() {
    fetch('https://nbbmfshcof.execute-api.us-east-1.amazonaws.com/test/emptytest')
            .then((response)=>{return response.json()})
            .then((data)=>{
              console.log(data);
              this.testy = data["Items"];
              console.log(data["Items"][0]);
            });
}

  render() {
    return (
      <div>
        {this.testy.map((c,index) => <TestRecruiter id={index} testTitle={c.testTittle} numberOfQuestions={c.numberOfQuestions} dateAdded={c.date} questions={c.questions}/>)}
  </div> 
          );
  }
}

export default TestList;

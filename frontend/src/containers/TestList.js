import React, { Component } from "react";
import "./TestList.css";
import Test from "./Test";

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
              this.testy = data;
            });
}

  render() {
    return (
      <div>
        {this.testy.map((c,index) => <Test id={c.testId} questions={c.questions}/>)}
  </div> 
          );
  }
}

export default TestList;

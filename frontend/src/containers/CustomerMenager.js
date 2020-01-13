import React, { Component } from "react";
import TestRecruiter from "./TestRecruiter";


class TestList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      testy: []
    }
  }

  componentDidMount = () => {
    let testy = [];
    fetch('https://nbbmfshcof.execute-api.us-east-1.amazonaws.com/test/emptytest')
            .then((response)=>{return response.json()})
            .then((data)=>{
              this.testy = data;
            }).finally(() => {
              this.setState({
                testy: this.testy
              })
            });
}

  render() {
    const testy = this.state.testy;
    return (
      <div>
        {testy.map((c,index) => <TestRecruiter id={index}  testTitle={c.testTitle} numberOfQuestions={c.questions.length} testId={c.testId} questions={c.questions}/>)}
  </div> 
          );
  }
}

export default TestList;

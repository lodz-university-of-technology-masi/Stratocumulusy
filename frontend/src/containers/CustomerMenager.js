import React, { Component } from "react";
import TestRecruiter from "./TestRecruiter";
import {Auth} from "aws-amplify";


class TestList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      testy: [],
      recruiterEmail: ''
    }
    Auth.currentSession()
        .then(data => {
          let idToken = data.getIdToken();

          let email = idToken.payload.email;

          this.setState({
            recruiterEmail: email,
          })
        })
        .catch(err => console.log(err));
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
    const recruiterEmail = this.state.recruiterEmail;

    return (
      <div>
        {testy.map((c,index) => {
          let testRecruiterEmail = c.recruiterEmail;
          if (testRecruiterEmail == recruiterEmail) {
            return <TestRecruiter id={index} testTitle={c.testTitle} numberOfQuestions={c.questions.length}
                                  testId={c.testId} questions={c.questions} recruiterEmail={recruiterEmail} />
          } else {
            return null
          }
        })}
  </div> 
          );
  }
}

export default TestList;

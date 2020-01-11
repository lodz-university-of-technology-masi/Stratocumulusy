import React, { Component } from "react";
import "./TestList.css";
import Test from "./Test";
import {Auth} from 'aws-amplify';
import {cognitoidentityserviceprovider, params} from "./CognitoUsers";

class TestList extends Component {
  constructor(props) {
    super(props)
      this.state = {
          wszystkietesty: [],
          allCandidateTests: [],
          currentUserEmail: '',
      }

  }

    componentDidMount = () => {

        // pobranie wszystkich testow
        fetch('https://nbbmfshcof.execute-api.us-east-1.amazonaws.com/test/emptytest')
            .then((response)=>{return response.json()})
            .then((data)=>{
                console.log(data);
                this.setState({
                    wszystkietesty: data,
                })

            });
        // pobieram przypisane testy do kandydatow z tabeli CandidateTests
        let allCandidateTests =null;
        fetch('https://nbbmfshcof.execute-api.us-east-1.amazonaws.com/test/testassignedtocandidate')
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                allCandidateTests = data;
            })
            .finally(() => {
                this.setState({
                    allCandidateTests: allCandidateTests,
                })
                console.log("allCandidateTests    : " + allCandidateTests.toSource());
            });


        Auth.currentSession()
            .then(data => {
                let idToken = data.getIdToken();

                let email = idToken.payload.email;

                this.setState({
                    currentUserEmail: email,
                })
                console.log("currentUserEmail: "+this.state.currentUserEmail);
            })
            .catch(err => console.log(err));
    };







  render() {
      const wszystkietesty = this.state.wszystkietesty;
      const allCandidateTests = this.state.allCandidateTests;
      const currentUserEmail = this.state.currentUserEmail;

      // dziwnie to napisalem, ale inaczej cos nie szlo ...
      const candidateTests = allCandidateTests.filter(n => n.candidateEmail == currentUserEmail);
      const candidateTestsID = [];
      // ten candidateTests ma tylko jeden obiekt i musialem sie dobrac do niego poprzez lambde
      candidateTests.filter(n => {
          console.log("n.tests: "+n.tests.toSource());
          console.log("n.tests[0].testId: "+n.tests[0].testId);
          console.log("n.tests[0].testId: "+n.tests.length);
          for(let i = 0; i < n.tests.length ; i++ ) {
              candidateTestsID.push(n.tests[i].testId)
          }
          return false;
      });
      console.log("candidateTestsID : "+candidateTestsID);

      const testy = wszystkietesty.filter( n => {
          for(let i = 0; i < candidateTestsID.length ; i++ ){
              if(n.testId == candidateTestsID[i] ){
                  return true;
              }
          }
          return false;
      });


    return (
      <div>
        {testy.map((c,index) => <Test id={index} title={c.testTitle} testId={c.testId} questions={c.questions}/>)}
  </div> 
          );
  }
}

export default TestList;

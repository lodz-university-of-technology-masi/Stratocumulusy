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
              //  console.log("allCandidateTests    : " + allCandidateTests.toSource());
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
          for(let i = 0; i < n.tests.length ; i++ ) {
              candidateTestsID.push(n.tests[i].testId)
          }
          return false;
      });
      console.log("candidateTestsID : "+candidateTestsID);

      const testy = wszystkietesty.filter( n => {
          for(let i = 0; i < candidateTestsID.length ; i++ ){
              let testId =  n.testId.substring(0, n.testId.length - 2)
              if(testId == candidateTestsID[i] ){
                  return true;
              }
          }
          return false;
      }).sort( (a, b) => {
          return ('' + a.testId).localeCompare(b.testId);});

    const testTittle = testy.map(c => {
        let testTittle = c.testTitle;
        if (c.testId.substring(c.testId.length-2,c.testId.length) === "pl") {
            testTittle += "(pl)";
        }
        if (c.testId.substring(c.testId.length-2,c.testId.length) === "en") {
            testTittle += "(eng)";
        }

        return testTittle;
    })

    return (
      <div>
        {testy.map((c,index) => <Test id={index} title={testTittle[index]}
                                      testId={c.testId} questions={c.questions} currentUserEmail={currentUserEmail} recruiterEmail={c.recruiterEmail}/>)}
  </div> 
          );
  }
}

export default TestList;

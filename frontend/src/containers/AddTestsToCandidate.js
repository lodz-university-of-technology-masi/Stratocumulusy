import React, {Component} from "react";
import "./AddTest.css";
import {cognitoidentityserviceprovider} from "./CognitoUsers";
import {params} from "./CognitoUsers";
import {Button} from "reactstrap";
import {Link} from "react-router-dom";
import Test from "./Test";
import notifier from "simple-react-notifications";

class AddTestToCandidate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCandidate: '',
            isCandidateSelected: false,
            candidateList: [],
            availableTests: [],
            selectedTests: [],
            allCandidateTests: [],
            loaded: false
        };

        this.selectCandidate = this.selectCandidate.bind(this);
        this.cancel = this.cancel.bind(this);
        this.save = this.save.bind(this);
        this.addTest = this.addTest.bind(this);
        this.removeTest = this.removeTest.bind(this);
    }

    componentDidMount = () => {
        // pobranie uzytkownikow
        // cognitoidentityserviceprovider.listUsers(params, (err, data) => {
        //     if (err)
        //         console.log(err, err.stack);
        //     else {
        //
        //         this.setState({
        //             candidateList: data.Users.filter(cand => cand.Attributes[0].Value == 'false').map(cand => cand.Attributes[1].Value)
        //         });
        //     }
        //
        // });
        let candidateList = [];
        fetch('https://nbbmfshcof.execute-api.us-east-1.amazonaws.com/test/getlallcandidate')
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                // console.log("data uzytkownicy: "+data.users.toSource())
                // console.log("data uzytkownicy: "+data.users[0].toSource())
                // console.log("data uzytkownicy: "+data.users.length)

                for (let i = 0; i < data.users.length; i++){
                        // attributes[2] = email
                    candidateList.push(data.users[i].attributes[2].value);
                  //  console.log("data.users[i] "+data.users[i].attributes[2].toSource())
                }
                // console.log("candidateList "+candidateList)
                // console.log("candidateList "+candidateList.toSource())
            }) .finally(() => {
            this.setState({
                candidateList: candidateList,
                loaded: true
            })
        });


        // pobieram przypisane testy do kandydatow z tabeli CandidateTests
        let allCandidateTests = null;
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
            });
    };

    cancel = (event) => {
        this.setState({
            selectedCandidate: '',
            isCandidateSelected: false,
            availableTests: [],
            selectedTests: [],

        })
    };
    save = (event) => {
        notifier.success("Test was successfully add to candidate");
        const assignedTest = [];
        for (let i = 0; i < this.state.selectedTests.length; i++) {
            assignedTest.push({
                testTitle: this.state.selectedTests[i].testTitle,
                testId: this.state.selectedTests[i].testId,
            })
        }
        const test = {
            "candidateEmail": this.state.selectedCandidate,
            "tests": assignedTest,
        };
        const response = fetch('https://nbbmfshcof.execute-api.us-east-1.amazonaws.com/test/testassignedtocandidate', {
            dataType: "json",
            method: 'POST',
            body: JSON.stringify(test),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).finally(() => {this.setState({
            selectedCandidate: '',
            isCandidateSelected: false,
            availableTests: [],
            selectedTests: [],
        })
        });
        return false;
    };

    selectCandidate = (event) => {
        let nameCandidate = event.target.getAttribute('nameCandidate');
        const allCandidateTests = this.state.allCandidateTests.slice();
        let selectedTests = [];
        // ustawiam kandydatowi przydzielone testy z bazy ( CandidateTests )
        for (var i = 0; i < allCandidateTests.length; i++) {
            if (allCandidateTests[i].candidateEmail == nameCandidate) {
                for (var j = 0; j < allCandidateTests[i].tests.length; j++) {
                    selectedTests.push({
                        testTitle: allCandidateTests[i].tests[j].testTitle,
                        testId: allCandidateTests[i].tests[j].testId,
                    });
                }
            }
        }
        // pobranie wszystkich testow z EmptyTests
        let testy = null;
        fetch('https://nbbmfshcof.execute-api.us-east-1.amazonaws.com/test/emptytest')
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                testy = data.map(n => (
                    {
                        testTitle: n.testTitle,
                        testId: n.testId.substring(0, n.testId.length - 2)
                    }));
            }).then(() => {
            var pomTesty = testy.slice();
            let pom = [{
                testTitle: '',
                testId: ''
            }];
            // console.log("pomTesty: " + pomTesty.toSource());
            // console.log("pomTesty.length: " + pomTesty.length);
            // console.log("pom.length: " + pom.length);
            for (let i = 0; i < pomTesty.length; i++) {
                let isItAlready = false;
                for (let j = 0; j < pom.length; j++) {
                    // console.log(i+" : " + j);
                    // console.log(pomTesty[i].testId+" == " + pom[j].testId);
                    if (pomTesty[i].testId == pom[j].testId) {
                        isItAlready = true;
                        break;
                    }
                }

                if (isItAlready == false) {
                    // console.log("pushuje pomTesty[i]" + pomTesty[i]);
                    pom.push(pomTesty[i])
                }
            };
            testy = pom.filter(n => n.testId!='');
            // console.log("testy" + testy);

        })
            .finally(() => {
                this.setState({
                    selectedCandidate: nameCandidate,
                    isCandidateSelected: true,
                    availableTests: testy,
                    selectedTests: selectedTests,
                })
            });

    };
    addTest = (event) => {
        let testID = event.target.getAttribute('testID');
        let testTitle = event.target.getAttribute('testTitle');
        // console.log("testID  : " + testID);
        const selectedTests = this.state.selectedTests.slice();
        for (var i = 0; i < selectedTests.length; i++) {
            if (selectedTests[i].testId == testID) {
                return
            }
        }
        selectedTests.push({
            testId: testID,
            testTitle: testTitle,
        });
        this.setState({
            selectedTests: selectedTests,
        })
    };
    removeTest = (event) => {
        let testIDToRemove = event.target.getAttribute('testID');
        console.log("testIDToRemove  : " + testIDToRemove);
        let selectedTests = this.state.selectedTests.slice();
        selectedTests = selectedTests.filter(test => test.testId != testIDToRemove);
        this.setState({
            selectedTests: selectedTests,
        })
    };


    render() {


        const selectedCandidate = this.state.selectedCandidate;
        const isCandidateSelected = this.state.isCandidateSelected;
        const candidateList = this.state.candidateList;
        const availableTests = this.state.availableTests;
        const selectedTests = this.state.selectedTests;

        // console.log("availableTests: " + availableTests.toSource());

        if(!this.state.loaded) {
            return (
              <div>
                <h1>Loading...</h1>
              </div>
            );
          }
          else return (
            <div className="AddTestToCandidate">
                <div className="lander">
                    <label>Selected candidate: {selectedCandidate} </label>
                    <button onClick={this.cancel}>Cancel</button>
                    {isCandidateSelected == true ?
                        <>
                            <button onClick={this.save}>Save</button>
                        </> : null}
                    <br/>

                    {isCandidateSelected == false ?
                        <>
                            {candidateList.map(c =>
                                (<div>
                                        <h1>Candidate: {c}</h1>
                                        <button onClick={this.selectCandidate} nameCandidate={c}>Select candidate
                                        </button>
                                    </div>
                                )
                            )}
                        </>
                        :
                        <>
                            <div className="AvailableTest">
                                <h1>Available tests:</h1>
                                {availableTests.map(c =>
                                    (<div>
                                            <h>Test title {c.testTitle} </h>
                                            <button onClick={this.addTest} testID={c.testId} testTitle={c.testTitle}>Add
                                                test
                                            </button>
                                        </div>
                                    )
                                )}
                            </div>
                            <div className="SelectedTest">
                                <h1>Selected tests:</h1>
                                {selectedTests.map(c =>
                                    (<div>
                                            <h>Test title {c.testTitle}</h>
                                            <button onClick={this.removeTest} testID={c.testId}
                                                    testTitle={c.testTitle}>Remove test
                                            </button>
                                        </div>
                                    )
                                )}
                            </div>
                        </>
                    }


                </div>
            </div>


        );
    }
}

export default AddTestToCandidate;

import React, {Component} from "react";
import "./AddTest.css";
import {cognitoidentityserviceprovider} from "./CognitoUsers";
import {params} from "./CognitoUsers";
import {Button} from "reactstrap";
import {Link} from "react-router-dom";
import Test from "./Test";

class AddTestToCandidate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCandidate: '',
            isCandidateSelected: false,
            candidateList: [],
            availableTests: [],
            selectedTests: [],
        };

        this.selectCandidate = this.selectCandidate.bind(this);
        this.cancel = this.cancel.bind(this);
        this.save = this.save.bind(this);
        this.addTest = this.addTest.bind(this);
        this.removeTest = this.removeTest.bind(this);
    }

    componentDidMount = () => {
        cognitoidentityserviceprovider.listUsers(params, (err, data) => {
            if (err)
                console.log(err, err.stack);
            else {
                // const sprawdzam = data.Users.map(cand => cand.Attributes);
                // console.log("sprawdzam    : " + sprawdzam.length);
                 console.log("data    : " + data.toSource());
                // for (let i = 0; i < sprawdzam.length; i++){
                //     console.log("mail    : " + data.Users[i].Attributes[0].Value);
                // }

              //  0 = "email_verified", 1 = "email"
                this.setState({
                    candidateList: data.Users.filter(cand => cand.Attributes[0].Value=='false').map(cand => cand.Attributes[1].Value)
                });
                // console.log("data.Users    : " + data.toSource());
                // console.log("  candidateList  : " + this.state.candidateList.toSource());

            }

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
        this.setState({
            selectedCandidate: '',
            isCandidateSelected: false,
            availableTests: [],
            selectedTests: [],
        })
    };

    selectCandidate = (event) => {
        let nameCandidate = event.target.getAttribute('nameCandidate');
        console.log("nameCandidate  : " +nameCandidate);
        // pobranie testow
        let testy = null;
        fetch('https://nbbmfshcof.execute-api.us-east-1.amazonaws.com/test/emptytest')
            .then((response)=>{return response.json()})
            .then((data)=>{
                console.log("testy: "+data.toSource());
                testy = data["Items"].map(n => n.testTittle);
                console.log("testy w metodzie: "+testy);
            })
            .finally(() =>
            {
                console.log("testy po metodzie: " + testy);
                // pobranie testow jakie ma juz kandydat
                this.setState({
                    selectedCandidate: nameCandidate,
                    isCandidateSelected: true,
                    availableTests: testy,
                })
            });

    };
    addTest = (event) => {
        let test = event.target.getAttribute('test');
        console.log("test  : " +test);
        const selectedTests = this.state.selectedTests.slice();
        selectedTests.push(test);
                this.setState({
                    selectedTests: selectedTests,
                })
    };
    removeTest = (event) => {
        let testToRemove = event.target.getAttribute('test');
        console.log("test  : " +testToRemove);
        let selectedTests = this.state.selectedTests.slice();
        selectedTests = selectedTests.filter(test => test!=testToRemove);
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

        console.log("candidateList  : " +this.state.candidateList);
        console.log("selectedTests: "+selectedTests);

        return (
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
                            ( <div>
                                <h1>Candidate: {c}</h1>
                                <button onClick={this.selectCandidate} nameCandidate={c}>Select candidate</button>
                            </div>
                            )

                        )}
                    </>
                    :
                        <>
                        <div className="AvailableTest">
                            <h1>Available tests:</h1>
                            {availableTests.map(c =>
                                ( <div>
                                        <h>Test title {c} </h>
                                        <button onClick={this.addTest} test={c}>Add test</button>
                                    </div>
                                )

                            )}
                        </div>
                            <div className="SelectedTest">
                                <h1>Selected tests:</h1>
                                {selectedTests.map(c =>
                                    ( <div>
                                            <h>Test title {c}</h>
                                            <button onClick={this.removeTest} test={c}>Remove test</button>
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

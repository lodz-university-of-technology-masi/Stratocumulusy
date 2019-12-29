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
        };
        this.selectCandidate = this.selectCandidate.bind(this);
        this.cancel = this.cancel.bind(this);
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
        })
    };

    selectCandidate = (event) => {
        let nameCandidate = event.target.getAttribute('nameCandidate');
        console.log("nameCandidate  : " +nameCandidate);
        this.setState({
            selectedCandidate: nameCandidate,
            isCandidateSelected: true,
        })
    };




    render() {


        const selectedCandidate = this.state.selectedCandidate;
        const isCandidateSelected = this.state.isCandidateSelected;
        const candidateList = this.state.candidateList;
        console.log("candidateList  : " +this.state.candidateList);

        return (
            <div className="AddTestToCandidate">
                <div className="lander">
                    <label>Selected candidate: {selectedCandidate} </label>
                    <button onClick={this.cancel}>Cancel</button>
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
                    :null
                    }


                </div>
            </div>


        );
    }
}

export default AddTestToCandidate;

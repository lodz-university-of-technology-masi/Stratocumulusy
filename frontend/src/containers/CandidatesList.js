import React, {Component} from "react";
import "./AddTest.css";
import {cognitoidentityserviceprovider} from "./CognitoUsers";
import {params} from "./CognitoUsers";

class CandidateList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCandidate: '',
            isCandidateSelected: false,
            candidateList: [],
        };
    }

    componentDidMount = () => {
        // pobranie uzytkownikow
        cognitoidentityserviceprovider.listUsers(params, (err, data) => {
            if (err)
                console.log(err, err.stack);
            else {
              
                this.setState({
                    candidateList: data.Users.filter(cand => cand.Attributes[0].Value == 'false').map(cand => cand.Attributes[1].Value)
                });
            }
            
        });
    };

    render() {
        const candidateList = this.state.candidateList;


        return (
            <div className="AddTestToCandidate">
                <div className="lander">
                    <label>Candidate's list </label>
                    <br/>

                        <>
                            {candidateList.map(c =>
                                (<div>
                                        <h1>Candidate: {c}</h1>
                                        <button onClick={() => {
                                            cognitoidentityserviceprovider.adminDeleteUser({
                                                UserPoolId: "us-east-1_NBg2oASBN",
                                                Username: c,
                                              }).promise();
                                              window.location.reload(false);
                                        }} nameCandidate={c}>Remove Candidate
                                        </button>
                                    </div>
                                )
                            )}
                        </>

                        <>
            
                        </>
                    


                </div>
            </div>


        );
    }
}



export default CandidateList;

import React, {Component} from "react";
import "./AddTest.css";
import {cognitoidentityserviceprovider} from "./CognitoUsers";
import {params} from "./CognitoUsers";

function reloadPage() {
    window.location.reload();
}

class CandidateList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCandidate: '',
            isCandidateSelected: false,
            candidateList: []
        };
    }

    componentDidMount = () => {

        // pobranie uzytkownikow
        let candidateList = null;

            fetch("https://nbbmfshcof.execute-api.us-east-1.amazonaws.com/test/getlallcandidate").then((response) => {
                return response.json()
            })
            .then((data) => {
                let temp = data["users"];
                candidateList = temp.map(cand => (
                    {
                        username: cand['username'],
                        email: cand['attributes'][1].value
                    })
                );                
            }).finally(() => {
                this.setState({
                    candidateList: candidateList,
                })
            });
    };

    


    render() {
        const allUsers = this.state.allUsers;
        const candidateList = this.state.candidateList;


        return (
            <div className="AddTestToCandidate">
                <div className="candidates">
                    <h2>Candidate list </h2>
                    <br/>

                        <>
                            {candidateList.map(c =>
                                (<div>
                                        <h1>Candidate: {c.email}</h1>
                                        <button onClick={() => (fetch('https://nbbmfshcof.execute-api.us-east-1.amazonaws.com/test/user', {
                                        dataType: "json",
                                        method: 'DELETE',
                                        body: JSON.stringify({"user": c.username}),
                                        headers: {
                                            "Content-type": "application/json; charset=UTF-8"
                                        }}).finally(() => reloadPage()))   
                                        } nameCandidate={c.username}>Remove User
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

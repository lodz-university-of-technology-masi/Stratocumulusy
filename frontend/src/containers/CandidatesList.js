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
            allUsers: [],
            candidateList: []
        };
    }

    componentDidMount = () => {

        // pobranie uzytkownikow
        let allUsers = null;
        let candidateList = null;
        fetch("https://nbbmfshcof.execute-api.us-east-1.amazonaws.com/test/getAllUsers").then((response) => {
                return response.json()
            })
            .then((data) => {

                let temp = data["users"];
                allUsers = temp.map(cand => (
                    {
                        username: cand['username'],
                        email: cand['attributes'][2].value
                    })
                );                
            }).finally(() => {
                this.setState({
                    allUsers: allUsers,
                })
            });

            fetch("https://nbbmfshcof.execute-api.us-east-1.amazonaws.com/test/getlallcandidate").then((response) => {
                return response.json()
            })
            .then((data) => {
                let temp = data["users"];
                candidateList = temp.map(cand => (
                    {
                        username: cand['username'],
                        email: cand['attributes'][2].value
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
                <div className="lander">
                    <h2>All users list </h2>
                    <br/>

                        <>
                            {allUsers.map(c =>
                                (<div>
                                        <h1>User: {c.email}</h1>
                                        <button onClick={() => {
                                            console.log(JSON.stringify(c.username));
                                             fetch('https://nbbmfshcof.execute-api.us-east-1.amazonaws.com/test/user', {
                                                dataType: "json",
                                                method: 'POST',
                                                body: JSON.stringify(c.username),
                                                headers: {
                                                    'content-type' : "application/json",
                                                }
                                            });
                                        
                                        }} nameCandidate={c.username}>Add User to  Candidate User Group
                                        </button>
                                        <button onClick={() => {
                                             fetch('https://nbbmfshcof.execute-api.us-east-1.amazonaws.com/test/user', {
                                                dataType: "json",
                                                method: 'DELETE',
                                                body: JSON.stringify(c.username),
                                                headers: {
                                                    "Content-type": "application/json"
                                                }
                                            });
                                            window.location.reload(false);
                                        }} nameCandidate={c.username}>Remove User
                                        </button>
                                    </div>
                                )
                            )}
                        </>

                        <>
            
                        </>
                    


                </div>
                <div className="candidates">
                    <h2>Candidate list </h2>
                    <br/>

                        <>
                            {candidateList.map(c =>
                                (<div>
                                        <h1>Candidate: {c.email}</h1>
                                        <button onClick={() => {
                                             fetch('https://nbbmfshcof.execute-api.us-east-1.amazonaws.com/test/user', {
                                                dataType: "json",
                                                method: 'DELETE',
                                                body: JSON.stringify(c.username),
                                                headers: {
                                                    "Content-type": "application/json"
                                                }
                                            });
                                            window.location.reload(false);
                                        }} nameCandidate={c.username}>Remove User
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

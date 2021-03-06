import React, { Component } from "react";
import "./Results.css";
import {Auth} from "aws-amplify";



class Results extends Component {
        constructor(props) {
            super(props)
            this.state = {
                testy: [],
                currentUserEmail: '',
                loaded: false
            }
        }
        componentDidMount = () => {
            let testy = [];
            fetch('https://nbbmfshcof.execute-api.us-east-1.amazonaws.com/test/solvedtest')
                .then((response)=>{return response.json()})
                .then((data)=>{
                    this.testy = data;

                }).finally(() => {
                this.setState({
                    testy: this.testy,
                    loaded: true
                })

            });
            Auth.currentSession()
                .then(data => {
                    let idToken = data.getIdToken();

                    let email = idToken.payload.email;

                    this.setState({
                        currentUserEmail: email,
                    })

                })
                .catch(err => console.log(err));
        }
        render() {
            const testy = this.state.testy;
            const currentUserEmail = this.state.currentUserEmail;

            if(!this.state.loaded) {
                return (
                  <div>
                    <h1>Loading...</h1>
                  </div>
                );
              }
              else return (
                <div>
                    <div>
                        <h1>Results:</h1>
                        {testy.map((c,index) =>{
                            if(currentUserEmail != c.candidateEmail)
                                return null;
                            if(c.points == '-'){
                               return <h1>Test {c.testTitle}: no check yet</h1>
                            }else{
                                return <h1>Test {c.testTitle}:  {c.points}/{c.questions.length}</h1>
                            }

                        }

                        )}
                    </div>

                </div>
            );
        }
}
export default Results;

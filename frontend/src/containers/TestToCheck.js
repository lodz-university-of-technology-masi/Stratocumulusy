import React, {Component} from "react";
import CheckTest from "./CheckTest";
import {Auth} from "aws-amplify";


class TestToCheck extends Component {
    constructor(props) {
        super(props)
        this.state = {
            testy: [],
            recruiterEmail: '',
            loaded: false
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
        fetch('https://nbbmfshcof.execute-api.us-east-1.amazonaws.com/test/solvedtest')
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                this.testy = data;
            }).finally(() => {
            this.setState({
                testy: this.testy,
                loaded: true
            })
        });
    }

    render() {
        const testy = this.state.testy;
        const recruiterEmail = this.state.recruiterEmail;

        if(!this.state.loaded) {
            return (
              <div>
                <h1>Loading...</h1>
              </div>
            );
          }
          else return (
            <div>
                <h1>Select test to check:</h1>
                {testy.map((c, index) => {
                    let testRecruiterEmail = c.recruterEmail;
                    if (testRecruiterEmail == recruiterEmail) {
                        if (c.points == '-') {
                            return <CheckTest id={index} title={c.testTitle}
                                              testId={c.testId} questions={c.questions}
                                              candidateEmail={c.candidateEmail} recruiterEmail={recruiterEmail}/>;
                        } else {
                            return null;
                        }
                    } else {
                        return null
                    }
                })

                }
            </div>
        );
    }
}

export default TestToCheck;
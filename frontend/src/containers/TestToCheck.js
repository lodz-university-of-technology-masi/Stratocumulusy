import React, { Component } from "react";
import CheckTest from "./CheckTest";



class TestToCheck extends Component {
    constructor(props) {
        super(props)
        this.state = {
            testy: []
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
                testy: this.testy
            })
        });
    }

    render() {
        const testy = this.state.testy;
        return (
            <div>
                <h1>Select test to check:</h1>
                {testy.map((c,index) =>{
                    if(c.points=='-'){
                        return <CheckTest id={index} title={c.testTitle}
                                   testId={c.testId} questions={c.questions} candidateEmail={c.candidateEmail} />;
                    } else {
                    return null;
                }})

                }
            </div>
        );
    }
}

export default TestToCheck;
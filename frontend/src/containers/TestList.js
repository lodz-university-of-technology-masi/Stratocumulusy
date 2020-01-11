import React, { Component } from "react";
import "./TestList.css";
import Test from "./Test";

class TestList extends Component {
  constructor(props) {
    super(props)
      this.state = {
          testy: [],
      }
    this.loadFromDB();
  }




        loadFromDB() {
            fetch('https://nbbmfshcof.execute-api.us-east-1.amazonaws.com/test/emptytest')
                .then((response)=>{return response.json()})
                .then((data)=>{
                    console.log(data);
                    this.setState({
                        testy: data,
                    })

                });
        }



  render() {
      const testy = this.state.testy;
    return (
      <div>
        {testy.map((c,index) => <Test id={index} title={c.testTitle} testId={c.testId} questions={c.questions}/>)}
  </div> 
          );
  }
}

export default TestList;

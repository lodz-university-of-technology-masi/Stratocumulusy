import React, { Component } from "react";
import {Button} from "reactstrap"
import {Link} from "react-router-dom";

class TestList extends Component {
  constructor(props) {
    super(props)
    this.loadFromDB();
  }

  liczbaTestow = 0
  listaTytulow = []


  loadFromDB() {
    fetch('https://nbbmfshcof.execute-api.us-east-1.amazonaws.com/test/emptytest')
            .then((response)=>{return response.json()})
            .then((data)=>{
            this.liczbaTestow = data.Count;
            for(let i=0; i<this.liczbaTestow; i++) {
              this.listaTytulow.push(data.Items[i].testTittle)
            }
            this.setState({})})
}

  render() {
    return (
            <div>
                <h2>List of tests: </h2>
                  {this.listaTytulow.map(s => <div><Link to={{pathname:''}}>{s}</Link></div>)}  
              </div>
          );
  }
}

export default TestList;

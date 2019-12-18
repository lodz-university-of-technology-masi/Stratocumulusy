import React, { Component } from "react";


class CustomerManager extends Component {
  constructor(props) {
    super(props)
    this.state = {name: 'World'}
    this.updateName = this.updateName.bind(this)

  }

  updateName() {
        fetch('https://hw8oxcfnde.execute-api.us-east-1.amazonaws.com/test/entries')
        .then((response)=>{return response.json()})
        .then((data)=>{
          var res = JSON.parse(data.body);
          this.setState({name:res['name']})})
      }

  render() {
    return (
            <div className="CustomerMenager">
              <div className="lander">
                <h2> Hello {this.state.name}</h2>
                <button onClick={this.updateName}>Update Name</button>
              </div>
            </div>
          );
  }
}

 export default CustomerManager;

import React, { Component } from 'react'

export default class Greet extends Component {
    constructor(props){
        super(props);
        this.state = {
            message: "Previous/Initial State",
            count: 1
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit(){
        fetch('https://abracadabrant-mandarine-80539.herokuapp.com/')
        .then(response => response.json())
        .then( data => {
            this.setState({
                message: data.message
            })
        })
        this.setState({
            count: this.state.count + 1
        })
    }
    
  render() {
    return (
      <React.Fragment>
          <p>{this.state.message}, this is the new state numbered {this.state.count}</p>
          <p> {this.state.count} </p>
          <button onClick={this.handleSubmit}>Change State</button>
      </React.Fragment>
    )
  }
}

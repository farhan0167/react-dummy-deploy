import React, { Component } from 'react'
import HellosChilren from './helloschildren'

export default class Hello extends Component {
  render() {
    return (
    <React.Fragment>
      <div>Hello {this.props.name}</div>
     <HellosChilren name={this.props.name}/>
    </React.Fragment>
    )
  }
}

import React, { Component } from 'react'

export default class HellosChilren extends Component {

  render() {
    return (
      <div>{this.props.name}, its a child of Hello</div>
    )
  }
}

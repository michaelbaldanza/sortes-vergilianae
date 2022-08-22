import React, { Component } from 'react';
import './Line.css';

export class Line extends Component {
  render() {
    return (
      <div key={this.props.line.line}>
        {this.props.line.text}
      </div >
    );
  }
}

export default Line;
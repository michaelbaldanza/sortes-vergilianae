import React, { Component } from 'react';
import './Line.css';

export class Line extends Component {
  render() {
    const lineNum = this.props.poetry.line % 5 === 0 ? this.props.poetry.line.toString() : '';

    return (
      <div id={this.props.poetry.book.toString() + 'x' + this.props.poetry.line.toString()} className="line">
        {this.props.poetry.text}
        <div className="line-num">
          {lineNum}
        </div>
      </div>
    );
  }
}

export default Line;
import React, { Component } from 'react';
import './Line.css';

export class Line extends Component {
  render() {
    const roNum = [
      null, 'I', 'II', 'III', 'IV', 'V', 'VI',
      'VII', 'VIII', 'IX', 'X', 'XI', 'XII'
    ];
    console.log(`The line number is ${this.props.poetry.line}`);
    const lineNum = this.props.poetry.line % 5 === 0 ? this.props.poetry.line.toString() : '';
    console.log(`A line divisible by 5: ${lineNum}`);

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
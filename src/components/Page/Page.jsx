import React, { Component } from 'react';
import './Page.css';
import Line from '../Line/Line';

export class Page extends Component {
  render () {
    const roNum = [
      null, 'I', 'II', 'III', 'IV', 'V', 'VI',
      'VII', 'VIII', 'IX', 'X', 'XI', 'XII'
    ];
    let verses;
    const lines = this.props.lines;
    const loading = this.props.loading;
    const bookNum = lines ? roNum[lines[0].book] : '';
    const firstLine = lines ? lines[0].line.toString() : '';
    const lastLine = lines ? lines[lines.length - 1].line.toString() : '';
    const citation =  lines && !loading ? bookNum + '.' + firstLine + '-' + lastLine : '';
    if (!loading && lines) {
      verses = lines.map((l) => (
        <Line poetry={l} key={l.book.toString() + 'x' + l.line.toString()} />
      ));
    } else if ((loading && lines) || (loading && !lines)) {
      verses = <span>divining...</span>;
    }
    return (
      <div id="page">
        <div id="divination">
          {verses}
          <div id="citation">
            {citation}
          </div>
        </div>
      </div>
    );
  }
}

export default Page;
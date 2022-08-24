import React, { Component } from 'react';
import './App.css';
import { getPassage, randInt } from './aeneid-api.js';

import Line from './components/Line/Line';
import Page from './components/Page/Page';

const api = 'http://api.aeneid.eu/versions/'


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lines: null,
    };
  }

  async handleClick(version) {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    let nextLine;
    const lineArr = [];
    const bookNum = randInt(1, 13).toString();
    let url = api + version + '/' + bookNum;
    const randomBook = await fetch(url).then(res => res.json());
    const upperBound = randomBook.lines;
    const lineNum = randInt(1, upperBound);
    for (let i = 0; i < 10; i++) {
      let lineStr = (lineNum + i).toString();
      await fetch(url + '/' + lineStr)
        .then((res => res.json()))
        .then(lineObj => {
          console.log(lineObj)
          console.log(lineObj.line)
          lineArr.push(lineObj);
        })
      await sleep(1001);
    }
    this.setState({lines: lineArr, version: version});
  }

  divine(language) {
    getPassage('latin').then(result => this.setState({
      lines: result,
    }));
  }

  renderLines() {
    return <div>lines</div>;
  }

  render() {
    const lines = this.state.lines;
    const roNum = [
      null, 'I', 'II', 'III', 'IV', 'V', 'VI',
      'VII', 'VIII', 'IX', 'X', 'XI', 'XII'
    ];
    if (lines) {
      const bookNum = roNum[lines[0].book];
      const firstLine = lines[0].line.toString();
      const lastLine = lines[lines.length - 1].line.toString();
      const citation =  bookNum + '.' + firstLine + '-' + lastLine;
      return (
        <div id="webpage">
          <header>
            <h1>
              <span className="header-word">S O R T E S</span><span className="header-word">V E R G I L I A N A E</span>
            </h1>
          </header>
          <div id="page">
            <div id="divination">
              {
                lines.map((l) => (
                  <Line poetry={l} key={l.book.toString() + 'x' + l.line.toString()} />
                ))
              }
              <div id="citation">
                {citation}
              </div>
            </div>
          </div>
          <div id="button-container">
              <button className="language" onClick={() => this.handleClick('latin')}>
                Latin
              </button>
              <button className="language" onClick={() => this.handleClick('dryden')}>
                Dryden
              </button>
            </div>
        </div>
      )
    }
    return (
      <div id="webpage">
        <header>
          <h1>
            <span className="header-word">S O R T E S</span><span className="header-word">V E R G I L I A N A E</span>
          </h1>
        </header>
        <div id="page">
          <table id="divination">
            {lines}
          </table>
        </div>
        <div id="button-container">
          <button className="language" onClick={() => this.handleClick('latin')}>
            Latin
          </button>
          <button className="language" onClick={() => this.handleClick('dryden')}>
            Dryden
          </button>
        </div>
      </div>
    )
  }
}

export default App;

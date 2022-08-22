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
          console.log(lineObj.line)
          lineArr.push(lineObj);
        })
      await sleep(1001);
    }
    this.setState({lines: lineArr});
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
    if (lines) return (
      <div id="page">
        <div id="button-container">
          <div className="language" onClick={() => this.handleClick('latin')}>
            Latin
          </div>
          <div className="language" onClick={() => this.handleClick('dryden')}>
            Dryden
          </div>
        </div>
        <div id="divination">
          {
            lines.map((line) => (
              <Line line={line} />
            ))
          }
        </div>
      </div>
    )
    return (
      <div id="page">
        <div id="button-container">
          <div className="language" onClick={() => this.handleClick('latin')}>
            Latin
          </div>
          <div className="language" onClick={() => this.handleClick('dryden')}>
            Dryden
          </div>
        </div>
        <div id="divination">
          {lines}
        </div>
      </div>
    )
  }
}

export default App;

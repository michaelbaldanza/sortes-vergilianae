import React from 'react';
import './App.css';
import { getPassage } from './aeneid-api.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      line: '',

    };
  }

  handleClick(version) {
    getPassage(version).then(result => this.setState({
      line: result
    }));
  }

  divine(language) {
    getPassage('latin').then(result => this.setState({
      line: result,
    }));
  }
  render() {
    return (
      <div id="page">
        <div id="divination">
        { this.state.line }
        </div>
        <div id="container">
          <div className="language" onClick={() => this.handleClick('latin')}>
            Latin
          </div>
          <div className="language" onClick={() => this.handleClick('dryden')}>
            Dryden
          </div>
        </div>
      </div>
    )
  }
}

export default App;

import React, { Component } from 'react';
import './Page.css';
import Line from '../Line/Line';

export class Page extends Component {
  render () {
    return (
      <div>
        <Line/>
        <Line/>
        <Line/>
        Hello, I'm the Page
      </div>
    );
  }
}

export default Page;
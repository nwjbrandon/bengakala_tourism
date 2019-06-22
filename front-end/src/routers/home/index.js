import React, { Component } from 'react';
import Background from '../../components/home/background'
import Content from '../../components/home/content.container'

class App extends Component {
  render() {
    return(
      <div>
        <Background />
        <Content />
      </div>
    );
  }
}

export default App

import React, { Component } from 'react';
import Background from '../../components/home/background'
import Content from '../../components/home/content.container'
import Navbar from "../../components/navBar/navbar";

class App extends Component {
  render() {
    return(
      <div>
          <Navbar />
          <Background />
        <Content />
      </div>
    );
  }
}

export default App

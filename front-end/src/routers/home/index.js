import React, {Component} from 'react';
import ReactDOM from 'react-dom';
//import App from './App';

import Navbar from '../../components/navbar.js'
import Background from './components/background.js'
import Middlenav from './components/middlenav.js'
import Content from './components/content.js'

class App extends Component {
  render() {
    return(
      <div>
        <Background />
        {//<Middlenav />
        }
        <Content />
      </div>
    );
  }
}

export default App

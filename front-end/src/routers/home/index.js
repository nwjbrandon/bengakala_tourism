import React, {Component} from 'react';
import ReactDOM from 'react-dom';
//import App from './App';
import Navigation from './Components/Navigation.js';
import Header from './Components/Header.js';
import Second from './Components/Second.js';
import Third from './Components/Third.js';
import Fourth from './Components/Fourth.js';
import Fifth from './Components/Fifth.js';
import Six from './Components/Six.js';


class App extends Component {
  render() {
    return(
      <div>
        <Navigation Logo="Bengkala Village" />
        <div><Header title="The Story of us ALL"/></div>
          <div><Second /></div>
          <div><Third /></div>
          <div><Fourth /></div>
          <div><Fifth /></div>
          <div><Six /></div>
      </div>

    );
  }
}

export default App

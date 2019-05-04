import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import * as serviceWorker from './Serviceworker';
import About from './About'
import Accomodation from './Accomodation'
import Admin from './Admin'
import App from './App'
import Attraction from './Attraction'
import Contact from './Contact'
import Faq from './Faq'
import Notfound from './Notfound'
import Payment from './Payment'
import Welcome from './Welcome'
import './index.css';

const routing = (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/about" component={About} />
          <Route exact path="/accomodation" component={Accomodation} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/attraction" component={Attraction} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/faq" component={Faq} />
          <Route exact path="/payment" component={Payment} />
          <Route exact path="/welcome" component={Welcome} />
          <Route component={Notfound} />
        </Switch>
      </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

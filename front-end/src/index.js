import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { PersistGate } from 'redux-persist/integration/react';

import createSagaMiddleware from "redux-saga";

// Non Protected Routes
import About from './routers/about';
import Accommodation from './routers/accommodation';
import Home from './routers/home';
import Attraction from './routers/attraction';
import Contact from './routers/contact';
import Faq from './routers/faq';
import Notfound from './routers/notfound';
import Payment from './routers/payment';

// Protected Routes
import Admin from './routers/admin';
import Dashboard from './routers/dashboard';
import DashboardAbout from './routers/dashboard/about';
import DashboardAccommodation from './routers/dashboard/accommodation';
import DashboardAttraction from './routers/dashboard/attraction';
import DashboardContact from './routers/dashboard/contact';
import DashboardFAQ from './routers/dashboard/faq';
import DashboardHome from './routers/dashboard/home';
import DashboardPayment from './routers/dashboard/payment';
import DashboardSettings from './routers/dashboard/settings';

import rootReducers from './reducers';
import rootSagas from "./sagas";

const persistConfig = {
  key: 'root',
  storage,
};
const sagaMiddleware = createSagaMiddleware();
const enhancers = composeWithDevTools(
    applyMiddleware(sagaMiddleware)
);
const persistedReducer = persistReducer(persistConfig, rootReducers);
const store = createStore(
    persistedReducer,
    enhancers
);
sagaMiddleware.run(rootSagas);
const persistor = persistStore(store);

const routing = (
    <Provider store={ store }>
      <PersistGate persistor={ persistor } loading={null}>
        <Router>
          <Switch>
            <Route exact path="/" component={ Home } />
            <Route exact path="/about" component={ About } />
            <Route exact path="/accommodation" component={ Accommodation} />
            <Route exact path="/admin" component={ Admin } />
            <Route exact path="/attraction" component={ Attraction } />
            <Route exact path="/contact" component={ Contact } />
            <Route exact path="/faq" component={ Faq } />
            <Route exact path="/payment" component={ Payment } />
            <Route exact path="/dashboard" component={ Dashboard } />
            <Route exact path="/dashboard/about" component={ DashboardAbout } />
            <Route exact path="/dashboard/accommodation" component={ DashboardAccommodation } />
            <Route exact path="/dashboard/attraction" component={ DashboardAttraction } />
            <Route exact path="/dashboard/contact" component={ DashboardContact } />
            <Route exact path="/dashboard/faq" component={ DashboardFAQ } />
            <Route exact path="/dashboard/home" component={ DashboardHome } />
            <Route exact path="/dashboard/payment" component={ DashboardPayment } />
            <Route exact path="/dashboard/settings" component={ DashboardSettings } />
            <Route component={ Notfound } />
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
);

ReactDOM.render(routing, document.getElementById('root'));

module.hot.accept();

import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, Router } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { PersistGate } from 'redux-persist/integration/react';

import createSagaMiddleware from "redux-saga";

import { routerMiddleware, ConnectedRouter } from 'connected-react-router';

// Non Protected Routes
import Accommodation from './routers/booking';
import Home from './routers/home';
import Attraction from './routers/media';
import Contact from './routers/contact/container';
import Faq from './routers/faq/container';
import Notfound from './routers/notfound';
import Payment from './routers/payment';
import Tutorial from './routers/resources'

// Protected Routes
import Admin from './routers/admin/container';
import Dashboard from './routers/dashboard/container';
import DashboardAccommodation from './routers/dashboard/booking/container';
import DashboardAttraction from './routers/dashboard/media/container';
import DashboardContact from './routers/dashboard/contact/container';
import DashboardFAQ from './routers/dashboard/faq/container';
import DashboardHome from './routers/dashboard/home/container';
import DashboardSettings from './routers/dashboard/settings/container';

// tmp solution to get rid of white gaps around the browser
import './global.css'

import ProtectedRoutes from './app';
import Navbar from './components/navBar/navbar'
import rootReducers from './reducers';
import rootSagas from "./sagas";

import { createBrowserHistory } from 'history';
export const history = createBrowserHistory();

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['contact', 'toast']
};
const sagaMiddleware = createSagaMiddleware();
const enhancers = composeWithDevTools(
    //compose(applyMiddleware(sagaMiddleware, routerMiddleware(history()))),
    applyMiddleware(sagaMiddleware, routerMiddleware(history)),
);

const persistedReducer = persistReducer(persistConfig, rootReducers(history));
const store = createStore(
    persistedReducer,
    enhancers,
);
sagaMiddleware.run(rootSagas);
const persistor = persistStore(store);

const routing = (
    <Provider store={ store }>
      <PersistGate persistor={ persistor } loading={null}>
        <Router history={history}>
          <Switch>
            <ProtectedRoutes exact path="/" component={ Home } secret={false} />
            <ProtectedRoutes exact path="/booking" component={ Accommodation } secret={false} />
            <ProtectedRoutes exact path="/resources" component={ Tutorial } secret={false} />
            <ProtectedRoutes exact path="/admin" component={ Admin } secret={false} />
            <ProtectedRoutes exact path="/media" component={ Attraction } secret={false} />
            <ProtectedRoutes exact path="/contact" component={ Contact } secret={false} />
            <ProtectedRoutes exact path="/faq" component={ Faq } secret={false} />
            <ProtectedRoutes exact path="/payment" component={ Payment } secret={false} />

            <ProtectedRoutes exact path="/dashboard" component={ Dashboard } secret={true} />
            <ProtectedRoutes exact path="/dashboard/booking" component={ DashboardAccommodation } secret={true} />
            <ProtectedRoutes exact path="/dashboard/media" component={ DashboardAttraction } secret={true} />
            <ProtectedRoutes exact path="/dashboard/contact" component={ DashboardContact } secret={true} />
            <ProtectedRoutes exact path="/dashboard/faq" component={ DashboardFAQ } secret={true} />
            <ProtectedRoutes exact path="/dashboard/home" component={ DashboardHome } secret={true} />
            <ProtectedRoutes exact path="/dashboard/settings" component={ DashboardSettings } secret={true} />
            
            <Route component={ Notfound } />
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
);

ReactDOM.render(routing, document.getElementById('root'));

module.hot.accept();

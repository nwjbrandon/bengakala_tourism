import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, Router } from 'react-router-dom';
import IdleTimer from 'react-idle-timer'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import _includes from 'lodash/includes';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { PersistGate } from 'redux-persist/integration/react';

import createSagaMiddleware from "redux-saga";

import { routerMiddleware, } from 'connected-react-router';

// Non Protected Routes
import Accommodation from './routers/booking';
import Home from './routers/home';
import Stories from './routers/stories/container';
import Contact from './routers/contact/container';
import Faq from './routers/faq/container';
import Notfound from './routers/notfound';
import Explore from './routers/explore/container'
import Story from './routers/story/container';

// Protected Routes
import Admin from './routers/admin/container';
import Dashboard from './routers/dashboard/container';
import DashboardAccommodation from './routers/dashboard/booking/container';
import DashboardStories from './routers/dashboard/stories/container';
import DashboardContact from './routers/dashboard/contact/container';
import DashboardFAQ from './routers/dashboard/faq/container';
import DashboardHome from './routers/dashboard/home/container';
import DashboardExplore from './routers/dashboard/explore/container';
import DashboardSettings from './routers/dashboard/settings/container';

// tmp solution to get rid of white gaps around the browser
import './global.css'

import ProtectedRoutes from './app';
import rootReducers from './reducers';
import rootSagas from "./sagas";
import { ADMIN_LOGOUT_REQUEST } from "./actions/admin";
import { createBrowserHistory } from 'history';
export const history = createBrowserHistory();

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [
    'toast',
    'dashboard',
    'dashboardFaq',
    'dashboardContact',
    'dashboardBooking',
    'dashboardStories',
    'dashboardHome',
    'dashboardSettings',
    'dashboardExplore',
    'contact',
    'stories',
    'home',
    'faq',
    'explore',
    'booking',
    'story'
  ]
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

const onIdle = () => {
  if (_includes([
      '/dashboard',
      '/dashboard/home',
      '/dashboard/booking',
      '/dashboard/stories',
      '/dashboard/settings',
      '/dashboard/contact',
      '/dashboard/faq',
      '/dashboard/explore'
  ], window.location.pathname)) {
    store.dispatch(ADMIN_LOGOUT_REQUEST());
  }
};

const routing = (
    <Provider store={ store }>
      <PersistGate persistor={ persistor } loading={null}>
        <IdleTimer
            onIdle={onIdle}
            debounce={250}
            timeout={1000 * 60 * 30} />
        <Router history={history}>
          <Switch>
            <ProtectedRoutes exact path="/" component={ Home } secret={false} />
            <ProtectedRoutes exact path="/booking" component={ Accommodation } secret={false} />
            <ProtectedRoutes exact path="/explore" component={ Explore } secret={false} />
            <ProtectedRoutes exact path="/admin" component={ Admin } secret={false} />
            <ProtectedRoutes exact path="/stories" component={ Stories } secret={false} />
            <ProtectedRoutes exact path="/contact" component={ Contact } secret={false} />
            <ProtectedRoutes exact path="/faq" component={ Faq } secret={false} />
            <ProtectedRoutes path="/story/:tag" component={ Story } secret={false} />

            <ProtectedRoutes exact path="/dashboard" component={ Dashboard } secret={true} />
            <ProtectedRoutes exact path="/dashboard/booking" component={ DashboardAccommodation } secret={true} />
            <ProtectedRoutes exact path="/dashboard/stories" component={ DashboardStories } secret={true} />
            <ProtectedRoutes exact path="/dashboard/contact" component={ DashboardContact } secret={true} />
            <ProtectedRoutes exact path="/dashboard/faq" component={ DashboardFAQ } secret={true} />
            <ProtectedRoutes exact path="/dashboard/home" component={ DashboardHome } secret={true} />
            <ProtectedRoutes exact path="/dashboard/explore" component={ DashboardExplore } secret={true} />
            <ProtectedRoutes exact path="/dashboard/settings" component={ DashboardSettings } secret={true} />
            
            <Route component={ Notfound } />
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
);

ReactDOM.render(routing, document.getElementById('root'));

module.hot.accept();

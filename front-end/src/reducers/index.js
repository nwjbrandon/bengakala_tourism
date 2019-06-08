import {combineReducers} from 'redux';
import reduceReducers from 'reduce-reducers';
import auth from './auth';
import statements from './statements'
import { dashboardAboutReducer } from './dashboard-about-onmount'

const allReducers = combineReducers({
    admin: reduceReducers(statements, auth),
    statements,
    auth,
    dashboardAbout: reduceReducers(dashboardAboutReducer),
});

export default allReducers
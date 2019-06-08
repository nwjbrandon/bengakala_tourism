import {combineReducers} from 'redux';
import reduceReducers from 'reduce-reducers';
import auth from './auth';
import statements from './statements'
import dashboardAbout from './dashboard-about'

const allReducers = combineReducers({
    admin: reduceReducers(statements, auth),
    statements,
    auth,
    dashboardAbout
});

export default allReducers
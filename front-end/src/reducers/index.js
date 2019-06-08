import {combineReducers} from 'redux';
import reduceReducers from 'reduce-reducers';
import auth from './auth';
import statements from './statements'
import { dashboardAboutReducer, dashboardAboutReducerSaga } from './dashboard-about'

const allReducers = combineReducers({
    admin: reduceReducers(statements, auth),
    statements,
    auth,
    dashboardAbout: reduceReducers(dashboardAboutReducer, dashboardAboutReducerSaga),
});

export default allReducers
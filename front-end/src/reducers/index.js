import {combineReducers} from 'redux';
import reduceReducers from 'reduce-reducers';
import auth from './auth';
import statements from './statements'
import { dashboardAboutReducer } from './dashboard-about-onmount'
import { contactOnMountReducer } from "./contact-onmount";
import { contactFormReducer } from "./contact-form";

const allReducers = combineReducers({
    admin: reduceReducers(statements, auth),
    statements,
    auth,
    dashboardAbout: reduceReducers(dashboardAboutReducer),
    contact: reduceReducers(contactOnMountReducer, contactFormReducer),
});

export default allReducers
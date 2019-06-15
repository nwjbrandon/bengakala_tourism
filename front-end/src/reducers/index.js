import {combineReducers} from 'redux';
import reduceReducers from 'reduce-reducers';
import { dashboardAboutReducer } from './dashboard-about-onmount'
import { contactOnMountReducer } from "./contact-onmount";
import { contactFormReducer } from "./contact-form";
import { dashboardOnMountReducer } from "./dashboard-onmount";
import { adminLoginReducer } from "./admin-login";
import { dashboardFaqOnMountReducer } from "./dashboard-faq-onmount";

const allReducers = combineReducers({
    admin: reduceReducers(adminLoginReducer),
    dashboardAbout: reduceReducers(dashboardAboutReducer),
    dashboard: reduceReducers(dashboardOnMountReducer),
    dashboardFaq: reduceReducers(dashboardFaqOnMountReducer),
    contact: reduceReducers(contactOnMountReducer, contactFormReducer),
});

export default allReducers
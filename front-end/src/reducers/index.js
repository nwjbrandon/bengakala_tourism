import {combineReducers} from 'redux';
import reduceReducers from 'reduce-reducers';
import { contactOnMountReducer } from "./contact-onmount";
import { contactFormReducer } from "./contact-form";
import { dashboardOnMountReducer } from "./dashboard";
import { adminLoginReducer } from "./admin-login";
import { dashboardFaqReducer } from "./dashboardFaq";
import { dashboardContactReducer } from "./dashboardContact";
import { dashboardAccommodationReducer } from "./dashboardAccommodation";
import { dashboardAttractionReducer } from "./dashboardAttraction";
import { dashboardHomeReducer } from "./dashboardHome";
import { dashboardSettingsReducer } from "./dashboardSettings";

const allReducers = combineReducers({
    admin: reduceReducers(adminLoginReducer),
    dashboard: reduceReducers(dashboardOnMountReducer),
    dashboardFaq: reduceReducers(dashboardFaqReducer),
    dashboardContact: reduceReducers(dashboardContactReducer),
    dashboardAccommodation: reduceReducers(dashboardAccommodationReducer),
    dashboardAttraction: reduceReducers(dashboardAttractionReducer),
    dashboardHome: reduceReducers(dashboardHomeReducer),
    dashboardSettings: reduceReducers(dashboardSettingsReducer),
    contact: reduceReducers(contactOnMountReducer, contactFormReducer),
});

export default allReducers
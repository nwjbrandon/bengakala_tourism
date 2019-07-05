import {combineReducers} from 'redux';
import reduceReducers from 'reduce-reducers';
import { contactOnMountReducer } from "./contact-onmount";
import { contactFormReducer } from "./contact-form";
import { attractionReducer } from "./attraction";
import { dashboardOnMountReducer } from "./dashboard";
import { adminLoginReducer } from "./admin";
import { dashboardFaqReducer } from "./dashboardFaq";
import { dashboardContactReducer } from "./dashboardContact";
import { dashboardAccommodationReducer } from "./dashboardAccommodation";
import { dashboardAttractionReducer } from "./dashboardAttraction";
import { dashboardHomeReducer } from "./dashboardHome";
import { dashboardSettingsReducer } from "./dashboardSettings";
import { homeOnMountReducer } from "./home";
import { faqOnMountReducer } from "./faq";
import { dashboardResourcesReducer } from "./dashboardResources";
import { connectRouter } from 'connected-react-router';
import { toastReducer } from "./toast";

const allReducers = (history) => combineReducers({
    toast: reduceReducers(toastReducer),
    admin: reduceReducers(adminLoginReducer),
    dashboard: reduceReducers(dashboardOnMountReducer),
    dashboardFaq: reduceReducers(dashboardFaqReducer),
    dashboardContact: reduceReducers(dashboardContactReducer),
    dashboardAccommodation: reduceReducers(dashboardAccommodationReducer),
    dashboardAttraction: reduceReducers(dashboardAttractionReducer),
    dashboardHome: reduceReducers(dashboardHomeReducer),
    dashboardSettings: reduceReducers(dashboardSettingsReducer),
    dashboardResources: reduceReducers(dashboardResourcesReducer),
    contact: reduceReducers(contactOnMountReducer, contactFormReducer),
    attraction: reduceReducers(attractionReducer),
    home: reduceReducers(homeOnMountReducer),
    faq: reduceReducers(faqOnMountReducer),
    router: connectRouter(history),
});

export default allReducers

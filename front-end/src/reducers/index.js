import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';
import { contactReducer } from "./contact";
import { bulletinReducer } from "./bulletin";
import { resourcesReducer } from "./resources";
import { dashboardOnMountReducer } from "./dashboard";
import { adminLoginReducer } from "./admin";
import { dashboardFaqReducer } from "./dashboardFaq";
import { dashboardContactReducer } from "./dashboardContact";
import { dashboardBookingReducer } from "./dashboardBooking";
import { dashboardAttractionReducer } from "./dashboardAttraction";
import { dashboardHomeReducer } from "./dashboardHome";
import { dashboardSettingsReducer } from "./dashboardSettings";
import { homeOnMountReducer } from "./home";
import { faqOnMountReducer } from "./faq";
import { dashboardResourcesReducer } from "./dashboardResources";
import { connectRouter } from 'connected-react-router';
import { toastReducer } from "./toast";
import bookingReducer from './accomodation'

const allReducers = (history) => combineReducers({
    toast: reduceReducers(toastReducer),
    admin: reduceReducers(adminLoginReducer),
    dashboard: reduceReducers(dashboardOnMountReducer),
    dashboardFaq: reduceReducers(dashboardFaqReducer),
    dashboardContact: reduceReducers(dashboardContactReducer),
    dashboardBooking: reduceReducers(dashboardBookingReducer),
    dashboardAttraction: reduceReducers(dashboardAttractionReducer),
    dashboardHome: reduceReducers(dashboardHomeReducer),
    dashboardSettings: reduceReducers(dashboardSettingsReducer),
    dashboardResources: reduceReducers(dashboardResourcesReducer),
    contact: reduceReducers(contactReducer),
    bulletin: reduceReducers(bulletinReducer),
    home: reduceReducers(homeOnMountReducer),
    faq: reduceReducers(faqOnMountReducer),
    router: connectRouter(history),
    resources: reduceReducers(resourcesReducer),
    booking: reduceReducers(bookingReducer)
});

export default allReducers

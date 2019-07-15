import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';
import { contactReducer } from "./contact";
import { storiesReducer } from "./stories";
import { exploreReducer } from "./explore";
import { dashboardOnMountReducer } from "./dashboard";
import { adminLoginReducer } from "./admin";
import { dashboardFaqReducer } from "./dashboardFaq";
import { dashboardContactReducer } from "./dashboardContact";
import { dashboardBookingReducer } from "./dashboardBooking";
import { dashboardStoriesReducer } from "./dashboardStories";
import { dashboardHomeReducer } from "./dashboardHome";
import { dashboardSettingsReducer } from "./dashboardSettings";
import { homeOnMountReducer } from "./home";
import { faqOnMountReducer } from "./faq";
import { dashboardExploreReducer } from "./dashboardExplore";
import { connectRouter } from 'connected-react-router';
import { toastReducer } from "./toast";
import bookingReducer from './accomodation'
import { storyReducer } from "./story";

const allReducers = (history) => combineReducers({
    toast: reduceReducers(toastReducer),
    admin: reduceReducers(adminLoginReducer),
    dashboard: reduceReducers(dashboardOnMountReducer),
    dashboardFaq: reduceReducers(dashboardFaqReducer),
    dashboardContact: reduceReducers(dashboardContactReducer),
    dashboardBooking: reduceReducers(dashboardBookingReducer),
    dashboardStories: reduceReducers(dashboardStoriesReducer),
    dashboardHome: reduceReducers(dashboardHomeReducer),
    dashboardSettings: reduceReducers(dashboardSettingsReducer),
    dashboardExplore: reduceReducers(dashboardExploreReducer),
    contact: reduceReducers(contactReducer),
    stories: reduceReducers(storiesReducer),
    home: reduceReducers(homeOnMountReducer),
    faq: reduceReducers(faqOnMountReducer),
    router: connectRouter(history),
    explore: reduceReducers(exploreReducer),
    booking: reduceReducers(bookingReducer),
    story: reduceReducers(storyReducer),
});

export default allReducers

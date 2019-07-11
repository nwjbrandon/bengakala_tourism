import { all } from 'redux-saga/effects';

import contact from './contact';
import attraction from './stories';
import resources from './explore';
import homeOnMount from './home';
import faqOnMount from './faq';
import dashboard from './dashboard';
import adminLogin from './admin';
import dashboardFaq from './dashboardFaq';
import dashboardContact from './dashboardContact';
import dashboardAccommodation from './dashboardBooking';
import dashboardAttraction from './dashboardStories';
import dashboardHome from './dashboardHome';
import dashboardResources from './dashboardExplore';
import dashboardSettings from './dashboardSettings';
import toast from './toast'

export default function* rootSaga() {
  yield all([
    ...toast,
    ...contact,
    ...attraction,
    ...resources,
    ...homeOnMount,
    ...faqOnMount,
    ...dashboard,
    ...adminLogin,
    ...dashboardFaq,
    ...dashboardContact,
    ...dashboardAccommodation,
    ...dashboardAttraction,
    ...dashboardHome,
    ...dashboardSettings,
    ...dashboardResources,
  ]);
}

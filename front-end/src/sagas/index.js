import { all } from 'redux-saga/effects';

import contactOnMount from './contact-onmount';
import contactForm from './contact-form';
import attraction from './attraction';
import resources from './resources';
import homeOnMount from './home';
import faqOnMount from './faq';
import dashboard from './dashboard';
import adminLogin from './admin';
import dashboardFaq from './dashboardFaq';
import dashboardContact from './dashboardContact';
import dashboardAccommodation from './dashboardAccommodation';
import dashboardAttraction from './dashboardAttraction';
import dashboardHome from './dashboardHome';
import dashboardResources from './dashboardResources';
import dashboardSettings from './dashboardSettings';
import toast from './toast'

export default function* rootSaga() {
  yield all([
    ...toast,
    ...contactOnMount,
    ...contactForm,
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

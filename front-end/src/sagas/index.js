import { all } from 'redux-saga/effects';

import contactOnMount from './contact-onmount';
import contactForm from './contact-form';
import homeOnMount from './home';
import faqOnMount from './faq';
import dashboard from './dashboard';
import adminLogin from './admin';
import dashboardFaq from './dashboardFaq';
import dashboardContact from './dashboardContact';
import dashboardAccommodation from './dashboardAccommodation';
import dashboardAttraction from './dashboardAttraction';
import dashboardHome from './dashboardHome';
import dashboardSettings from './dashboardSettings';

export default function* rootSaga() {
  yield all([
    ...contactOnMount,
    ...contactForm,
    ...homeOnMount,
    ...faqOnMount,
    ...dashboard,
    ...adminLogin,
    ...dashboardFaq,
    ...dashboardContact,
    ...dashboardAccommodation,
    ...dashboardAttraction,
    ...dashboardHome,
    ...dashboardSettings
  ]);
}
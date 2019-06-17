import { all } from 'redux-saga/effects';

import dashboardAbout from './dashboard-about';
import contactOnMount from './contact-onmount';
import contactForm from './contact-form';
import dashboard from './dashboard';
import adminLogin from './admin-login';
import dashboardFaq from './dashboardFaq';
import dashboardContact from './dashboardContact';

export default function* rootSaga() {
  yield all([
    ...dashboardAbout,
    ...contactOnMount,
    ...contactForm,
    ...dashboard,
    ...adminLogin,
    ...dashboardFaq,
    ...dashboardContact,
  ]);
}
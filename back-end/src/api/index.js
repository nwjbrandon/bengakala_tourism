import express from 'express';
import { check } from 'express-validator/check';
import home from './home';
import accommodation from './accommodation';
import admin from './admin';
import attraction from './attraction';
import contact from './contact';
import faq from './faq';
import dashboard from './dashboard';
import dashboardContact from './dashboard/contact';
import dashboardAccommodation from './dashboard/accommodation';
import dashboardAttraction from './dashboard/attraction';
import dashboardFaq from './dashboard/faq';
import dashboardHome from './dashboard/home';
import dashboardSettings from './dashboard/settings';
import passport from '../middleware/strategy';
import checkAuthentication from '../middleware/auth';
import {
  dashboardAccommodationValidators,
  dashboardAttractionValidators,
  dashboardFaqValidators,
  dashboardHomeValidators,
  adminValidators,
  dashboardContactValidators,
  errorHandling,
} from '../middleware/validator';

const app = express();

// endpoints not necessarily to protect
app.get('/home/info', home.info);
app.get('/accommodation/info', accommodation.info);
app.post('/accommodation/info', accommodation.post);
app.get('/attraction/info', attraction.info);
app.get('/contact/info', contact.info);
app.put('/contact/info', [

], contact.put);
app.get('/faq/info', faq.info);

// endpoints must be protected
app.post('/admin/login',
  [
    check('email').exists().not().isEmpty()
      .normalizeEmail()
      .isEmail()
      .withMessage('Valid Email is Required'),
    check('name').exists().not().isEmpty()
      .withMessage('Name is Required'),
    check('contact').exists().not().isEmpty()
      .withMessage('Contact is Required'),
    check('subject').exists().not().isEmpty()
      .withMessage('Subject is Required'),
    check('message').exists().not().isEmpty()
      .withMessage('Message is Required'),
  ],
  errorHandling,
  passport.authenticate('local', { failWithError: true }),
  admin.login,
  admin.err);
app.get('/admin/logout', checkAuthentication, admin.logout);

app.get('/admin/dashboard', checkAuthentication, dashboard.get);
app.post('/admin/dashboard', checkAuthentication, dashboard.post);

app.get('/admin/dashboard/contact', checkAuthentication, dashboardContact.get);
app.post('/admin/dashboard/contact',
  checkAuthentication,
  dashboardContactValidators,
  errorHandling,
  dashboardContact.post);
app.delete('/admin/dashboard/contact', checkAuthentication, dashboardContact.del);

app.get('/admin/dashboard/booking', checkAuthentication, dashboardAccommodation.get);
app.post('/admin/dashboard/booking',
  checkAuthentication,
  dashboardAccommodationValidators,
  errorHandling,
  dashboardAccommodation.post);

app.get('/admin/dashboard/attraction', checkAuthentication, dashboardAttraction.get);
app.post('/admin/dashboard/attraction',
  checkAuthentication,
  dashboardAttractionValidators,
  errorHandling,
  dashboardAttraction.post);

app.get('/admin/dashboard/faq', checkAuthentication, dashboardFaq.get);
app.post('/admin/dashboard/faq',
  checkAuthentication,
  dashboardFaqValidators,
  errorHandling,
  dashboardFaq.post);

app.get('/admin/dashboard/home', checkAuthentication, dashboardHome.get);
app.post('/admin/dashboard/home',
  checkAuthentication,
  dashboardHomeValidators,
  errorHandling,
  dashboardHome.post);

app.get('/admin/dashboard/settings', checkAuthentication, dashboardSettings.get);
app.put('/admin/dashboard/settings', checkAuthentication, dashboardSettings.put);
app.delete('/admin/dashboard/settings', checkAuthentication, dashboardSettings.del);
app.post('/admin/dashboard/settings', checkAuthentication, dashboardSettings.post);

export default app;

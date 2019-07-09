import express from 'express';
import home from './home';
import booking from './booking';
import admin from './admin';
import bulletin from './bulletin';
import contact from './contact';
import faq from './faq';
import resources from './resources';
import snap from './snap';
import dashboard from './dashboard';
import dashboardContact from './dashboard/contact';
import dashboardBooking from './dashboard/booking';
import dashboardBulletin from './dashboard/bulletin';
import dashboardResources from './dashboard/resouces';
import dashboardFaq from './dashboard/faq';
import dashboardHome from './dashboard/home';
import dashboardSettings from './dashboard/settings';
import passport from '../middleware/strategy';
import checkAuthentication from '../middleware/auth';
import {
  dashboardBookingValidators,
  dashboardBulletinValidators,
  dashboardFaqValidators,
  dashboardHomeValidators,
  contactValidators,
  dashboardContactValidators,
  adminValidators,
  dashboardNewUserValidators,
  dashboardChangePasswordValidators,
  dashboardResoucesValidators,
  midtransValidators,
  errorHandling,
} from '../middleware/validator';

const app = express();

// endpoints not necessarily to protect
app.get('/testing', (req, res) => res.json({ data: 'v1.0' }));
app.get('/home/info', home.info);
app.get('/booking/info', booking.info);
app.post('/booking/info', booking.post);
app.get('/resources/info', resources.info);
app.get('/bulletin/info', bulletin.info);
app.get('/contact/info', contact.info);
app.put('/contact/info',
  contactValidators,
  errorHandling,
  contact.put);
app.get('/faq/info', faq.info);
app.post('/snap/info',
  midtransValidators,
  errorHandling,
  snap.post);

// endpoints must be protected
app.post('/admin/login',
  adminValidators,
  errorHandling,
  passport.authenticate('local', { failWithError: true }),
  admin.login,
  admin.err);
app.get('/admin/logout', checkAuthentication, admin.logout);

app.get('/admin/dashboard', checkAuthentication, dashboard.get);
app.post('/admin/dashboard', checkAuthentication, dashboard.post);
app.delete('/admin/dashboard', checkAuthentication, dashboard.del);

app.get('/admin/dashboard/contact', checkAuthentication, dashboardContact.get);
app.post('/admin/dashboard/contact',
  checkAuthentication,
  dashboardContactValidators,
  errorHandling,
  dashboardContact.post);
app.delete('/admin/dashboard/contact', checkAuthentication, dashboardContact.del);

app.get('/admin/dashboard/booking', checkAuthentication, dashboardBooking.get);
app.post('/admin/dashboard/booking',
  checkAuthentication,
  dashboardBookingValidators,
  errorHandling,
  dashboardBooking.post);

app.get('/admin/dashboard/bulletin', checkAuthentication, dashboardBulletin.get);
app.post('/admin/dashboard/bulletin',
  checkAuthentication,
  dashboardBulletinValidators,
  errorHandling,
  dashboardBulletin.post);

app.get('/admin/dashboard/resources', checkAuthentication, dashboardResources.get);
app.post('/admin/dashboard/resources',
  checkAuthentication,
  dashboardResoucesValidators,
  errorHandling,
  dashboardResources.post);


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
app.put('/admin/dashboard/settings',
  checkAuthentication,
  dashboardNewUserValidators,
  errorHandling,
  dashboardSettings.put);
app.delete('/admin/dashboard/settings', checkAuthentication, dashboardSettings.del);
app.post('/admin/dashboard/settings',
  checkAuthentication,
  dashboardChangePasswordValidators,
  errorHandling,
  dashboardSettings.post);

export default app;

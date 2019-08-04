import express from 'express';
import home from './home';
import booking from './booking';
import admin from './admin';
import stories from './stories';
import contact from './contact';
import story from './story';
import faq from './faq';
import explore from './explore';
import snap from './snap';
import emailSender from './emailSender/emailSender';
import notification from './notification';
import dashboard from './dashboard';
import updateTransaction from './updateTransactionState';
import dashboardContact from './dashboard/contact';
import dashboardBooking from './dashboard/booking';
import dashboardStories from './dashboard/stories';
import dashboardExplore from './dashboard/explore';
import dashboardFaq from './dashboard/faq';
import dashboardHome from './dashboard/home';
import dashboardSettings from './dashboard/settings';
import passport from '../middleware/strategy';
import checkAuthentication from '../middleware/auth';
import {
  dashboardBookingValidators,
  dashboardStoriesValidators,
  dashboardFaqValidators,
  dashboardHomeValidators,
  contactValidators,
  dashboardContactValidators,
  adminValidators,
  dashboardNewUserValidators,
  dashboardChangePasswordValidators,
  dashboardExploreValidators,
  midtransValidators,
  errorHandling,
} from '../middleware/validator';
import { errorHandler } from '../middleware/errorHandling';

const app = express();

// endpoints not necessarily to protect
app.get('/testing', (req, res) => res.json({ data: 'v1.0' }));
app.get('/home/info', home.info);
app.get('/booking/info', booking.info);
app.get('/explore/info', explore.info);
app.get('/stories/info/:page', stories.info);
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
app.get('/story/:tag', story.get);
app.post('/sendEmail', emailSender.send);

app.post('/notification/handling', notification.post);

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
app.post('/updateTransaction', checkAuthentication, updateTransaction.update);

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

app.get('/admin/dashboard/stories', checkAuthentication, dashboardStories.get);
app.post('/admin/dashboard/stories',
  checkAuthentication,
  dashboardStoriesValidators,
  errorHandling,
  dashboardStories.post);

app.get('/admin/dashboard/explore', checkAuthentication, dashboardExplore.get);
app.post('/admin/dashboard/explore',
  checkAuthentication,
  dashboardExploreValidators,
  errorHandling,
  dashboardExplore.post);


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

app.use(errorHandler);
export default app;

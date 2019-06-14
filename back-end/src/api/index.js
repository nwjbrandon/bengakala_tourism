import express from 'express';
import home from './home';
import accommodation from './accommodation';
import admin from './admin';
import attraction from './attraction';
import contact from './contact';
import faq from './faq';
import getPayment from './payment';
import dashboard from './dashboard';
import dashboardContact from './dashboard/contact';
import dashboardAccommodation from './dashboard/accommodation';
import dashboardAttraction from './dashboard/attraction';
import dashboardFaq from './dashboard/faq';
import dashboardHome from './dashboard/home';
import dashboardSettings from './dashboard/settings';
import passport from '../middleware/strategy';
import checkAuthentication from '../middleware/auth';

const app = express();

// endpoints not necessarily to protect
app.get('/home/info', home.info);
app.get('/accommodation/info', accommodation.info);
app.get('/attraction/info', attraction.info);
app.get('/contact/info', contact.info);
app.get('/faq/info', faq.info);
app.get('/payment', getPayment.get);

// endpoints must be protected
app.post('/admin/login', passport.authenticate('local', { failWithError: true }), admin.login, admin.err);
app.get('/admin/logout', checkAuthentication, admin.logout);

app.post('/admin/dashboard/test', checkAuthentication, dashboard.test);

app.get('/admin/dashboard/contact', checkAuthentication, dashboardContact.get);
app.post('/admin/dashboard/contact', checkAuthentication, dashboardContact.post);

app.get('/admin/dashboard/accommodation', checkAuthentication, dashboardAccommodation.get);
app.post('/admin/dashboard/accommodation', checkAuthentication, dashboardAccommodation.post);

app.get('/admin/dashboard/attraction', checkAuthentication, dashboardAttraction.get);
app.post('/admin/dashboard/attraction', checkAuthentication, dashboardAttraction.post);

app.get('/admin/dashboard/faq', checkAuthentication, dashboardFaq.get);
app.post('/admin/dashboard/faq', checkAuthentication, dashboardFaq.post);

app.get('/admin/dashboard/home', checkAuthentication, dashboardHome.get);
app.post('/admin/dashboard/home', checkAuthentication, dashboardHome.post);

app.get('/admin/dashboard/settings', checkAuthentication, dashboardSettings.get);


export default app;

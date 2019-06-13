import express from 'express';
import home from './home';
import accommodation from './accommodation';
import admin from './admin';
import attraction from './attraction';
import contact from './contact';
import faq from './faq';
import getPayment from './payment';
import dashboard from './dashboard';
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
app.post('/admin/dashboard/test', checkAuthentication, dashboard.test);
app.get('/admin/logout', checkAuthentication, admin.logout);

export default app;

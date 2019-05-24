import express from 'express';

import getAbout from './about';
import getAccomodation from './accomodation';
import getAdmin from './admin';
import getAttraction from './attraction';
import getContact from './contact';
import getDashboard from './dashboard';
import getFAQ from './faq';
import getPayment from './payment';
import passport from '../middleware';

const app = express();

app.get('/about', getAbout.get);
app.get('/accommodation', getAccomodation.get);
app.get('/admin', getAdmin.get);
app.get('/admin/login', getAdmin.login);
app.get('/attraction', getAttraction.get);
app.get('/contact', getContact.get);
app.get('/dashboard', getDashboard.get);
app.get('/faq', getFAQ.get);
app.get('/payment', getPayment.get);

app.post('/login', passport.authenticate('local'), (req, res) => {
  // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
  // So we're sending the user back the route to the members page because the redirect will happen on the front end
  // They won't get this or even be able to access this page if they aren't authed
  res.json('hihi');
});


export default app;

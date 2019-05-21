import express from 'express';

import getAbout from './about';
import getAccomodation from './accomodation';
import getAdmin from './admin';
import getAttraction from './attraction';
import getContact from './contact';
import getDashboard from './dashboard';
import getFAQ from './faq';
import getPayment from './payment';

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

export default app;

const express = require('express');
const app = express();

import getAbout from './about';
app.get('/about', getAbout.get);

import getAccomodation from './accomodation';
app.get('/accomodation', getAccomodation.get);

import getAdmin from './admin';
app.get('/admin', getAdmin.get);

import getAttraction from './attraction';
app.get('/attraction', getAttraction.get);

import getContact from './contact';
app.get('/contact', getContact.get);

import getDashboard from './dashboard';
app.get('/dashboard', getDashboard.get);

import getFAQ from './faq';
app.get('/faq', getFAQ.get);

import getPayment from './payment';
app.get('/payment', getPayment.get);

module.exports = app;

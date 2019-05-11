const express = require('express');
const app = express();

import getFAQ from './faq';
app.get('/faq', getFAQ.get);

module.exports = app;

const express = require('express');
const app = express();

import faq from './faq';
app.use('/faq', faq);































/**
 * This function comment is parsed by doctrine testing
 * @route GET /api
 * @group foo - Operations about user
 * @param {string} email.query.required - username or email - eg: user@domain
 * @param {string} password.query.required - user's password.
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */

/**
 * This function comment is parsed by doctrine testing
 * @route GET /testing
 * @group foo - Operations about user
 * @returns {object} 200 - An array of user info
 */
app.get('/testing', (req, res) => { // type 'localhost:3001/testing' in browser
  const info = { name: 'my_name' };
  res.send(info);
  /*
   * example of database call (DO NOT DELETE!)
   *
  sql.query('select * from customers', function(err, rows, fields) {
    console.log(rows)
  })
  */
});


module.exports = app;

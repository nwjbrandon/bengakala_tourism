const express = require('express');
const app = express();

/**
 * This function comment is parsed by doctrine testing
 * @route GET /api
 * @group foo - Operations about user
 * @param {string} email.query.required - username or email - eg: user@domain
 * @param {string} password.query.required - user's password.
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
app.get('/testing', (req, res) => { // type 'localhost:3001/testing' in browser
  const info = { name: 'myfaq' };
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

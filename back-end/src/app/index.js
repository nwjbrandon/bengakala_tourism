const express = require('express')
const cors = require('cors')
// const sql = require('../db')
const test = require('./test')
const app = express()

app.use(cors({credentials: true, origin: true}))

/*
 * example of basic api routing, refer to api.js to get the routing links
 */
app.use('/test', test) // type 'localhost:3001/test/hello' in browser
app.get('/testing', (req, res) => { // type 'localhost:3001/testing' in browser
  info = {'name': 'my_name'}
  res.send(info)
  /*
   * example of database call (do not delete)
   *
  sql.query('select * from customers', function(err, rows, fields) {
    console.log(rows)
  })
  */
})

module.exports = app

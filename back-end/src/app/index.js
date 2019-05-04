const express = require('express')
const cors = require('cors')
const sql = require('../db')
const app = express()

app.use(cors({credentials: true, origin: true}))

app.get('/test', (req, res) => {
  info = {'name': 'brandon'}
  res.send(info)
  sql.query('select * from customers', function(err, rows, fields) {
    console.log(rows)
  })
})

module.exports = app

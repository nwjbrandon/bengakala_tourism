const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors({credentials: true, origin: true}))

app.get('/test', (req, res) => {
  info = {'name': 'brandon'}
  res.send(info)
})

module.exports = app

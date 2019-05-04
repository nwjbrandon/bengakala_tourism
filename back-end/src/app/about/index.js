const express = require('express')
const router = express.Router()
// const sql = require('../../db')
const data = require('../../data/about')

router.get('/hello', function(req, res) {
  info = {'info': 'about'}
  res.send(info)
  console.log(data)
})

module.exports = router

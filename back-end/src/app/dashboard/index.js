const express = require('express');
const router = express.Router();
// const sql = require('../../db')
const data = require('../../data/dashboard');

router.get('/hello', function(req, res) {
  info = {'info': 'dashboard'};
  res.send(info);
  console.log(data);
});

module.exports = router;



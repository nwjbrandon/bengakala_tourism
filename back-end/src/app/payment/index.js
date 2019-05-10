const express = require('express');

const router = express.Router();
// const sql = require('../../db')
const data = require('../../data/payment');

router.get('/hello', (req, res) => {
  const info = { info: 'payment' };
  res.send(info);
  console.log(data);
});

module.exports = router;

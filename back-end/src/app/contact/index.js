const express = require('express');

const router = express.Router();
// const sql = require('../../db')
const data = require('../../data/contact');

router.get('/hello', (req, res) => {
  const info = { info: 'contact' };
  res.send(info);
  console.log(data);
});

module.exports = router;

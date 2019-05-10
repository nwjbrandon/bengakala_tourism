const express = require('express');

const router = express.Router();
// const sql = require('../../db')
const data = require('../../data/welcome');

router.get('/hello', (req, res) => {
  const info = { info: 'welcome' };
  res.send(info);
  console.log(data);
});

module.exports = router;

import express from 'express';

const router = express.Router();
// const sql = require('../../db')
const data = require('../../data/admin');

router.get('/hello', (req, res) => {
  const info = { info: 'admin' };
  res.send(info);
  console.log(data);
});

module.exports = router;

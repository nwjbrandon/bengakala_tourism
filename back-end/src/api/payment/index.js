
const express = require('express');
const app = express();


const getPayment = [
  async(req, res) => {
    const info = { data: 'myPayment' };
    res.send(info);
  },
];

export default {
  get: getPayment,
};


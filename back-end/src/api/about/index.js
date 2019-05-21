import express from 'express';

const app = express();

const getAbout = [
  async(req, res) => {
    const info = { data: 'myAbout' };
    res.send(info);
  },
];

export default {
  get: getAbout,
};

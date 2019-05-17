import express from 'express';

const app = express();

/**
 * This function comment is parsed by doctrine testing
 * @route GET /about
 * @group About - Obtain info for the about page
 * @param { string } jj
 * @returns {object} 200 - Return a json object to display on the about page
 * @returns {Error}  default - Unexpected error
 */
const getAbout = [
  async(req, res) => {
    const info = { data: 'myAbout' };
    res.send(info);
  },
];

export default {
  get: getAbout,
};

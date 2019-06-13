
const express = require('express');
const app = express();

/**
 * This function comment is parsed by doctrine testing
 * @route GET /api
 * @group foo - Operations home user
 * @param {string} email.query.required - username or email - eg: user@domain
 * @param {string} password.query.required - user's password.
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
const getAttraction = [
  async(req, res) => {
    const info = { data: 'myAttraction' };
    res.send(info);
  },
];

export default {
  get: getAttraction,
};


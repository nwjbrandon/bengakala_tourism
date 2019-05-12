'use strict';

module.exports = {
  timeout: 20000,
  recursive: true,
  require: [
    '@babel/register',
    '@babel/polyfill'
  ],
  ui: 'bdd'
};


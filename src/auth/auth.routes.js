'use strict';

let auth = require('./auth.controller');

let routes = [
  {
    method: 'POST',
    path: '/auth/register',
    config: auth.register
  },
  {
    method: 'POST',
    path: '/auth/login',
    config: auth.login
  }
];

module.exports = routes;

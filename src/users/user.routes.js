'use strict';

let user = require('./user.controller');

let routes = [
  {
    method: 'GET',
    path: '/me',
    config: user.me
  },
  {
    method: 'GET',
    path: '/users',
    config: user.findAll
  },
  {
    method: 'GET',
    path: '/users/:userId',
    config: user.findById
  }
];

module.exports = routes;

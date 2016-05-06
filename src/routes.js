'use strict';

const authRoutes = require('./auth/auth.routes');
const userRoutes = require('./users/user.routes');

module.exports = [
  [
    {
      method: 'GET',
      path: '/',
      handler: (request, reply) => {
        reply({
          name: "happy",
          version: "0.0.1",
          url: "https://github.com/Phonbopit/happy"
        });
      }
    }
  ],
  authRoutes
];

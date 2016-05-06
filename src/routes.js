'use strict';

const authRoutes = require('./auth/auth.routes');
const userRoutes = require('./users/user.routes');
const app = require('../package.json');

module.exports = [
  [
    {
      method: 'GET',
      path: '/',
      config: {
        auth: false,
        handler: (request, reply) => {
          reply({
            name: app.name,
            version: app.version,
            url: app.url
          });
        }
      }
    }
  ],
  authRoutes,
  userRoutes
];

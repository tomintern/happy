'use strict';

const Hapi = require('hapi');
const config = require('./config');
const routes = require('./routes');
const db = require('./db')() // invoke db.
const User = require('./users/user.model');

const server = new Hapi.Server();

server.connection(config.server);

server.register([
  {
    register: require('good'),
    options: {
      reporters: [{
        reporter: require('good-console'),
        events: {
          log: ['error', 'medium'],
          response: '*'
        }
      }]
    }
  },
  {
    register: require('hapi-auth-jwt2')
  }
], (err) => {

  if (err) {
    console.log(chalk.red(err));
  } else {

    server.auth.strategy('jwt', 'jwt', {
      key: config.secretKey,
      validateFunc: (decoded, request, callback) => {
        User.findOne({_id: decoded.id}, (err, user) => {
          if (err) {
            return callback(null, false);
          }

          if (user) {
            return callback(null, true);
          } else {
            return callback(null, false);
          }
        });
      }
    });

    server.auth.default('jwt');

    for (let route in routes) {
      server.route(routes[route]);
    }

    server.start(() => {
      console.log(`Server is running at ${server.info.uri}`);
    });
  }
});

module.exports = server;

'use strict';

const Hapi = require('hapi');
const config = require('./config');
const routes = require('./routes');
const db = require('./db')() // invoke db.

const server = new Hapi.Server();

server.connection(config.server);

for (let route in routes) {
  server.route(routes[route]);
}

server.start(() => {
  console.log(`Server is running at ${server.info.uri}`);
});

'use strict';

const Hapi = require('hapi');
const config = require('./config');
const routes = require('./routes');

const server = new Hapi.Server();

server.connection({
  host: config.app.host,
  port: config.app.port
});

for (let route in routes) {
  server.route(routes[route]);
}

server.start(() => {
  console.log(`Server is running at ${server.info.uri}`);
});

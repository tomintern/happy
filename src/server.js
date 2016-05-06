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

server.ext('onPreResponse', function(request, reply) {

  let response = request.response.output;

  if (response) {
    if (response.statusCode === 400) {

      return reply({
        statusCode: 1001,
        message: `${response.payload.message}`
      });

    } else if (response.statusCode === 401) {
      return reply({
        statusCode: 4001,
        message: `${response.payload.error} : ${response.payload.message}`
      });
    } else if (response.statusCode === 500) {
      return reply.continue();
    } else {
      return reply({
        statusCode: response.payload.statusCode,
        message: response,
      });
    }
  } else {
    return reply.continue();
  }

});

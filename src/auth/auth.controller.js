'use strict';

let validate = require('./auth.validate');

let register = {
  validate: validate.register,
  handler: (request, reply) => {
    let payload = request.payload;

    reply({
      message: 'Register successfully',
      data: payload
    });
  }
};

let login = {
  validate: validate.login,
  handler: (request, reply) => {
    reply('OK');
  }
};

module.exports = {
  register: register,
  login: login
}

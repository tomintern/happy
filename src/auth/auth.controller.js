'use strict';

let validate = require('./auth.validate');
let User = require('../users/user.model');
let JWT = require('jsonwebtoken');

let register = {
  auth: false,
  validate: validate.register,
  handler: (request, reply) => {
    let payload = request.payload;

    let user = new User({
      name: payload.name || '',
      email: payload.email,
      password: payload.password
    });

    user.save((err) => {

      if (err) {
        if (err.code === 11000) {
          return reply({
            statusCode: 1001,
            message: 'Email address already exists'
          });
        }
        return reply(Boom.wrap(err, 1001, err.message));
      }

      let token = JWT.sign({
        id: user._id,
        email: user.email
      }, process.env.APP_SECRET_KEY, {
        expiresIn: '1d'
      });

      reply({
        statusCode: 1000,
        message: 'Register successfully',
        data: {
          profile: {
            id: user._id,
            email: user.email,
            name: user.name || ''
          },
          accessToken: token
        }
      });
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

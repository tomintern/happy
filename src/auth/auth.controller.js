'use strict';

let validate = require('./auth.validate');
let User = require('../users/user.model');
let config = require('../config');
let JWT = require('jsonwebtoken');
let Boom = require('boom');
let bcrypt = require('bcrypt');

let register = {
  auth: false,
  validate: validate.register,
  handler: (request, reply) => {
    let payload = request.payload;

    let user = new User({
      name: payload.name || '',
      email: payload.email,
      password: bcrypt.hashSync(payload.password, 10),
    });

    user.save((err) => {

      if (err) {
        if (err.code === 11000) {
          return reply({
            message: 'Email address already exists'
          }).code(400);
        }
        return reply(Boom.wrap(err, 400, err.message));
      }

      let token = JWT.sign({
        id: user._id,
        email: user.email
      }, config.secretKey, {
        expiresIn: '1d'
      });

      return reply({
        message: 'Register successfully',
        profile: {
          id: user._id,
          email: user.email,
          name: user.name || ''
        },
        accessToken: token
      });
    });
  }
};

let login = {
  auth: false,
  validate: validate.login,
  handler: (request, reply) => {
    let payload = request.payload;

    User
      .findOne({ email: payload.email })
      .exec((err, user) => {
        if (err) {
          return reply({
            message: err.message
          }).code(400);
        }

        if (user) {

         if (bcrypt.compareSync(payload.password, user.password)) {
            var token = JWT.sign({
              id: user._id,
              email: user.email
            }, config.secretKey, {
              expiresIn: '1d'
            });

            return reply({
              profile: {
                id: user._id,
                email: user.email,
                name: user.name
              },
              accessToken: token
            });
          } else {
            return reply({
              message: "Email address or password incorrect"
            }).code(400);
          }

        } else {
          return reply({
            message: "Email doesn't exist"
          }).code(400);
        }
      });
  }
};

module.exports = {
  register: register,
  login: login
}

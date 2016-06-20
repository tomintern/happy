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
          return reply(Boom.badRequest('Email address already exists'));
        }
        return reply(Boom.badRequest(err.message));
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
          return reply(Boom.badRequest(err.message));
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
            return reply(Boom.badRequest('Email address or password incorrect'));
          }

        } else {
          return reply(Boom.badRequest('Email does not exist'));
        }
      });
  }
};

module.exports = {
  register: register,
  login: login
}

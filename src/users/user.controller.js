'use strict';

let validate = require('./user.validate');
let User = require('./user.model');

let me = {
  handler: (request, reply) => {

    let credentials = request.auth.credentials;

    User
      .findOne({_id: credentials.id})
      .select('-__v, -password')
      .exec((err, user) => {

        if (err) {
          reply(Boom.wrap(err, 1001, err.message));
        } else {
          reply({
            statusCode: 1000,
            message: 'OK',
            data: user
          });
        }
      });
  }
};

let findAll = {
  validate: validate.findAll,
  handler: (request, reply) => {
    reply('findAll');
  }
};

let findById = {
  validate: validate.findById,
  handler: (request, reply) => {

    let userId = request.params.userId;

    User
      .findOne({_id: userId})
      .select('-__v, -password')
      .exec((err, user) => {

        if (err) {
          reply(Boom.wrap(err, 1001, err.message));
        } else {
          reply({
            statusCode: 1000,
            message: 'OK',
            data: user
          });
        }
      });
  }
};

module.exports = {
  me: me,
  findAll: findAll,
  findById: findById
};

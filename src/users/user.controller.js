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
          return reply(Boom.badRequest(err.message));
        } else {
          return reply(user);
        }
      });
  }
};

let findAll = {
  validate: validate.findAll,
  handler: (request, reply) => {
    
    let limit = request.query.limit;
    let fields = request.query.fields;
    let sort = request.query.sort;

    if (/password/g.test(fields)) {
      return reply(Boom.badRequest('Can not query password field'));
    }

    if (fields) {
      // remove white space.
      fields = fields.replace(/\s/g, '').replace(/,/g, ' ');
    }

    User
      .find({})
      .select(fields)
      .limit(limit)
      .sort(sort)
      .exec((err, result) => {

        if (err) {
          return reply(Boom.badRequest(err.message));
        } else {
          return reply(result);
        }
      });
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
          return reply(Boom.badRequest(err.message));
        } else {
          return reply(user);
        }
      });
  }
};

module.exports = {
  me: me,
  findAll: findAll,
  findById: findById
};

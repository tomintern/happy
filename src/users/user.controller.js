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
    
    let limit = request.query.limit;
    let fields = request.query.fields;
    let sort = request.query.sort;

    if (/password/g.test(fields)) {
      return reply({
        statusCode: 1001,
        message: 'Bad Request, can not query password field'
      });
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
          return reply(Boom.wrap(err, 1001, err.message));
        } else {
          return reply({
            statusCode: 1000,
            message: 'OK',
            data: result,
            fields: fields
          });
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

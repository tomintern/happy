'use strict';

const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

let findAll = {
  query: {
    limit: Joi.number().integer().min(1).max(1000).default(50),
    sort: Joi.string(),
    fields: Joi.string()
  }
};

let findById = {
  params: {
    userId: Joi.objectId().required()
  }
};

module.exports = {
  findAll: findAll,
  findById: findById
}

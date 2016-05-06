'use strict';

const Joi = require('joi');

let register = {
  payload: {
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  }
};

let login = {

};

module.exports = {
  register: register,
  login: login
}

'use strict';

let me = {
  handler: (request, reply) => {
    reply({
      message: 'ok'
    });
  }
};

let findAll = {
  handler: (request, reply) => {
    reply('findAll');
  }
};

let findById = {
  handler: (request, reply) => {
    reply('findById');
  }
};

module.exports = {
  me: me,
  findAll: findAll,
  findById: findById
};

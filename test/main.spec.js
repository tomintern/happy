'use strict';

const Code = require('code');
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const Hapi = require('hapi');

const config = require('../src/config.js');
const routes = require('../src/routes.js');

const test = lab.test;
const suite = lab.suite;
const expect = Code.expect;
const before = lab.before;
const after = lab.after;

suite('API', () => {

  const server = new Hapi.Server();

  before(done => {
    server.connection(config.server);

    for (var route in routes) {
      server.route(routes[route]);
    }

    done();

  });

  test('GET / should return information of API', done => {

    let options = {
      url: '/',
      method: 'GET'
    };

    let result = {
      name: 'happy',
      version: '0.0.1',
      url: 'https://github.com/Phonbopit/happy'
    };

    server.inject(options, (res) => {
      expect(res.statusCode).to.equal(200);
      expect(res.result).to.deep.equal(result);
      done();
    })

  });

});

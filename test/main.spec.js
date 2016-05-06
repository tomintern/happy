'use strict';

const Code = require('code');
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const Hapi = require('hapi');

const config = require('../src/config.js');
const routes = require('../src/routes.js');
const db = require('../src/db')(); // invoke db configuration.
const User = require('../src/users/user.model');

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
    });

  });

  suite('Register', () => {
    test('POST /auth/register should return error mesasge if payload do not include email and password', done => {
      let options = {
        method: 'POST',
        url: '/auth/register',
        payload: {
          name: 'chai@example.com',
          password: 'mypassword'
        }
      }
      server.inject(options, (res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.result.message).to.equal('child \"email\" fails because [\"email\" is required]');
        done();
      });
    });

    test('POST /auth/register should return successful message if register completed', done => {
      let options = {
        method: 'POST',
        url: '/auth/register',
        payload: {
          email: 'chai@example.com',
          password: 'mypassword'
        }
      }

      server.inject(options, (res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.result.message).to.equal('Register successfully');
        expect(res.result.data.accessToken).to.be.a.string();
        done();
      })
    });

    test('POST /auth/register email address should not duplicated', done => {

      let options = {
        method: 'POST',
        url: '/auth/register',
        payload: {
          email: 'chai@example.com',
          password: 'mypassword'
        }
      }

      server.inject(options, (res) => {
        expect(res.statusCode).to.equal(200); // html code
        expect(res.result.statusCode).to.equal(1001); // dev code
        expect(res.result.message).to.equal('Email address already exists');
        done();
      });

    });
  });

  after(done => {
    User.remove({email: 'chai@example.com'}, (err, result) => {
      done();
    });
  });

});

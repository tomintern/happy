'use strict';

const Code = require('code');
const Lab = require('lab');
const lab = exports.lab = Lab.script();

const test = lab.test;
const suite = lab.suite;
const expect = Code.expect;

suite('Utils', () => {

  test('separate query fields with space for query with specific field', done => {
    let fields = 'name, email, tel, age, a';
    let expected = fields.replace(/\s/g, '').replace(/,/g, ' ');

    expect(expected).to.equal('name email tel age a');
    done();
  });
});

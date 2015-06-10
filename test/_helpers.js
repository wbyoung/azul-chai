'use strict';

var _ = require('lodash');
var chai = require('chai');
var azul = require('azul');
var Promise = require('bluebird');

var Adapter = azul.Adapter.extend({
  _connect: Promise.method(function() { return 1; }),
  _disconnect: Promise.method(function() { }),
  _execute: Promise.method(function() { }),
});

// reset chai.Assertion's prototype. this is required to support mocha
// re-running the test suite in watch mode.
var prototype = chai.Assertion.prototype;
var initial = chai.hold = chai.hold || _.clone(Object.keys(prototype));
_.difference(Object.keys(prototype), initial).forEach(function(key) {
  delete prototype[key];
});

chai.use(require('..'));

global.chai = chai;
global.expect = chai.expect;
global.should = chai.should();

global.__db = function(fn) {
  return function() {
    beforeEach(function() {
      global.db = azul({ adapter: Adapter.create() });
    });
    fn.call(this);
  };
};

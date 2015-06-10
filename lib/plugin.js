'use strict';

var _ = require('lodash');

/**
 * This is the main chai plugin.
 *
 * @public
 * @function plugin
 * @param {Object} chai
 * @param {Object} utils
 */
module.exports = function(chai, utils) {

  var Assertion = chai.Assertion;
  var addMethod = Assertion.addMethod.bind(Assertion);

  /**
   * Overwrite a method, but throw if super is called when there wasn't really
   * anything to override.
   *
   * We should be able to remove this when the following is addressed:
   * https://github.com/chaijs/chai/issues/467
   *
   * @private
   * @function
   */
  var overwriteMethod = function(name, fn) {
    if (typeof Assertion.prototype[name] === 'function') {
      Assertion.overwriteMethod(name, fn);
    }
    else {
      /** local */
      var _super = function() {
        throw new Error('Method \'' +  name +
          '\' cannot be used in this context');
      };
      Assertion.addMethod(name, fn(_super));
    }
  };

  /**
   * Check that a model is a specific type.
   *
   *   .should.be.a.model('person')
   *   .should.be.a.model(Person)
   *
   * @public
   * @function json
   * @param {Object} json
   */
  addMethod('model', function(model) {
    new Assertion(this._obj).to.have.deep.property('__identity__.db');
    if (_.isString(model)) {
      model = this._obj.__identity__.db.model(model);
    }

    this.assert(this._obj instanceof model.__class__,
      'expected #{this} to be a #{exp} model but was #{act}',
      'expected #{this} to not be a #{act}',
      model.__name__, this._obj.__identity__.__name__);

    utils.flag(this, 'azul.model', true);
  });


  /**
   * Check that a model's JSON matches an expected value.
   *
   *   .should.be.a.model('person')
   *   .with.json({ username: 'wbyoung' })
   *
   * @public
   * @function json
   * @param {Object} json
   */
  overwriteMethod('json', function(_super) {
    /** local */
    return function assertJSON(json) {
      if (utils.flag(this, 'azul.model')) {
        new Assertion(this._obj).to.have.property('json');
        this.assert(utils.eql(json, this._obj.json),
          'expected #{this} to have JSON #{exp} but got #{act}',
          'expected #{this} to not have JSON of #{act}',
          json, this._obj.json, true);
      }
      else {
        _super.apply(this, arguments);
      }
    };
  });

};

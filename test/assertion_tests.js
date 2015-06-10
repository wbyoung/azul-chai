'use strict';

require('./_helpers');

var _ = require('lodash');

describe('assertions', __db(function() {
  /* global db */

  beforeEach(require('./common').models);

  it('can validate a model', function() {
    db.model('article').create({ title: 'Azul Chai' })
    .should.be.a.model('article')
    .with.json({ id: undefined, title: 'Azul Chai' });
  });

  it('can validate a model with the class', function() {
    db.model('article').create({ title: 'Azul Chai' })
    .should.be.a.model(db.model('article'));
  });

  it('produces an error for mistyped model', function() {
    expect(function() {
      db.model('article').create({ title: '' }).should.be.a.model('post');
    })
    .to.throw(/expected.*Article.*to be.*Post.*but was.*Article/);
  });

  it('produces an error for mismatched json', function() {
    expect(function() {
      db.model('article').create({ title: '' })
      .should.be.a.model('article')
      .with.json({ id: undefined, title: 'Azul Chai' });
    })
    .to.throw(/expected.*Article.*to have.*Azul Chai.*but got.*''/);
  });

  it('produces an error when json is used on non-model', function() {
    expect(function() {
      [].should.be.json({});
    })
    .to.throw(/method.*json.*cannot be used.*context/i);
  });

  it('would be compatible with other json methods', function() {
    chai.use(function(chai) {
      chai.Assertion.addMethod('json', function() {});
    });
    chai.use(_.partial(require('..'))); // install copy of azul-chai

    expect(function() {
      [].should.be.json({});
    })
    .to.not.throw();
  });

}));

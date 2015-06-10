'use strict';

require('./_helpers');

exports.models = function() {
  /* global db */

  var attr = db.attr;
  var hasMany = db.hasMany;
  var belongsTo = db.belongsTo;

  db.model('article', {
    title: attr(),
    comments: hasMany(),
  });
  db.model('comment', {
    body: attr(),
    article: belongsTo('article'),
  });

};

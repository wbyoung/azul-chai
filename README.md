# Azul Chai

[![NPM version][npm-image]][npm-url] [![Build status][travis-image]][travis-url] [![Code Climate][codeclimate-image]][codeclimate-url] [![Coverage Status][coverage-image]][coverage-url] [![Dependencies][david-image]][david-url] [![devDependencies][david-dev-image]][david-dev-url]

Chai assertions & test helpers for [Azul.js][azul].

```js
chai.use(require('azul-chai'));

item.should.be.a.model('article').with.json({ id: 5, title: 'Azul.js' });
```


## License

This project is distributed under the MIT license.


[azul]: https://github.com/wbyoung/azul

[travis-image]: http://img.shields.io/travis/wbyoung/azul-chai.svg?style=flat
[travis-url]: http://travis-ci.org/wbyoung/azul-chai
[npm-image]: http://img.shields.io/npm/v/azul-chai.svg?style=flat
[npm-url]: https://npmjs.org/package/azul-chai
[codeclimate-image]: http://img.shields.io/codeclimate/github/wbyoung/azul-chai.svg?style=flat
[codeclimate-url]: https://codeclimate.com/github/wbyoung/azul-chai
[coverage-image]: http://img.shields.io/coveralls/wbyoung/azul-chai.svg?style=flat
[coverage-url]: https://coveralls.io/r/wbyoung/azul-chai
[david-image]: http://img.shields.io/david/wbyoung/azul-chai.svg?style=flat
[david-url]: https://david-dm.org/wbyoung/azul-chai
[david-dev-image]: http://img.shields.io/david/dev/wbyoung/azul-chai.svg?style=flat
[david-dev-url]: https://david-dm.org/wbyoung/azul-chai#info=devDependencies

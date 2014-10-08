/* global describe, it */

var assert = require('assert');
var Router = require('..');
var sinon = require('sinon');

describe('Router', function() {

  describe('#case', function() {

    it('stores a string pattern and a corresponding handler.', function() {
      var noop = function(){};
      var r = Router();
      assert.deepEqual(r.routes_, []);

      r.case('/foo/', noop);
      r.case('/<foo>/<bar>/', noop);
      r.case('/<foo:[a-z]\\d+>/<bar:\\w{2,4}>/', noop);

      assert.deepEqual(r.routes_, [
        {
          pattern: new RegExp('^/foo/$'),
          fn: noop
        },
        {
          pattern: new RegExp('^/(\\w+)/(\\w+)/$'),
          fn: noop
        },
        {
          pattern: new RegExp('^/([a-z]\\d+)/(\\w{2,4})/$'),
          fn: noop
        }
      ]);
    });

    it('stores a regular expression pattern and a corresponding handler.',
        function() {

      var noop = function(){};
      var r = Router();
      assert.deepEqual(r.routes_, []);

      var regExes = [
        /^\/foo\/$/,
        /^\/foo\/\d+\/bar\/$/
      ];

      r.case(regExes[0], noop);
      r.case(regExes[1], noop);

      assert.deepEqual(r.routes_, [
        {
          pattern: regExes[0],
          fn: noop
        },
        {
          pattern: regExes[1],
          fn: noop
        }
      ]);

    });

  });

  describe('#match', function() {

    it('compares all stored patterns in order and calls the handler ' +
        'associated with the first match.', function() {

      var handler1 = sinon.spy();
      var handler2 = sinon.spy();
      var handler3 = sinon.spy();

      Router()
          .case('/product/<id:\\d{1,2}>/', handler1)
          .case('/product/<id:\\d{4}>/', handler2)
          .case('/product/1234/', handler3)
          .match('/product/1234/');

      assert(!handler1.called);
      assert(handler2.called);
      assert(!handler3.called);

    });

    it('passes capture groups from the pattern to the handler.', function() {

      var handler = sinon.spy();

      Router()
          .case('/products/<id:\\d+>/sizes/<size:sm|md|lg>', handler)
          .match('/products/123/sizes/md');

      assert(handler.calledWith('123', 'md'));
    });

    it('stops matching after finding the first successful match.', function() {

      var handler1 = sinon.spy();
      var handler2 = sinon.spy();
      var handler3 = sinon.spy();

      Router()
          .case('/bar/', handler1)
          .case('/foo/', handler2)
          .case(/.*/, handler3)
          .match('/foo/');

      assert(!handler1.called);
      assert(handler2.called);
      assert(!handler3.called);

    });
  });

});

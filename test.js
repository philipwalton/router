/* global describe, it */

var assert = require('assert');
var router = require('./');
var sinon = require('sinon');

describe('Router', function() {

  describe('#case', function() {

    it('stores a string pattern and a corresponding handler.', function() {
      var noop = function(){};
      var r = router();
      assert.deepEqual(r.routes_, []);

      r.case('/foo/', noop);
      r.case('/foo/:bar/', noop);
      r.case('/foo/:bar/fizz/:buzz', noop);

      assert.deepEqual(r.routes_, [
        {
          pattern: new RegExp('^/foo/'),
          fn: noop
        },
        {
          pattern: new RegExp('^/foo/([\\w\\-]+)/'),
          fn: noop
        },
        {
          pattern: new RegExp('^/foo/([\\w\\-]+)/fizz/([\\w\\-]+)'),
          fn: noop
        }
      ]);
    });

    it('stores a regular expression and a corresponding handler.', function() {
      var noop = function(){};
      var r = router();
      assert.deepEqual(r.routes_, []);

      var regExes = [
        /\/foo/,
        /\/foo\/\d+\/bar/
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

      router()
          .case('/bar', handler1)
          .case('/foo', handler2)
          .match('/foobar');

      assert(!handler1.called);
      assert(handler2.called);

    });

    it('passes capture groups from the pattern to the handler.', function() {

      var handler = sinon.spy();

      router()
          .case('/products/:id/sizes/:size', handler)
          .match('/products/123/sizes/large');

      assert(handler.calledWith('123', 'large'));
    });

    it('stops matching after finding the first successful match.', function() {

      var handler1 = sinon.spy();
      var handler2 = sinon.spy();
      var handler3 = sinon.spy();

      router()
          .case('/bar', handler1)
          .case('/foo', handler2)
          .case('/foobar', handler3)
          .match('/foobar');

      assert(!handler1.called);
      assert(handler2.called);
      assert(!handler3.called);

    });
  });

});

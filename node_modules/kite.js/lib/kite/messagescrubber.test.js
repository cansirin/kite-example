'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _error = require('./error');

var _error2 = _interopRequireDefault(_error);

var _constants = require('../constants');

var _messagescrubber = require('./messagescrubber');

var _messagescrubber2 = _interopRequireDefault(_messagescrubber);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('kite/messagescrubber', () => {
  it('expects a kite to be passed', () => {
    (0, _expect2.default)(() => new _messagescrubber2.default()).toThrow(/invalid kite: undefined/);
    (0, _expect2.default)(() => new _messagescrubber2.default({ kite: new _2.default({ autoConnect: false }) })).toNotThrow();
  });

  describe('wrapMessage', () => {
    it('wraps params', () => {
      const kite = new _2.default({ autoConnect: false });
      let called = false;

      let callback = () => called = true;

      const scrubber = new _messagescrubber2.default({ kite });
      const params = [1, 2, 3, 4];

      const result = scrubber.wrapMessage(params, callback);

      (0, _expect2.default)(result.kite).toInclude(_constants.Defaults.KiteInfo);
      (0, _expect2.default)(result.withArgs).toEqual(params);

      // test the returned responseCallback works correctly
      (0, _expect2.default)(called).toBe(false);
      result.responseCallback({});
      (0, _expect2.default)(called).toBe(true);

      _expect2.default.spyOn(_error2.default, 'makeProperError');
      result.responseCallback({ error: 'raw error' });
      (0, _expect2.default)(_error2.default.makeProperError).toHaveBeenCalledWith('raw error');
    });

    it('wraps kite auth option as authentication param', () => {
      const kite = new _2.default({ autoConnect: false, auth: { foo: 'bar' } });
      const scrubber = new _messagescrubber2.default({ kite });

      const result = scrubber.wrapMessage([1, 2, 3], () => {});

      (0, _expect2.default)(result.authentication).toEqual({ foo: 'bar' });
    });
  });

  describe('scrub', () => {
    it('scrubs parameters to make it ready for rpc call', () => {
      const kite = new _2.default({ autoConnect: false });
      const scrubber = new _messagescrubber2.default({ kite });

      const result = scrubber.scrub('ping', [1, 2], () => {});

      (0, _expect2.default)(result.method).toBe('ping');
      (0, _expect2.default)(result.callbacks).toExist();
    });
  });
});
//# sourceMappingURL=messagescrubber.test.js.map
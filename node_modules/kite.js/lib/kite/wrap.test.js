'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _wrap = require('./wrap');

var _wrap2 = _interopRequireDefault(_wrap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('kite/wrap', () => {
  it('should include default api methods', () => {
    const wrapped = (0, _wrap2.default)();

    (0, _expect2.default)(wrapped['kite.systemInfo']).toBeA('function');
    (0, _expect2.default)(wrapped['kite.heartbeat']).toBeA('function');
    (0, _expect2.default)(wrapped['kite.ping']).toBeA('function');
    (0, _expect2.default)(wrapped['kite.tunnel']).toBeA('function');
    (0, _expect2.default)(wrapped['kite.log']).toBeA('function');
    (0, _expect2.default)(wrapped['kite.print']).toBeA('function');
    (0, _expect2.default)(wrapped['kite.prompt']).toBeA('function');
    (0, _expect2.default)(wrapped['kite.getPass']).toBeA('function');
    (0, _expect2.default)(wrapped['kite.heartbeat']).toBeA('function');
  });

  describe('defaults["kite.heartbeat"]', () => {
    it('should assign heartbeatHandle to the object wrap being called', () => {
      const thing = {};
      const wrapped = _wrap2.default.call(thing, {});

      const duration = 1000;
      const noop = () => {};

      wrapped['kite.heartbeat'](duration, noop, noop);

      (0, _expect2.default)(thing.heartbeatHandle).toExist();
    });
  });

  it('should use given methods instead of defaults when exists', () => {
    let thing = {};
    let flags = {};
    const wrapped = _wrap2.default.call(thing, {
      'kite.systemInfo': () => flags['kite.systemInfo'] = true,
      'kite.heartbeat': () => flags['kite.heartbeat'] = true,
      'kite.ping': () => flags['kite.ping'] = true,
      'kite.tunnel': () => flags['kite.tunnel'] = true,
      'kite.log': () => flags['kite.log'] = true,
      'kite.print': () => flags['kite.print'] = true,
      'kite.prompt': () => flags['kite.prompt'] = true,
      'kite.getPass': () => flags['kite.getPass'] = true
    });

    wrapped['kite.systemInfo']();
    wrapped['kite.heartbeat']();
    wrapped['kite.ping']();
    wrapped['kite.tunnel']();
    wrapped['kite.log']();
    wrapped['kite.print']();
    wrapped['kite.prompt']();
    wrapped['kite.getPass']();
    wrapped['kite.heartbeat']();

    (0, _expect2.default)(flags['kite.systemInfo']).toBe(true);
    (0, _expect2.default)(flags['kite.heartbeat']).toBe(true);
    (0, _expect2.default)(flags['kite.ping']).toBe(true);
    (0, _expect2.default)(flags['kite.tunnel']).toBe(true);
    (0, _expect2.default)(flags['kite.log']).toBe(true);
    (0, _expect2.default)(flags['kite.print']).toBe(true);
    (0, _expect2.default)(flags['kite.prompt']).toBe(true);
    (0, _expect2.default)(flags['kite.getPass']).toBe(true);
    (0, _expect2.default)(flags['kite.heartbeat']).toBe(true);
  });
});
//# sourceMappingURL=wrap.test.js.map
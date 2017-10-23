'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

var _constants = require('./constants');

var constants = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('constants', () => it('should expose required constants', () => {
  (0, _expect2.default)(constants.Event).toExist();
  (0, _expect2.default)(Object.keys(constants.Event)).toEqual(constants.KnownEvents);
  const requiredEvents = ['backOffFailed', 'tokenExpired', 'tokenSet', 'register', 'request', 'message', 'critical', 'notice', 'error', 'warn', 'info', 'open', 'close', 'debug'];

  requiredEvents.forEach(event => (0, _expect2.default)(constants.KnownEvents.includes(event)).toBe(true));

  (0, _expect2.default)(constants.AuthType).toExist();
  (0, _expect2.default)(constants.AuthType.token).toExist();

  (0, _expect2.default)(constants.TimerHandles).toExist();
  (0, _expect2.default)(constants.TimerHandles.includes('heartbeatHandle')).toBe(true);

  (0, _expect2.default)(constants.WhiteList).toExist();
  (0, _expect2.default)(constants.WhiteList.includes('kite.ping')).toBe(true);

  (0, _expect2.default)(constants.State.NOTREADY).toBe(0);
  (0, _expect2.default)(constants.State.READY).toBe(1);
  (0, _expect2.default)(constants.State.CLOSED).toBe(3);
  (0, _expect2.default)(constants.State.CONNECTING).toBe(5);

  (0, _expect2.default)(constants.DebugLevel.CRITICAL).toBe(0);
  (0, _expect2.default)(constants.DebugLevel.DEBUG).toBe(5);

  (0, _expect2.default)(constants.Version).toBe(_package2.default.version);
}));
//# sourceMappingURL=constants.test.js.map
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (options = {}) {
  const { backoff = {} } = options;
  let totalReconnectAttempts = 0;
  const initalDelayMs = backoff.initialDelayMs != null ? backoff.initialDelayMs : _constants.Backoff.INITIAL_DELAY;
  const multiplyFactor = backoff.multiplyFactor != null ? backoff.multiplyFactor : _constants.Backoff.MULTIPLY_FACTOR;
  const maxDelayMs = backoff.maxDelayMs != null ? backoff.maxDelayMs : _constants.Backoff.MAX_DELAY;
  const maxReconnectAttempts = backoff.maxReconnectAttempts != null ? backoff.maxReconnectAttempts : _constants.Backoff.MAX_RECONNECT_ATTEMPTS;

  this.clearBackoffTimeout = () => totalReconnectAttempts = 0;

  this.clearBackoffHandle = function () {
    if (this.backoffHandle != null) {
      this.backoffHandle.clear();
      return this.backoffHandle = null;
    }
  };

  return this.setBackoffTimeout = fn => {
    this.clearBackoffHandle();
    if (totalReconnectAttempts < maxReconnectAttempts) {
      const timeout = Math.min(initalDelayMs * Math.pow(multiplyFactor, totalReconnectAttempts), maxDelayMs);
      this.backoffHandle = new _timeout2.default(fn, timeout);
      return totalReconnectAttempts++;
    } else {
      return this.emit(_constants.Event.backOffFailed);
    }
  };
};

var _timeout = require('./timeout');

var _timeout2 = _interopRequireDefault(_timeout);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];
//# sourceMappingURL=backoff.js.map
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _error = require('./error');

var _error2 = _interopRequireDefault(_error);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MessageScrubber {

  constructor({ kite } = {}) {
    if (!kite) {
      throw new Error(`invalid kite: ${typeof kite}`);
    }

    this.kite = kite;
  }

  wrapMessage(params, callback) {
    return {
      kite: this.kite.getKiteInfo(),
      authentication: this.kite.options.auth,
      withArgs: params,
      responseCallback(response) {
        const { error: rawErr, result } = response || {};
        const err = rawErr != null ? _error2.default.makeProperError(rawErr) : null;

        return callback(err, result);
      }
    };
  }

  scrub(method, params, callback) {
    if (!callback && typeof params === 'function') {
      callback = params;
      params = [];
    }

    callback = callback || MessageScrubber.defaultCallback(this.kite);

    // by default, remove this callback after it is called once.
    if (callback.times == null) {
      callback.times = 1;
    }

    let scrubbed = this.kite.proto.scrubber.scrub([this.wrapMessage(params, callback)]);

    scrubbed.method = method;

    return scrubbed;
  }
}
exports.default = MessageScrubber;

MessageScrubber.defaultCallback = kite => () => {
  kite.emit(_constants.Event.debug, 'Unhandled call dropping to the floor.');
};

module.exports = exports['default'];
//# sourceMappingURL=messagescrubber.js.map
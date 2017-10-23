'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _define = require('./define');

var _define2 = _interopRequireDefault(_define);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Emitter extends _events.EventEmitter {
  bound(method) {
    if (this[method] == null) {
      throw new Error(`Could not bind method: ${method}`);
    }
    const boundMethod = `__bound__${method}`;
    boundMethod in this || (0, _define2.default)(this, boundMethod, { value: this[method].bind(this) });
    return this[boundMethod];
  }

  lazyBound(method, ...args) {
    if (typeof this[method] === 'function') {
      return this[method].bind(this, ...args);
    }

    throw new Error(`lazyBound: unknown method! ${method}`);
  }
}
exports.default = Emitter;
module.exports = exports['default'];
//# sourceMappingURL=emitter.js.map
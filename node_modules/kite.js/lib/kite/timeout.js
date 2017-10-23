'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _delayed = require('./delayed');

var _delayed2 = _interopRequireDefault(_delayed);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Timeout extends _delayed2.default {
  begin() {
    return this.handle = setTimeout(this.fn, this.ms, ...Array.from(this.params));
  }

  clear() {
    return clearTimeout(this.handle);
  }
}
exports.default = Timeout;
module.exports = exports['default'];
//# sourceMappingURL=timeout.js.map
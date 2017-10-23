'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _delayed = require('./delayed');

var _delayed2 = _interopRequireDefault(_delayed);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Interval extends _delayed2.default {
  begin() {
    return this.handle = setInterval(this.fn, this.ms, ...Array.from(this.params));
  }

  clear() {
    return clearInterval(this.handle);
  }
}
exports.default = Interval;
module.exports = exports['default'];
//# sourceMappingURL=interval.js.map
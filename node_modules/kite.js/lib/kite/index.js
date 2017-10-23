'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Kite extends _base2.default {
  tell(method, ...params) {
    return new _bluebird2.default((resolve, reject) => super.tell(method, ...params, (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    }));
  }

  ready(callback) {
    return new _bluebird2.default(resolve => super.ready(resolve)).nodeify(callback);
  }
}

Kite.expireToken = _bluebird2.default.promisify(_base2.default.prototype.expireToken);

exports.default = Kite;
module.exports = exports['default'];
//# sourceMappingURL=index.js.map
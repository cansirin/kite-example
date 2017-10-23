'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _kite = require('../kite');

var _kite2 = _interopRequireDefault(_kite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const methods = ['fetchKites', 'fetchKite', 'watchKites', 'cancelWatcher', 'register'];

class Kontrol extends _base2.default {}

Kontrol.prototype.Kite = _kite2.default;

for (var method of methods) {
  Kontrol.prototype[method] = _bluebird2.default.promisify(_base2.default.prototype[method]);
}

exports.default = Kontrol;
module.exports = exports['default'];
//# sourceMappingURL=index.js.map
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _atob = require('atob');

var _atob2 = _interopRequireDefault(_atob);

var _tryJsonParse = require('try-json-parse');

var _tryJsonParse2 = _interopRequireDefault(_tryJsonParse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = kiteKey => {
  const kontrolClaimsA = kiteKey.split('.')[1];
  return (0, _tryJsonParse2.default)((0, _atob2.default)(kontrolClaimsA));
};

module.exports = exports['default'];
//# sourceMappingURL=claims.js.map
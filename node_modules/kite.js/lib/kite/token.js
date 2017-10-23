'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jwtSimple = require('jwt-simple');

var _jwtSimple2 = _interopRequireDefault(_jwtSimple);

var _atob = require('atob');

var _atob2 = _interopRequireDefault(_atob);

var _tryJsonParse = require('try-json-parse');

var _tryJsonParse2 = _interopRequireDefault(_tryJsonParse);

var _claims = require('./claims');

var _claims2 = _interopRequireDefault(_claims);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (tokenString, kiteKey) => {
  const [headersA] = tokenString.split('.');
  const kontrolClaims = (0, _claims2.default)(kiteKey);
  const headers = (0, _tryJsonParse2.default)((0, _atob2.default)(headersA));
  const claims = _jwtSimple2.default.decode(tokenString, kontrolClaims.kontrolKey);
  return { headers, claims };
};

module.exports = exports['default'];
//# sourceMappingURL=token.js.map
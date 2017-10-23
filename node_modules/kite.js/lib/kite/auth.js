'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _token = require('./token');

var _token2 = _interopRequireDefault(_token);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _bluebird2.default.method((kite, method, auth, kiteKey) => {
  if (auth == null) {
    if (_constants.WhiteList.includes(method)) {
      return;
    }

    if (!kite.api.shouldAuthenticate(method)) {
      return;
    }

    throw new Error('Access denied!');
  }

  const { type, key } = auth;

  switch (type) {
    case _constants.AuthType.token:
      return (0, _token2.default)(key, kiteKey);
    default:
      throw new Error(`Unknown auth type: ${type}`);
  }
});
module.exports = exports['default'];
//# sourceMappingURL=auth.js.map
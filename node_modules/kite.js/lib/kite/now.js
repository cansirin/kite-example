"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  const now = new Date();
  return new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
};

module.exports = exports["default"];
//# sourceMappingURL=now.js.map
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = Object.defineProperty || ((ctx, name, { value }) => {
  // TODO: what should this error message be?
  if (value == null) {
    throw new Error('Unsupported options!');
  }
  return ctx[name] = value; // just use assignment if defineProperty isn't there
});

module.exports = exports['default'];
//# sourceMappingURL=define.js.map
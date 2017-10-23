'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* global window, navigator */

const os = {
  totalmem: () => 0,
  freemem: () => 0,
  platform: () => navigator.platform,
  homedir: () => '/browser'
};

exports.default = os;
module.exports = exports['default'];
//# sourceMappingURL=os-browser.js.map
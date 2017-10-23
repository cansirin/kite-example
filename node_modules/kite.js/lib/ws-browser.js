'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* global window, WebSocket, MozWebSocket */
let ws = null;

if (typeof WebSocket !== 'undefined') {
  ws = WebSocket;
} else if (typeof MozWebSocket !== 'undefined') {
  ws = MozWebSocket;
} else {
  ws = window.WebSocket || window.MozWebSocket;
}

exports.default = ws;
module.exports = exports['default'];
//# sourceMappingURL=ws-browser.js.map
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ws = require('ws');

var _emitter = require('../../kite/emitter');

var _emitter2 = _interopRequireDefault(_emitter);

var _session = require('./session');

var _session2 = _interopRequireDefault(_session);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Server extends _emitter2.default {
  constructor(options) {
    super();
    this.options = options || {};
    this.options.hostname = this.options.hostname || '0.0.0.0';
    this.server = new _ws.Server({
      port: options.port,
      host: options.hostname
    });
    this.server.on('connection', connection => {
      return this.emit('connection', new _session2.default(connection));
    });
  }

  getAddress() {
    return `${this.server.options.host}:${this.server.options.port}`;
  }

  close() {
    this.server && this.server.close();
  }
}

Server.scheme = 'ws';
Server.secureScheme = 'wws';

exports.default = Server;
module.exports = exports['default'];
//# sourceMappingURL=index.js.map
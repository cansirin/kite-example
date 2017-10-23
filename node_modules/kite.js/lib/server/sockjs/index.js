'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sockjs = require('sockjs');

var _sockjs2 = _interopRequireDefault(_sockjs);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _emitter = require('../../kite/emitter');

var _emitter2 = _interopRequireDefault(_emitter);

var _session = require('./session');

var _session2 = _interopRequireDefault(_session);

var _kitelogger = require('../../kitelogger');

var _kitelogger2 = _interopRequireDefault(_kitelogger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Server extends _emitter2.default {

  constructor(options = {}) {
    super();

    this.options = options;
    this.options.hostname = this.options.hostname || '0.0.0.0';
    if (!this.options.port) throw new Error('port is required!');

    this.logger = new _kitelogger2.default({
      name: options.name,
      level: options.logLevel
    });

    const sockjsOptions = {
      log: (level, message) => {
        if (this.logger[level]) {
          this.logger[level](message);
        }
      }
    };

    this.sockjs = _sockjs2.default.createServer(sockjsOptions);
    this.server = _http2.default.createServer();

    this.sockjs.on('connection', connection => {
      this.logger.debug('a new connection', connection);
      this.emit('connection', new _session2.default(connection));
    });

    this.sockjs.installHandlers(this.server, { prefix: options.prefix || '' });

    this.logger.debug('starting to listen on server', options);
    this.server.listen(options.port, options.hostname);
  }

  getAddress() {
    return `${this.options.hostname}:${this.options.port}`;
  }

  close() {
    if (this.server != null) {
      return this.server.close();
    }
  }
}
exports.default = Server;
Server.scheme = 'http';
Server.secureScheme = 'https';
module.exports = exports['default'];
//# sourceMappingURL=index.js.map
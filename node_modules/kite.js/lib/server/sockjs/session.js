'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _emitter = require('../../kite/emitter');

var _emitter2 = _interopRequireDefault(_emitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Session extends _emitter2.default {
  constructor(connection) {
    super();

    this.connection = connection;

    this.connection.on('data', message => {
      return this.emit('message', message);
    });

    this.connection.on('close', () => {
      return this.emit('close');
    });
  }

  getId() {
    return `${this.connection.remoteAddress}:${this.connection.remotePort}`;
  }

  send(message) {
    return this.connection.write(message);
  }

  close() {
    return this.connection.close();
  }
}
exports.default = Session;
module.exports = exports['default'];
//# sourceMappingURL=session.js.map
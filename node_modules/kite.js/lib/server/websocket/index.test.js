'use strict';

var _kite = require('../../kite');

var _kite2 = _interopRequireDefault(_kite);

var _ = require('./');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const logLevel = 0;

describe('WebSocket Server', () => {
  it('should be able to accept kite connections', done => {
    const kite = new _kite2.default({
      url: 'http://localhost:7777',
      autoReconnect: false,
      autoConnect: false,
      logLevel
    });

    const server = new _2.default({ port: 7777, logLevel });
    server.on('connection', connection => {
      server.close();
      done();
    });

    kite.connect();
  });
});
//# sourceMappingURL=index.test.js.map
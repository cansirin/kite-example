'use strict';

var _kite = require('../../kite');

var _kite2 = _interopRequireDefault(_kite);

var _ = require('./');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const logLevel = 0;

describe('SockJS Server with WebSocket', () => {
  it('should be able to accept kite connections', done => {
    const kite = new _kite2.default({
      url: 'http://localhost:7778',
      autoReconnect: false,
      autoConnect: false,
      transportClass: _kite2.default.transport.SockJS,
      logLevel
    });

    const server = new _2.default({ port: 7778, logLevel });
    server.on('connection', connection => {
      server.close();
      done();
    });

    kite.connect();
  });
});

describe('SockJS Server with XHR', () => {
  it('should be able to accept kite connections', done => {
    const kite = new _kite2.default({
      url: 'http://localhost:7779',
      autoReconnect: false,
      autoConnect: false,
      transportClass: _kite2.default.transport.SockJS,
      transportOptions: {
        transports: ['xhr-polling']
      },
      logLevel
    });

    const server = new _2.default({ port: 7779, logLevel });
    server.on('connection', connection => {
      server.close();
      done();
    });

    kite.connect();
  });
});
//# sourceMappingURL=index.test.js.map
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _base = require('../kite/base');

var _base2 = _interopRequireDefault(_base);

var _error = require('../kite/error');

var _error2 = _interopRequireDefault(_error);

var _getpath = require('./getpath');

var _getpath2 = _interopRequireDefault(_getpath);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Kontrol extends _events.EventEmitter {
  constructor(options) {
    super();

    this.options = options || {};

    if (this.options.autoConnect == null) {
      this.options.autoConnect = true;
    }
    if (this.options.autoReconnect == null) {
      this.options.autoReconnect = true;
    }

    if (this.options.autoConnect) {
      this.authenticate();
    }
  }

  authenticate(options = this.options) {
    this.options = options;

    let name = this.options.name ? this.options.name : 'kontrol';

    this.kite = new this.constructor.Kite({
      url: this.options.url,
      auth: this.options.auth,
      username: this.options.username,
      environment: this.options.environment,
      version: this.options.version,
      region: this.options.region,
      hostname: this.options.hostname,
      name: name,
      logLevel: this.options.logLevel,
      transportClass: this.options.transportClass,
      transportOptions: this.options.transportOptions,
      prefix: this.options.prefix
    });

    this.kite.on(_constants.Event.error, this.emit.bind(this, 'error')); // forward kite error events
    this.kite.on(_constants.Event.open, this.emit.bind(this, 'open'));
  }

  createKite(options) {
    let {
      kite: kiteDescriptor,
      token,
      transportOptions,
      autoConnect,
      autoReconnect,
      url
    } = options;

    if (transportOptions == null) {
      transportOptions = this.options.transportOptions;
    }
    if (autoConnect == null) {
      autoConnect = false;
    }
    if (autoReconnect == null) {
      autoReconnect = true;
    }

    const kite = new this.constructor.Kite({
      logLevel: this.options.logLevel,
      username: kiteDescriptor.username,
      environment: kiteDescriptor.environment,
      version: kiteDescriptor.version,
      region: kiteDescriptor.region,
      hostname: kiteDescriptor.hostname,
      autoConnect,
      autoReconnect,
      name: kiteDescriptor.name,
      url,
      auth: {
        type: 'token',
        key: token
      },
      transportClass: this.options.transportClass,
      transportOptions
    }).on(_constants.Event.tokenExpired, () => {
      return this.renewToken(kite, kiteDescriptor);
    });

    return kite;
  }

  renewToken(kite, query) {
    return this.kite.tell('getToken', [query], (err, token) => {
      if (err) {
        // FIXME: what should happen to this error?
        console.error(err);
        return;
      }
      return kite.setToken(token);
    });
  }

  createKites(kiteDescriptors, query) {
    return Array.from(kiteDescriptors).map(k => this.createKite(k));
  }

  fetchKites(args = {}, callback) {
    this.kite.tell('getKites', [args], (err, result) => {
      if (err != null) {
        callback(err);
        return;
      }

      if (result == null) {
        callback(this.createKiteNotFoundError(args.query));
        return;
      }

      callback(null, this.createKites(result.kites));
    });
  }

  fetchKite(args = {}, callback) {
    this.fetchKites(args, (err, kites) => {
      if (err != null) {
        callback(err);
        return;
      }

      if ((kites != null ? kites[0] : undefined) == null) {
        callback(this.createKiteNotFoundError(args.query));
        return;
      }

      callback(null, kites[0]);
    });
  }

  watchKites(args = {}, callback) {
    const changes = new _events.EventEmitter();
    args.watchHandler = this.createUpdateHandler(changes);
    this.kite.tell('getKites', [args], (err, result) => {
      if (err != null) {
        callback(err);
        return;
      }

      const { kites: kiteDescriptors, watcherID } = result;

      callback(null, { changes, watcherID });

      for (let kite of this.createKites(kiteDescriptors)) {
        changes.emit(_constants.Event.register, kite);
      }
    });
  }

  cancelWatcher(id, callback) {
    return this.kite.tell('cancelWatcher', [id], callback);
  }

  createUpdateHandler(changes) {
    return response => {
      const { err, result } = response;

      if (err != null) {
        changes.emit(_constants.Event.error, err);
        return;
      }

      let { action, kite, token, url } = result;

      kite = this.createKite({ kite, token, url });

      const eventName = this.constructor.actions[action];
      changes.emit(eventName, kite);
    };
  }

  createKiteNotFoundError(query) {
    return new _error2.default(`No kite found for query: ${(0, _getpath2.default)(query)}`);
  }

  connect() {
    return this.kite.connect();
  }

  disconnect() {
    return this.kite.disconnect();
  }

  register(url, callback) {
    return this.kite != null ? this.kite.tell('register', [url], callback) : undefined;
  }
}

Kontrol.version = _constants.Defaults.KiteInfo.version;
Kontrol.Kite = _base2.default;
Kontrol.actions = _constants.KontrolActions;

exports.default = Kontrol;
module.exports = exports['default'];
//# sourceMappingURL=base.js.map
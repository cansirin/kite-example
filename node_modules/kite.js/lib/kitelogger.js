'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = require('./constants');

const defaults = {
  error: (...args) => console.error(...args),
  warn: (...args) => console.warn(...args),
  info: (...args) => console.info(...args)
};

class Logger {
  constructor(options = {}) {
    const {
      name,
      level = _constants.DebugLevel.INFO,
      error = defaults.error,
      warn = defaults.warn,
      info = defaults.info
    } = options;

    this.name = name;
    this.level = level;
    this.loggers = { error, warn, info };
  }

  logMessage(category, loggerType, ...args) {
    if (_constants.DebugLevel[category] <= this.level) {
      this.loggers[loggerType](`[${this.name}]`, category, ...args);
    }
  }

  critical(...args) {
    this.logMessage('CRITICAL', 'error', ...args);
  }

  error(...args) {
    this.logMessage('ERROR', 'error', ...args);
  }

  warning(...args) {
    this.logMessage('WARNING', 'warn', ...args);
  }

  notice(...args) {
    this.logMessage('NOTICE', 'info', ...args);
  }

  info(...args) {
    this.logMessage('INFO', 'info', ...args);
  }

  debug(...args) {
    this.logMessage('DEBUG', 'info', ...args);
  }
}
exports.default = Logger;
module.exports = exports['default'];
//# sourceMappingURL=kitelogger.js.map
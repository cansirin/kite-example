'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _kitelogger = require('./kitelogger');

var _kitelogger2 = _interopRequireDefault(_kitelogger);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Logger', () => {
  it('works', () => {
    const logs = {
      error: [],
      warn: [],
      info: []
    };

    const logger = new _kitelogger2.default({
      name: 'foobar',
      level: _constants.DebugLevel.DEBUG,
      error: (...args) => logs.error.push(args),
      warn: (...args) => logs.warn.push(args),
      info: (...args) => logs.info.push(args)
    });

    logger.critical('one');
    logger.error('two');
    logger.warning('three');
    logger.notice('four');
    logger.info('five');
    logger.debug('six');

    (0, _expect2.default)(logs.error[0]).toEqual(['[foobar]', 'CRITICAL', 'one']);
    (0, _expect2.default)(logs.error[1]).toEqual(['[foobar]', 'ERROR', 'two']);
    (0, _expect2.default)(logs.warn[0]).toEqual(['[foobar]', 'WARNING', 'three']);
    (0, _expect2.default)(logs.info[0]).toEqual(['[foobar]', 'NOTICE', 'four']);
    (0, _expect2.default)(logs.info[1]).toEqual(['[foobar]', 'INFO', 'five']);
    (0, _expect2.default)(logs.info[2]).toEqual(['[foobar]', 'DEBUG', 'six']);
  });
});
//# sourceMappingURL=kitelogger.test.js.map
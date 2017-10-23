'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _error = require('./error');

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('KiteError', () => it('should provide a generic Error object', () => {
  (0, _expect2.default)(_error2.default).toExist();
  let anError = new _error2.default('an error');

  (0, _expect2.default)(anError).toExist();
  (0, _expect2.default)(anError instanceof Error).toBe(true);
  (0, _expect2.default)(anError.name).toBe('KiteError');
  (0, _expect2.default)(anError.message).toBe('an error');
}));

describe('KiteError.codeIs', () => it('should support code checking on a given error', () => {
  let anError = new _error2.default('an error');

  anError.code = 100;
  (0, _expect2.default)(_error2.default.codeIs(100)(anError)).toBe(true);
  (0, _expect2.default)(_error2.default.codeIs(101)(anError)).toBe(false);
}));

describe('KiteError.codeIsnt', () => it('should support code checking on a given error', () => {
  let anError = new _error2.default('an error');

  anError.code = 100;
  (0, _expect2.default)(_error2.default.codeIsnt(101)(anError)).toBe(true);
  (0, _expect2.default)(_error2.default.codeIsnt(100)(anError)).toBe(false);
}));

describe('KiteError.makeProperError', () => it('should generate a proper error', () => {
  let anError = _error2.default.makeProperError({
    type: 'AnErrorType',
    code: 200,
    message: 'an error'
  });

  (0, _expect2.default)(anError).toExist();
  (0, _expect2.default)(anError instanceof Error).toBe(true);
  (0, _expect2.default)(anError.name).toBe('KiteError');
  (0, _expect2.default)(anError.type).toBe('AnErrorType');
  (0, _expect2.default)(anError.code).toBe(200);
  (0, _expect2.default)(anError.message).toBe('an error');
}));
//# sourceMappingURL=error.test.js.map
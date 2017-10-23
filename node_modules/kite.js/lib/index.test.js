'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _src = require('../src');

var _src2 = _interopRequireDefault(_src);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('kite.js', () => it('should provide Kontrol, Kite and KiteServer', () => {
  (0, _expect2.default)(_src2.default.Kite).toExist();
  (0, _expect2.default)(_src2.default.KiteApi).toExist();
  (0, _expect2.default)(_src2.default.Kontrol).toExist();
  (0, _expect2.default)(_src2.default.KiteServer).toExist();
}));
//# sourceMappingURL=index.test.js.map
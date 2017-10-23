const { Kite, KiteServer } = require('kite.js')

const logLevel = 0

const math = new KiteServer({
  name: 'math',
  auth: false,
  logLevel,
  api: {
    sum: function(x, y, callback) {
      callback(null, x + y)
    },
    sub: function(x, y, callback) {
      callback(null, x - y)
    },
    square: function(x, callback) {
      callback(null, x * x)
    },
  },
})

math.listen(7780)

const kite = new Kite({
  url: 'http://0.0.0.0:7780',
  autoReconnect: false,
  autoConnect: false,
  logLevel,
})

kite.on('open', () => {
  kite.tell('sum', [6, 3]).then(res => console.log(res))
  kite.tell('sub', [6, 3]).then(res => console.log(res))
  kite.tell('square', 6).then(res => console.log(res))
})

kite.connect()

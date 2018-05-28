const debug = false

const db = require('knex')({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: 'bh32q63p2km',
    database: 'espresso'
  },
  debug
})

module.exports = db

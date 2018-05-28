const _ = require('lodash')
const objects = require('../tools/objects')
const tables = require('./tables')

const del = async (trx, table, id) => {
  const affected = await trx(table)
    .where({
      [tables[_.camelCase(table)].row.id]: id
    })
    .del()
  return affected
}

const get = async (trx, table, { id = null, orderBy = null }) => {
  let rows = null
  if (id == null) {
    if (orderBy != null) {
      rows = await trx(table).orderBy(orderBy)
    } else {
      rows = await trx(table)
    }
  } else {
    rows = await trx(table).where({
      [tables[_.camelCase(table)].row.id]: id
    })
  }
  return objects.camel(rows)
}

module.exports = {
  delete: del,
  get
}

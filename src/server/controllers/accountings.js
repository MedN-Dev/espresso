const base = require('./base')
const tables = require('./tables')
const object = require('../tools/object')
const objects = require('../tools/objects')

const del = async (trx, id) => {
  const affected = await base.delete(trx, tables.accountings.name, id)
  return affected
}

const deleteBy = async (trx, { companyId }) => {
  let where = {
    [tables.accountings.row.companyId]: companyId
  }
  const affected = await trx(tables.accountings.name)
    .where(where)
    .del()
  return affected
}

const get = async (trx, id = null) => {
  const rows = await base.get(trx, tables.accountings.name, {
    id,
    orderBy: tables.accountings.row.code
  })
  return rows
}

const getBy = async (trx, { companyId }) => {
  let where = {
    [tables.accountings.row.companyId]: companyId
  }
  const rows = await trx(tables.accountings.name)
    .where(where)
    .orderBy(tables.accountings.row.code)
  return objects.camel(rows)
}

const insert = async (trx, payload) => {
  if (Array.isArray(payload)) {
    const normalizedPayload = payload.map(item => {
      const { code, companyId, name, safe = 0 } = item
      return {
        [tables.accountings.row.code]: code,
        [tables.accountings.row.companyId]: companyId,
        [tables.accountings.row.name]: name,
        [tables.accountings.row.safe]: safe
      }
    })
    const rows = await trx(tables.accountings.name).insert(normalizedPayload)
    return rows[0]
  } else {
    const { code, companyId, name, safe = 0 } = payload
    const normalizedPayload = {
      [tables.accountings.row.code]: code,
      [tables.accountings.row.companyId]: companyId,
      [tables.accountings.row.name]: name,
      [tables.accountings.row.safe]: safe
    }
    const rows = await trx(tables.accountings.name).insert(normalizedPayload)
    return rows[0]
  }
}

const update = async (trx, id, { code, name }) => {
  const affected = await trx(tables.accountings.name)
    .where({
      [tables.accountings.row.id]: id
    })
    .update({
      [tables.accountings.row.code]: code,
      [tables.accountings.row.name]: name
    })
  return affected
}

module.exports = {
  delete: del,
  deleteBy,
  get,
  getBy,
  insert,
  update
}

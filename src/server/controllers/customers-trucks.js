const base = require('./base')
const tables = require('./tables')

const del = async (trx, id) => {
  const affected = await base.delete(trx, tables.customersTrucks.name, id)
  return affected
}

const deleteBy = async (trx, { customerId }) => {
  let where = {
    [tables.customersTrucks.row.customerId]: customerId
  }
  const affected = await trx(tables.customersTrucks.name)
    .where(where)
    .del()
  return affected
}

const get = async (trx, id) => {
  const rows = await base.get(trx, tables.customersTrucks.name, {
    id,
    orderBy: tables.customersTrucks.row.customerId
  })
  return rows
}

const insert = async (trx, payload) => {
  if (Array.isArray(payload)) {
    const normalizedPayload = payload.map(item => {
      const { customerId, truck } = item
      return {
        [tables.customersTrucks.row.customerId]: customerId,
        [tables.customersTrucks.row.truck]: truck
      }
    })
    const rows = await trx(tables.customersTrucks.name).insert(
      normalizedPayload
    )
    return rows[0]
  } else {
    const { customerId, truck } = payload
    const normalizedPayload = {
      [tables.customersTrucks.row.customerId]: customerId,
      [tables.customersTrucks.row.truck]: truck
    }
    const rows = await trx(tables.customersTrucks.name).insert(
      normalizedPayload
    )
    return rows[0]
  }
}

const update = async (trx, id, { customerId, truck }) => {
  const affected = await trx(tables.customersTrucks.name)
    .where({
      [tables.customersTrucks.row.id]: id
    })
    .update({
      [tables.customersTrucks.row.customerId]: customerId,
      [tables.customersTrucks.row.truck]: truck
    })
  return affected
}

module.exports = {
  delete: del,
  deleteBy,
  get,
  insert,
  update
}

const _ = require('lodash')
const object = require('../tools/object')
const objects = require('../tools/objects')
const base = require('./base')
const tables = require('./tables')

const del = async (trx, id) => {
  const affected = await base.delete(trx, tables.customers.name, id)
  return affected
}

const get = async (trx, id = null) => {
  let rows = null
  if (id == null) {
    rows = await knexGet(trx)
  } else {
    rows = await knexGet(trx).where({
      [tables.customers.name + '.' + tables.customers.row.id]: id
    })
  }
  rows = groupRows(rows)
  return objects.camel(rows)
}

const getBy = async (trx, { companyId }) => {
  let where = {
    [tables.customers.row.companyId]: companyId
  }
  let rows = await knexGet(trx).where(where)
  if (rows.length < 1) {
    return []
  }
  rows = groupRows(rows)
  return objects.camel(rows)
}

const groupRows = rows => {
  const groups = _.groupBy(rows, tables.customers.row.id)
  const normalizedRows = Object.keys(groups).map(id => {
    const normalizedTrucks = groups[id].reduce((trucks, row) => {
      const truck = row[tables.customersTrucks.row.truck]
      if (truck == null || trucks.includes(truck)) {
        return trucks
      }
      return [...trucks, truck]
    }, [])
    const row = groups[id][0]
    return _.omit(
      {
        ...row,
        account: {
          bank: row[tables.customers.row.accountBank],
          code: row[tables.customers.row.accountCode],
          name: row[tables.customers.row.accountName]
        },
        trucks: normalizedTrucks
      },
      [
        tables.customers.row.accountBank,
        tables.customers.row.accountCode,
        tables.customers.row.accountName,
        tables.customersTrucks.row.truck
      ]
    )
  })
  return normalizedRows
}

const insert = async (trx, payload) => {
  if (Array.isArray(payload)) {
    const normalizedPayload = payload.map(item => {
      const {
        account = { bank: null, code: null, name: null },
        address,
        code,
        companyId,
        name,
        phone
      } = item
      return {
        [tables.customers.row.accountBank]: account.bank,
        [tables.customers.row.accountCode]: account.code,
        [tables.customers.row.accountName]: account.name,
        [tables.customers.row.address]: address,
        [tables.customers.row.code]: code,
        [tables.customers.row.companyId]: companyId,
        [tables.customers.row.name]: name,
        [tables.customers.row.phone]: phone
      }
    })
    const rows = await trx(tables.customers.name).insert(normalizedPayload)
    return rows[0]
  } else {
    const {
      account = { bank: null, code: null, name: null },
      address,
      code,
      companyId,
      name,
      phone
    } = payload
    const normalizedPayload = {
      [tables.customers.row.accountBank]: account.bank,
      [tables.customers.row.accountCode]: account.code,
      [tables.customers.row.accountName]: account.name,
      [tables.customers.row.address]: address,
      [tables.customers.row.code]: code,
      [tables.customers.row.companyId]: companyId,
      [tables.customers.row.name]: name,
      [tables.customers.row.phone]: phone
    }
    const rows = await trx(tables.customers.name).insert(normalizedPayload)
    return rows[0]
  }
}

const knexGet = trx => {
  return trx(tables.customers.name)
    .select(
      tables.customers.name + '.*',
      tables.customersTrucks.name + '.' + tables.customersTrucks.row.truck
    )
    .leftJoin(
      tables.customersTrucks.name,
      tables.customers.name + '.' + tables.customers.row.id,
      tables.customersTrucks.name + '.' + tables.customersTrucks.row.customerId
    )
}

const update = async (trx, id, { account, address, code, name, phone }) => {
  const affected = await trx(tables.customers.name)
    .where({
      [tables.customers.row.id]: id
    })
    .update({
      [tables.customers.row.accountBank]: account.bank,
      [tables.customers.row.accountCode]: account.code,
      [tables.customers.row.accountName]: account.name,
      [tables.customers.row.address]: address,
      [tables.customers.row.code]: code,
      [tables.customers.row.name]: name,
      [tables.customers.row.phone]: phone
    })
  return affected
}

module.exports = {
  delete: del,
  get,
  getBy,
  insert,
  update
}

const base = require('./base')
const tables = require('./tables')
const object = require('../tools/object')
const objects = require('../tools/objects')

const del = async (trx, id) => {
  try {
    const affected = await base.delete(trx, tables.companies.name, id)
    if (affected < 1) {
      throw new Error()
    }
    return affected
  } catch (err) {
    trx.rollback()
    return 0
  }
}

const get = async (trx, id = null) => {
  const rows = await base.get(trx, tables.companies.name, {
    id,
    orderBy: tables.companies.row.name
  })
  return rows
}

const getActive = async trx => {
  const rows = await trx(tables.companies.name).where({
    [tables.companies.row.active]: 1
  })
  return rows.length === 1 ? object.camel(rows[0]) : null
}

const getMin = async trx => {
  let rows = await trx(tables.companies.name).min({ id: 'id' })
  if (rows.length !== 1) {
    return
  }
  rows = await get(trx, rows[0].id)
  return rows.length === 1 ? rows[0] : null
}

const insert = async (trx, payload) => {
  if (Array.isArray(payload)) {
    const normalizedPayload = payload.map(item => {
      const { address, avatar, code, name, phone, taxCode, active = 0 } = item
      return {
        [tables.companies.row.active]: active,
        [tables.companies.row.address]: address,
        [tables.companies.row.avatar]: avatar,
        [tables.companies.row.code]: code,
        [tables.companies.row.name]: name,
        [tables.companies.row.phone]: phone,
        [tables.companies.row.taxCode]: taxCode
      }
    })
    const rows = await trx(tables.companies.name).insert(normalizedPayload)
    return rows[0]
  } else {
    const { address, avatar, code, name, phone, taxCode, active = 0 } = payload
    const normalizedPayload = {
      [tables.companies.row.active]: active,
      [tables.companies.row.address]: address,
      [tables.companies.row.avatar]: avatar,
      [tables.companies.row.code]: code,
      [tables.companies.row.name]: name,
      [tables.companies.row.phone]: phone,
      [tables.companies.row.taxCode]: taxCode
    }
    const rows = await trx(tables.companies.name).insert(normalizedPayload)
    return rows[0]
  }
}

const setActive = async (trx, id) => {
  try {
    await trx(tables.companies.name)
      .whereNot({
        [tables.companies.row.id]: id
      })
      .update({
        [tables.companies.row.active]: 0
      })
    const affected = await trx(tables.companies.name)
      .where({
        [tables.companies.row.id]: id
      })
      .update({
        [tables.companies.row.active]: 1
      })
    if (affected !== 1) {
      throw new Error()
    }
    return true
  } catch (err) {
    trx.rollback()
    return false
  }
}

const update = async (
  trx,
  id,
  { address, avatar, code, name, phone, taxCode }
) => {
  const affected = await trx(tables.companies.name)
    .where({
      [tables.companies.row.id]: id
    })
    .update({
      [tables.companies.row.address]: address,
      [tables.companies.row.avatar]: avatar,
      [tables.companies.row.code]: code,
      [tables.companies.row.name]: name,
      [tables.companies.row.phone]: phone,
      [tables.companies.row.taxCode]: taxCode
    })
  return affected
}

module.exports = {
  delete: del,
  get,
  getActive,
  getMin,
  insert,
  setActive,
  update
}

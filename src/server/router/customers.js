const _ = require('lodash')
const customers = require('../controllers/customers')
const customersTrucks = require('../controllers/customers-trucks')
const knex = require('../tools/knex')

const router = require('express').Router()
router
  .delete('/:id', (req, res) => {
    console.log('DELETE /api/customers/' + req.params.id)
    const id = parseInt(req.params.id)
    // TODO
  })
  .get('/company/:companyId', async (req, res) => {
    console.log('GET    /api/customers/company/' + req.params.companyId)
    const companyId = parseInt(req.params.companyId)
    knex
      .transaction(async trx => {
        const rows = await customers.getBy(trx, { companyId })
        res.status(200).json(rows)
      })
      .catch(err => {
        console.dir(err)
        res.status(500).json({
          error: {
            message: `${err.name}: ${err.message}`
          }
        })
      })
  })
  .patch('/:id', (req, res) => {
    console.log('PATCH  /api/customers/' + req.params.id)
    const id = parseInt(req.params.id)
    const { account, address, code, name, phone, trucks } = req.body
    knex
      .transaction(async trx => {
        // #region update customers
        let affected = await customers.update(trx, id, {
          account,
          address,
          code,
          name,
          phone
        })
        if (affected !== 1) {
          throw new Error('data can not update')
        }
        // #endregion
        // #region update customers_trucks
        affected = await customersTrucks.deleteBy(trx, { customerId: id })
        if (affected < 0) {
          throw new Error('data can not update')
        }
        const lastId = await customersTrucks.insert(
          trx,
          trucks.map(item => ({ customerId: id, truck: item }))
        )
        if (!lastId) {
          throw new Error('data can not update')
        }
        // #endregion
        const rows = await customers.get(trx, id)
        if (rows.length !== 1) {
          throw new Error('no data')
        }
        res.status(200).json(rows[0])
      })
      .catch(err => {
        console.dir(err)
        res.status(500).json({
          error: {
            message: `${err.name}: ${err.message}`,
            payload: {
              ...req.body,
              id: req.params.id
            }
          }
        })
      })
  })
  .post('/', (req, res) => {
    console.log('POST   /api/customers/')
    const { account, address, code, companyId, name, phone, trucks } = req.body
    knex
      .transaction(async trx => {
        // #region insert customers
        const id = await customers.insert(trx, {
          account,
          address,
          code,
          companyId,
          name,
          phone
        })
        // #endregion
        // #region insert customers_trucks
        const lastId = await customersTrucks.insert(
          trx,
          trucks.map(item => ({ customerId: id, truck: item }))
        )
        if (!lastId) {
          throw new Error('data can not insert')
        }
        // #endregion
        const rows = await customers.get(trx, id)
        if (rows.length !== 1) {
          throw new Error('no data')
        }
        res.status(201).json(rows[0])
      })
      .catch(err => {
        console.dir(err)
        res.status(500).json({
          error: {
            message: `${err.name}: ${err.message}`,
            payload: req.body
          }
        })
      })
  })

module.exports = router

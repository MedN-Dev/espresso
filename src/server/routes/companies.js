const Express = require('express')
const _ = require('lodash')
const accountings = require('../controllers/accountings')
const companies = require('../controllers/companies')
const knex = require('../tools/knex')

const router = Express.Router()
router
  .delete('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    knex
      .transaction(async trx => {
        const rows = await companies.get(trx, id)
        if (rows.length !== 1) {
          throw new Error('no data')
        }
        // #region delete companies
        let affected = await companies.delete(trx, id)
        if (affected !== 1) {
          throw new Error('data can not delete')
        }
        const row = await companies.getActive(trx)
        if (row == null) {
          const min = await companies.getMin(trx)
          result = await companies.setActive(trx, min.id)
          if (!result) {
            throw new Error('data can not set new active on delete')
          }
        }
        // #endregion
        // #region delete accountings
        affected = await accountings.deleteBy(trx, {
          companyId: id
        })
        if (affected < 1) {
          throw new Error('no accountings data for delete')
        }
        // #endregion
        res.status(200).json(rows[0])
      })
      .catch(err => {
        console.dir(err)
        res.status(500).json({
          error: {
            message: `${err.name}: ${err.message}`,
            payload: {
              id: req.params.id
            }
          }
        })
      })
  })
  .get('/', async (req, res) => {
    knex
      .transaction(async trx => {
        const rows = await companies.get(trx)
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
  .get('/active', async (req, res) => {
    knex
      .transaction(async trx => {
        const row = await companies.getActive(trx)
        if (row == null) {
          throw new Error('no active data')
        }
        res.status(200).json(row)
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
    const id = parseInt(req.params.id)
    const { address, code, name, phone, taxCode } = req.body
    knex
      .transaction(async trx => {
        const affected = await companies.update(trx, id, {
          address,
          code,
          name,
          phone,
          taxCode
        })
        if (affected !== 1) {
          throw new Error('data can not update')
        }
        const rows = await companies.get(trx, id)
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
  .patch('/active/:id', (req, res) => {
    const id = parseInt(req.params.id)
    knex
      .transaction(async trx => {
        const result = await companies.setActive(trx, id)
        if (!result) {
          throw new Error('data can not update')
        }
        const rows = await companies.get(trx, id)
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
              id: req.params.id
            }
          }
        })
      })
  })
  .post('/', (req, res) => {
    const { address, code, name, phone, prototypeId, taxCode } = req.body
    knex
      .transaction(async trx => {
        // #region insert companies
        const id = await companies.insert(trx, {
          address,
          code,
          name,
          phone,
          taxCode
        })
        // #endregion
        // #region insert accountins
        let rows = await accountings.getBy(trx, {
          companyId: prototypeId
        })
        if (rows.length < 1) {
          throw new Error('no data from prototypeId')
        }
        await accountings.insert(
          trx,
          rows.map(row => {
            return {
              ...row,
              companyId: id
            }
          })
        )
        // #endregion
        rows = await companies.get(trx, id)
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

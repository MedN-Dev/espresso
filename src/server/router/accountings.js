const _ = require('lodash')
const accountings = require('../controllers/accountings')
const knex = require('../tools/knex')

const router = require('express').Router()
router
  .delete('/:id', (req, res) => {
    console.log('DELETE /api/accountings/' + req.params.id)
    const id = parseInt(req.params.id)
    knex
      .transaction(async trx => {
        const rows = await accountings.get(trx, id)
        if (rows.length !== 1) {
          throw new Error('no data')
        }
        if (rows[0].safe === 1) {
          throw new Error('data is safed')
        }
        const affected = await accountings.delete(trx, id)
        if (affected !== 1) {
          throw new Error('data can not delete')
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
  .get('/company/:companyId', async (req, res) => {
    console.log('GET    /api/accountings/company/' + req.params.companyId)
    const companyId = parseInt(req.params.companyId)
    knex
      .transaction(async trx => {
        const rows = await accountings.getBy(knex, { companyId })
        res.status(200).json(rows)
      })
      .catch(err => {
        console.dir(err)
        res.status(500).json({
          error: {
            message: `${err.name}: ${err.message}`,
            payload: {
              companyId: req.params.companyId
            }
          }
        })
      })
  })
  .patch('/:id', (req, res) => {
    console.log('PATCH  /api/accountings/' + req.params.id)
    const id = parseInt(req.params.id)
    const { code, name } = req.body
    knex
      .transaction(async trx => {
        const affected = await accountings.update(trx, id, { code, name })
        if (affected !== 1) {
          throw new Error('data can not update')
        }
        const rows = await accountings.get(trx, id)
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
    console.log('POST   /api/accountings/')
    const { code, companyId, name } = req.body
    knex
      .transaction(async trx => {
        const id = await accountings.insert(trx, { code, companyId, name })
        const rows = await accountings.get(trx, id)
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

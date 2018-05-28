const express = require('express')
const accountings = require('./accountings')
const companies = require('./companies')
const customers = require('./customers')

const router = express.Router()
router.use('/api/accountings', accountings)
router.use('/api/companies', companies)
router.use('/api/customers', customers)

router
  .get('/api/version', (req, res) => {
    res.status(200).send('0.3')
  })
  .get('*', (req, res) => {
    res.status(404).send()
  })

module.exports = router

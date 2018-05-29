const Express = require('express')
const accountings = require('./accountings')
const companies = require('./companies')
const customers = require('./customers')
const upload = require('./upload')

const router = Express.Router()
router.use('/api/accountings', accountings)
router.use('/api/companies', companies)
router.use('/api/customers', customers)
router.use('/api/upload', upload)

const fs = require('fs')

router
  .get('/api/version', (req, res) => {
    res.status(200).send('0.3')
  })
  .get('*', (req, res) => {
    console.log('*')
    res.status(404).send()
  })

module.exports = router

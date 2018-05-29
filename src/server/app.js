const BodyParser = require('body-parser')
const Express = require('express')
const Morgan = require('morgan')
const routes = require('./routes')

const app = Express()
app.use(BodyParser.json())
app.use(BodyParser.urlencoded({ extended: true }))
app.use(Morgan('dev'))
app.use('/', routes)

module.exports = app

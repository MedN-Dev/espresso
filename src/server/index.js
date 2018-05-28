const app = require('./app')

const port = process.env.PORT || 8081

app.listen(port, () => {
  console.log()
  console.log('# ============')
  console.log('# RESTFUL API')
  console.log('# ============')
  console.log()
})

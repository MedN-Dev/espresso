const object = require('./object')

const camel = items => items.map(item => object.camel(item))

const snake = items => items.map(item => object.snake(item))

module.exports = {
  camel,
  snake
}

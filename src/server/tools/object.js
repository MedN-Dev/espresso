const _ = require('lodash')

const camel = snake => {
  return _.mapKeys(snake, (value, key) => _.camelCase(key))
}

const clean = obj => {
  return Object.keys(obj).reduce((total, key) => {
    if (obj[key] != null) {
      total[key] = obj[key]
    }
    return total
  }, {})
}

const mapFields = arr => {
  return arr.reduce((result, name) => {
    result[_.camelCase(name)] = name
    return result
  }, {})
}

const snake = camel => {
  return _.mapKeys(camel, (value, key) => _.snakeCase(key))
}

module.exports = {
  camel,
  clean,
  mapFields,
  snake
}

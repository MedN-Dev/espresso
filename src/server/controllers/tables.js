const _ = require('lodash')
const object = require('../tools/object')
const objects = require('../tools/objects')

const accountings = {
  name: 'accountings',
  fields: ['id', 'company_id', 'code', 'name', 'safe']
}

const companies = {
  name: 'companies',
  fields: ['id', 'code', 'name', 'address', 'phone', 'tax_code', 'active']
}

const customers = {
  name: 'customers',
  fields: [
    'id',
    'company_id',
    'code',
    'name',
    'address',
    'phone',
    'account_bank',
    'account_code',
    'account_name'
  ]
}

const customersAccounts = {
  name: 'customers_accounts',
  fields: ['id', 'customer_id', 'account_bank', 'account_code', 'account_name']
}

const customersTrucks = {
  name: 'customers_trucks',
  fields: ['id', 'customer_id', 'truck']
}

module.exports = {
  accountings: {
    ...accountings,
    columns: accountings.fields.map(value => _.camelCase(value)),
    row: object.mapFields(accountings.fields)
  },
  companies: {
    ...companies,
    columns: companies.fields.map(value => _.camelCase(value)),
    row: object.mapFields(companies.fields)
  },
  customers: {
    ...customers,
    columns: customers.fields.map(value => _.camelCase(value)),
    row: object.mapFields(customers.fields)
  },
  customersAccounts: {
    ...customersAccounts,
    columns: customersAccounts.fields.map(value => _.camelCase(value)),
    row: object.mapFields(customersAccounts.fields)
  },
  customersTrucks: {
    ...customersTrucks,
    columns: customersTrucks.fields.map(value => _.camelCase(value)),
    row: object.mapFields(customersTrucks.fields)
  }
}

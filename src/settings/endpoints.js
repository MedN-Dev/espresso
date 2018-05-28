const root = 'http://localhost:8080/api'

export default {
  api: {
    accountings: root + '/accountings',
    accountings_company: root + '/accountings/company',
    companies: root + '/companies',
    companies_active: root + '/companies/active',
    customers: root + '/customers',
    customers_company: root + '/customers/company'
  },
  accountings: '/accountings',
  companies: '/companies',
  customers: '/customers',
  dashboard: '/dashboard',
  invoices: '/invoices',
  purchases: '/purchases',
  recivings: '/recivings',
  statements: '/statements'
}

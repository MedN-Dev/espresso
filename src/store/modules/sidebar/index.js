import endpoints from '@/settings/endpoints'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const state = {
  active: null,
  items: [
    {
      name: 'dashboard',
      icon: 'dashboard',
      path: endpoints.dashboard,
      word: 'DASHBOARD'
    },
    { name: 'statements', icon: 'account_balance', word: 'STATEMENT' },
    {
      name: 'statements-overview',
      parent: 'statements',
      path: endpoints.statements,
      word: 'OVERVIEW'
    },
    {
      name: 'accountings',
      parent: 'statements',
      path: endpoints.accountings,
      word: 'ACCOUNTING'
    },
    {
      name: 'invoices',
      icon: 'attach_money',
      path: endpoints.invoices,
      word: 'SELL'
    },
    { name: 'purchases', icon: 'shopping_cart', word: 'BUY' },
    {
      name: 'purchases-order',
      parent: 'purchases',
      path: endpoints.purchases,
      word: 'PURCHASE_ORDER'
    },
    {
      name: 'purchases-receive',
      parent: 'purchases',
      path: endpoints.recivings,
      word: 'RECIVING_INV'
    },
    {
      name: 'customers',
      icon: 'person',
      path: endpoints.customers,
      word: 'CUSTOMER'
    },
    { name: 'settings', icon: 'settings', word: 'SETTING' },
    {
      name: 'settings-company',
      parent: 'settings',
      path: '',
      word: 'SETTING_COMPANY'
    }
  ],
  value: false
}

export default {
  actions,
  getters,
  namespaced: true,
  mutations,
  state
}

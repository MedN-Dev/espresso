import Vue from 'vue'
import Vuex from 'vuex'
import AccountingDialog from '@/store/modules/accounting.dialog'
import Accountings from '@/store/modules/accountings'
import App from '@/store/modules/app'
import Companies from '@/store/modules/companies'
import CompanyDialog from '@/store/modules/company.dialog'
import CustomerDialog from '@/store/modules/customer.dialog'
import Customers from '@/store/modules/customers'
import Sidebar from '@/store/modules/sidebar'
import Snackbar from '@/store/modules/snackbar'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    AccountingDialog,
    Accountings,
    App,
    Companies,
    CompanyDialog,
    CustomerDialog,
    Customers,
    Sidebar,
    Snackbar
  },
  strict: debug
})

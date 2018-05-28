import { mapActions } from 'vuex'
export default {
  components: {
    AccountingDialog: require('@/components/accounting.dialog.vue').default,
    CompanyDialog: require('@/components/company.dialog.vue').default,
    CustomerDialog: require('@/components/customer.dialog.vue').default,
    Sidebar: require('@/components/sidebar.vue').default,
    Snackbar: require('@/components/snackbar.vue').default,
    Topbar: require('@/components/topbar.vue').default
  },
  methods: {
    ...mapActions('AccountingDialog', {
      closeAccountingDialog: 'close'
    }),
    ...mapActions('Accountings', {
      getAccountings: 'get'
    }),
    ...mapActions('App', {
      setPagination: 'setPagination'
    }),
    ...mapActions('Companies', {
      getCompanies: 'get',
      getActiveCompany: 'getActive'
    }),
    ...mapActions('CompanyDialog', {
      closeCompanyDialog: 'close'
    }),
    ...mapActions('CustomerDialog', {
      closeCustomerDialog: 'close'
    }),
    ...mapActions('Customers', {
      getCustomers: 'get'
    }),
    ...mapActions('Sidebar', {
      setSidebarActiveByPath: 'setActiveByPath'
    }),
    async init () {
      this.setSidebarActiveByPath(this.$route.path)
      const company = await this.getActiveCompany()
      await this.getCompanies()
      if (company) {
        this.getAccountings()
        this.getCustomers()
      }
      this.setPagination({ rowsPerPage: this.$mq === 'sm' ? 4 : 20 })
      this.closeAccountingDialog()
      this.closeCompanyDialog()
      this.closeCustomerDialog()
    }
  },
  watch: {
    '$route.path': function (value) {
      this.init()
    },
    '$store.state.Companies.id': function (value) {
      if (value === null) {
        this.$route.push('/')
      }
    }
  },
  mounted () {
    this.init()
  }
}

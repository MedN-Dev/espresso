import _ from 'lodash'
import { mapActions, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('Companies', {
      currentCompany: 'currentCompany'
    }),
    companiesId: {
      get () {
        return this.$store.state.Companies.id
      },
      set (value) {
        if (this.companiesId === value) {
          return
        }
        this.$router.push('/')
        this.setActive(value)
        this.showContent(this.$t('COMPANY_LOADING') + ' ...')
      }
    },
    locale: {
      get () {
        return this.$i18n.locale || ''
      },
      set (value) {
        this.$i18n.locale = value
      }
    },
    sidebar: {
      get () {
        return this.$store.state.Sidebar.value
      },
      set (value) {
        this.setSidebarValue(value)
      }
    },
    title () {
      return this.$store.state.App.title
    },
    normalizedCompanies () {
      return _.sortBy(
        (this.$store.state.Companies.items || []).map(item => {
          return { ...item, name: item.name.toUpperCase() }
        }),
        ['name']
      )
    }
  },
  methods: {
    ...mapActions('Companies', {
      setActive: 'setActive'
    }),
    ...mapActions('CompanyDialog', {
      openDialog: 'open'
    }),
    ...mapActions('Sidebar', {
      setSidebarValue: 'setValue'
    }),
    ...mapActions('Snackbar', {
      showContent: 'showContent'
    })
  }
}

import { mapActions } from 'vuex'
export default {
  computed: {
    pagination: {
      get () {
        return this.$store.state.App.pagination
      },
      set (value) {
        this.setPagination(value)
      }
    },
    search: {
      get () {
        return this.$store.state.Customers.search
      },
      set (value) {
        this.setSearch(value)
      }
    },
    items () {
      return this.$store.state.Customers.items || []
    },
    rowsPerPageItems () {
      return this.$store.state.App.rowsPerPageItems
    }
  },
  methods: {
    ...mapActions('Customers', {
      getCustomers: 'get',
      setSearch: 'setSearch'
    }),
    ...mapActions('App', {
      setPagination: 'setPagination',
      setTitle: 'setTitle'
    }),
    ...mapActions('CustomerDialog', {
      openDialog: 'open'
    }),
    customFilter (items, search, filter) {
      search = search.toString().toLowerCase()
      return items.filter(
        row => filter(row['code'], search) || filter(row['name'], search)
      )
    },
    customSort (items, index, isDescending) {
      return isDescending ? [...items].reverse() : items
    }
  },
  mounted () {
    this.setTitle(this.$t('CUSTOMER'))
    this.items.length > 0 || this.getCustomers()
  }
}

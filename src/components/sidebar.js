import { mapActions, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('Companies', {
      currentCompany: 'currentCompany'
    }),
    ...mapGetters('Sidebar', {
      items: 'normalizedItems'
    }),
    sidebar: {
      get () {
        return this.$store.state.Sidebar.value
      },
      set (value) {
        this.setValue(value)
      }
    },
    name () {
      return this.$store.state.App.name
    }
  },
  methods: {
    ...mapActions('CompanyDialog', {
      openDialog: 'open'
    }),
    ...mapActions('Sidebar', {
      setValue: 'setValue',
      setActiveByItem: 'setActiveByItem'
    })
  }
}

import { mapActions } from 'vuex'
export default {
  computed: {
    Snackbar () {
      return this.$store.state.Snackbar
    }
  },
  methods: {
    ...mapActions('Snackbar', {
      setValue: 'setValue'
    })
  }
}

import { mapActions } from 'vuex'
export default {
  computed: {
    code: {
      get () {
        return this.$store.state.AccountingDialog.code || ''
      },
      set (value) {
        this.setCode(value)
      }
    },
    name: {
      get () {
        return this.$store.state.AccountingDialog.name || ''
      },
      set (value) {
        this.setName(value)
      }
    },
    value: {
      get () {
        if (!this.$store.state.AccountingDialog.value && this.$refs.form) {
          this.$refs.form.reset()
        }
        return this.$store.state.AccountingDialog.value
      },
      set (value) {
        this.setValue(value)
      }
    },
    id () {
      return this.$store.state.AccountingDialog.id
    },
    safe () {
      return this.$store.state.AccountingDialog.safe
    }
  },
  methods: {
    ...mapActions('AccountingDialog', {
      close: 'close',
      reset: 'reset',
      setCode: 'setCode',
      setName: 'setName',
      setValue: 'setValue'
    }),
    ...mapActions('Accountings', {
      delete: 'delete',
      insert: 'insert',
      update: 'update'
    }),
    ...mapActions('Snackbar', {
      showFailure: 'showFailure',
      showSuccess: 'showSuccess'
    }),
    async onDelete () {
      const row = await this.delete(this.id)
      if (row != null) {
        this.close()
        this.showSuccess(this.$t('SAVE_DATA_SUCCESSED'))
      } else {
        this.showFailure(this.$t('INPUT_INVALID'))
      }
    },
    onReset () {
      this.$refs.form.reset()
      this.reset()
    },
    async onSubmit () {
      try {
        if (!this.$refs.form.validate()) {
          return
        }
        const payload = {
          code: this.code,
          name: this.name
        }
        if (this.id == null) {
          const row = await this.insert(payload)
          if (row == null) {
            throw new Error('data can not insert')
          }
        } else {
          const row = await this.update({
            ...payload,
            id: this.id
          })
          if (row == null) {
            throw new Error('data can not update')
          }
        }
        this.close()
        this.showSuccess(this.$t('SAVE_DATA_SUCCESSED'))
      } catch (err) {
        this.showFailure(this.$t('INPUT_INVALID'))
        console.log(`${err.name}: ${err.message}`)
      }
    }
  }
}

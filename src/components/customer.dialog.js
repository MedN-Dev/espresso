import { mapActions } from 'vuex'
export default {
  computed: {
    accountBank: {
      get () {
        return this.$store.state.CustomerDialog.account.bank
      },
      set (value) {
        this.setAccount({ bank: value })
      }
    },
    accountCode: {
      get () {
        return this.$store.state.CustomerDialog.account.code || ''
      },
      set (value) {
        this.setAccount({ code: value })
      }
    },
    accountName: {
      get () {
        return this.$store.state.CustomerDialog.account.name || ''
      },
      set (value) {
        this.setAccount({ name: value })
      }
    },
    address: {
      get () {
        return this.$store.state.CustomerDialog.address || ''
      },
      set (value) {
        this.setAddress(value)
      }
    },
    banks () {
      return [
        { text: this.$t('NONE'), value: null },
        { text: 'BBL', value: 'BBL' },
        { text: 'KBANK', value: 'KBANK' },
        { text: 'SCB', value: 'SCB' }
      ]
    },
    code: {
      get () {
        return this.$store.state.CustomerDialog.code || ''
      },
      set (value) {
        this.setCode(value)
      }
    },
    name: {
      get () {
        return this.$store.state.CustomerDialog.name || ''
      },
      set (value) {
        this.setName(value)
      }
    },
    phone: {
      get () {
        return this.$store.state.CustomerDialog.phone || ''
      },
      set (value) {
        this.setPhone(value)
      }
    },
    trucks: {
      get () {
        return this.$store.state.CustomerDialog.trucks || []
      },
      set (values) {
        this.setTrucks(values)
      }
    },
    value: {
      get () {
        if (!this.$store.state.CustomerDialog.value && this.$refs.form) {
          this.$refs.form.reset()
        }
        return this.$store.state.CustomerDialog.value
      },
      set (value) {
        this.setValue(value)
      }
    },
    id () {
      return this.$store.state.CustomerDialog.id
    }
  },
  methods: {
    ...mapActions('Customers', {
      delete: 'delete',
      insert: 'insert',
      update: 'update'
    }),
    ...mapActions('CustomerDialog', {
      close: 'close',
      setAccount: 'setAccount',
      setAddress: 'setAddress',
      setCode: 'setCode',
      setName: 'setName',
      setPhone: 'setPhone',
      setTrucks: 'setTrucks',
      setValue: 'setValue',
      reset: 'reset'
    }),
    ...mapActions('Snackbar', {
      showFailure: 'showFailure',
      showSuccess: 'showSuccess'
    }),
    onChangeAccountBank (value) {
      if (value == null) {
        this.accountCode = null
        this.accountName = null
      }
    },
    async onDelete () {
      const row = await this.delete(this.id)
      if (row != null) {
        this.close()
        this.showSuccess(this.$t('SAVE_DATA_SUCCESSED'))
      } else {
        this.showFailure(this.$t('INPUT_INVALID'))
      }
    },
    onRemoveTruck (chip) {
      this.trucks = this.trucks.filter((item, index) => index !== chip.index)
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
          account: {
            bank: this.accountBank,
            code: this.accountCode,
            name: this.accountName
          },
          address: this.address,
          code: this.code,
          name: this.name,
          phone: this.phone,
          trucks: this.trucks
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

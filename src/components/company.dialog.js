import _ from 'lodash'
import { mapActions } from 'vuex'
export default {
  computed: {
    address: {
      get () {
        return this.$store.state.CompanyDialog.address || ''
      },
      set (value) {
        this.setAddress(value)
      }
    },
    code: {
      get () {
        return this.$store.state.CompanyDialog.code || ''
      },
      set (value) {
        this.setCode(value)
      }
    },
    name: {
      get () {
        return this.$store.state.CompanyDialog.name || ''
      },
      set (value) {
        this.setName(value)
      }
    },
    phone: {
      get () {
        return this.$store.state.CompanyDialog.phone || ''
      },
      set (value) {
        this.setPhone(value)
      }
    },
    prototypeId: {
      get () {
        return this.$store.state.CompanyDialog.prototypeId
      },
      set (value) {
        this.setPrototypeId(value)
      }
    },
    taxCode: {
      get () {
        return this.$store.state.CompanyDialog.taxCode || ''
      },
      set (value) {
        this.setTaxCode(value)
      }
    },
    value: {
      get () {
        if (!this.$store.state.CompanyDialog.value && this.$refs.form) {
          this.$refs.form.reset()
        }
        return this.$store.state.CompanyDialog.value
      },
      set (value) {
        this.setValue(value)
      }
    },
    id () {
      return this.$store.state.CompanyDialog.id
    },
    normalizedCompanies () {
      let companies = [{ text: this.$t('ACCOUNTING_STANDARD'), value: -1 }]
      if (this.$store.state.Companies.items == null) {
        return companies
      }
      companies = companies.concat(
        this.$store.state.Companies.items.map(item => ({
          text: item.name.toUpperCase(),
          value: item.id
        }))
      )
      return _.sortBy(companies, ['text'])
    }
  },
  methods: {
    ...mapActions('CompanyDialog', {
      close: 'close',
      reset: 'reset',
      setAddress: 'setAddress',
      setCode: 'setCode',
      setName: 'setName',
      setPhone: 'setPhone',
      setPrototypeId: 'setPrototypeId',
      setTaxCode: 'setTaxCode',
      setValue: 'setValue'
    }),
    ...mapActions('Companies', {
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
          address: this.address,
          code: this.code,
          prototypeId: this.prototypeId,
          name: this.name,
          phone: this.phone,
          taxCode: this.taxCode
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

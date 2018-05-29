// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import VueMq from 'vue-mq'
import router from '@/router'
import i18n from '@/settings/i18n'
import store from '@/store/'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify, {
  theme: {
    primary: '#F57C00',
    secondary: '#680148',
    accent: '#7DB4B5'
  }
})
Vue.use(VueMq, {
  breakpoints: {
    // default breakpoints - customize this
    sm: 450,
    md: 1250,
    lg: Infinity
  }
})

const VueUploadComponent = require('vue-upload-component')
Vue.component('file-upload', VueUploadComponent)

Vue.config.productionTip = false
Vue.mixin({
  computed: {
    structures () {
      return {
        address: {
          length: 200,
          rules: [
            value =>
              value.length <= this.structures.address.length ||
              this.$t('INPUT_INVALID')
          ]
        },
        accountCode: {
          length: 10,
          rules: [
            value =>
              value.length <= this.structures.accountCode.length ||
              this.$t('INPUT_INVALID')
          ]
        },
        accountName: {
          length: 200,
          rules: [
            value =>
              value.length <= this.structures.accountName.length ||
              this.$t('INPUT_INVALID')
          ]
        },
        code: {
          length: 20,
          rules: [
            value => !!value || this.$t('INPUT_INVALID'),
            value =>
              value.length <= this.structures.code.length ||
              this.$t('INPUT_INVALID')
          ]
        },
        name: {
          length: 200,
          rules: [
            value => !!value || this.$t('INPUT_INVALID'),
            value =>
              value.length <= this.structures.name.length ||
              this.$t('INPUT_INVALID')
          ]
        },
        phone: {
          length: 80,
          rules: [
            value =>
              value.length <= this.structures.phone.length ||
              this.$t('INPUT_INVALID')
          ]
        },
        taxCode: {
          length: 13,
          rules: [
            value =>
              value.length <= this.structures.taxCode.length ||
              this.$t('INPUT_INVALID')
          ]
        }
      }
    }
  }
})

/* eslint-disable no-new */
new Vue({
  components: { app: require('@/components/app.vue').default },
  el: '#app',
  i18n,
  router,
  store,
  template: '<app></app>'
})

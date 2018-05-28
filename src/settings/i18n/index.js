import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from './en'
import th from './th'

Vue.use(VueI18n)

export default new VueI18n({
  locale: 'th',
  messages: {
    en,
    th
  }
  // silentTranslationWarn: true
})

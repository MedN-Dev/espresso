import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const ERROR = 'error'
const INFO = 'info'
const SUCCESS = 'success'

const state = {
  ERROR,
  INFO,
  SUCCESS,
  bottom: false,
  color: INFO,
  left: false,
  multiLine: true,
  right: false,
  value: false,
  text: null,
  timeout: 6000,
  top: true,
  vertical: true
}

export default {
  actions,
  getters,
  namespaced: true,
  mutations,
  state
}

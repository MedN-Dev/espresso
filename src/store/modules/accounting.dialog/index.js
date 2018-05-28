import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const state = {
  code: null,
  id: null,
  name: null,
  safe: 0,
  value: false,
  _code: null,
  _name: null
}

export default {
  actions,
  getters,
  namespaced: true,
  mutations,
  state
}

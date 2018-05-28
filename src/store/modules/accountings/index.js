import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const state = {
  items: null,
  search: null
}

export default {
  actions,
  getters,
  namespaced: true,
  mutations,
  state
}

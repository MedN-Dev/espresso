import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const state = {
  name: 'Espresso',
  pagination: {
    descending: false,
    page: 1,
    rowsPerPage: 4
  },
  rowsPerPageItems: [4, 20, 100],
  title: null
}

export default {
  actions,
  getters,
  namespaced: true,
  mutations,
  state
}

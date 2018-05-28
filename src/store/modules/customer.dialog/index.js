import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const state = {
  account: { bank: null, code: null, name: null },
  address: null,
  code: null,
  id: null,
  name: null,
  phone: null,
  trucks: null,
  value: false,
  _account: { bank: null, code: null, name: null },
  _address: null,
  _code: null,
  _name: null,
  _phone: null,
  _trucks: null
}

export default {
  actions,
  getters,
  namespaced: true,
  mutations,
  state
}

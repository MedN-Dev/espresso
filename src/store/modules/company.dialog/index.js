import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const state = {
  address: null,
  code: null,
  id: null,
  prototypeId: null,
  name: null,
  phone: null,
  taxCode: null,
  value: false,
  _address: null,
  _code: null,
  _name: null,
  _phone: null,
  _taxCode: null
}

export default {
  actions,
  getters,
  namespaced: true,
  mutations,
  state
}

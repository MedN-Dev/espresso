import _ from 'lodash'
import types from '@/store/types'

export default {
  [types.open] (
    state,
    { account, address, code, id, name, phone, trucks } = {}
  ) {
    if (id == null) {
      state.account = state._account = { bank: null, code: null, name: null }
      state.address = state._address = null
      state.code = state._code = null
      state.id = null
      state.name = state._name = null
      state.phone = state._phone = null
      state.trucks = state._trucks = null
    } else {
      state.account = account == null ? null : { ...account }
      state.address = state._address = address
      state._account = account == null ? null : { ...account }
      state.code = state._code = code
      state.id = id
      state.name = state._name = name
      state.phone = state._phone = phone
      state.trucks = trucks == null ? null : [...trucks]
      state._trucks = trucks == null ? null : [...trucks]
    }
    state.value = true
  },
  [types.reset] (state) {
    state.address = state._address
    state.account = state._account == null ? null : [...state._account]
    state.code = state._code
    state.name = state._name
    state.phone = state._phone
    state.trucks = state._trucks == null ? null : [...state._trucks]
  },
  [types.setAccount] (state, { bank, code, name }) {
    const payload = _.omitBy({ bank, code, name }, _.isUndefined)
    state.account = Object.assign(state.account, payload)
  },
  [types.setAddress] (state, payload) {
    state.address = payload
  },
  [types.setCode] (state, payload) {
    state.code = payload
  },
  [types.setName] (state, payload) {
    state.name = payload
  },
  [types.setPhone] (state, payload) {
    state.phone = payload
  },
  [types.setTrucks] (state, payload) {
    state.trucks = [...payload]
  },
  [types.setValue] (state, payload) {
    state.value = payload
  }
}

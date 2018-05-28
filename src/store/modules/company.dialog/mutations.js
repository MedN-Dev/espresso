import types from '@/store/types'

export default {
  [types.open] (state, { address, code, id, name, phone, taxCode } = {}) {
    if (id == null) {
      state.address = state._address = null
      state.code = state._code = null
      state.id = null
      state.name = state._name = null
      state.phone = state._phone = null
      state.prototypeId = -1
      state.taxCode = state._taxCode = null
    } else {
      state.address = state._address = address
      state.code = state._code = code
      state.id = id
      state.name = state._name = name
      state.phone = state._phone = phone
      state.prototypeId = null
      state.taxCode = state._taxCode = taxCode
    }
    state.value = true
  },
  [types.reset] (state) {
    state.address = state._address
    state.code = state._code
    state.name = state._name
    state.phone = state._phone
    state.taxCode = state._taxCode
    state.prototypeId = state.id == null ? -1 : null
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
  [types.setPrototypeId] (state, payload) {
    state.prototypeId = payload
  },
  [types.setTaxCode] (state, payload) {
    state.taxCode = payload
  },
  [types.setValue] (state, payload) {
    state.value = payload
  }
}

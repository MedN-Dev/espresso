import types from '@/store/types'

export default {
  [types.open] (state, { code, id, name, safe } = {}) {
    if (id == null) {
      state.code = state._code = null
      state.id = null
      state.name = state._name = null
      state.safe = 0
    } else {
      state.code = state._code = code
      state.id = id
      state.name = state._name = name
      state.safe = safe
    }
    state.value = true
  },
  [types.reset] (state) {
    state.code = state._code
    state.name = state._name
  },
  [types.setCode] (state, payload) {
    state.code = payload
  },
  [types.setName] (state, payload) {
    state.name = payload
  },
  [types.setValue] (state, payload) {
    state.value = payload
  }
}

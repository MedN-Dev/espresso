import types from '@/store/types'

export default {
  [types.delete.failure] (state) {
    // Nothing
  },
  [types.delete.success] (state, payload) {
    state.items = state.items.filter(item => item.id !== payload)
  },
  [types.get.failure] (state) {
    state.items = null
  },
  [types.get.success] (state, payload) {
    state.items = [...payload]
  },
  [types.getActive.failure] (state) {
    state.id = null
  },
  [types.getActive.success] (state, payload) {
    state.id = payload
  },
  [types.insert.failure] (state) {
    // Nothing
  },
  [types.insert.success] (state, payload) {
    state.items = [...state.items, payload]
  },
  [types.setActive.failure] (state) {
    // Nothing
  },
  [types.setActive.success] (state, payload) {
    state.id = payload
  },
  [types.update.failure] (state) {
    // Nothing
  },
  [types.update.success] (state, payload) {
    state.items = state.items.map(item => {
      return item.id === payload.id ? payload : item
    })
  }
}

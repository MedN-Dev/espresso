import types from '@/store/types'

export default {
  [types.get.failure] (state) {
    state.items = null
  },
  [types.get.success] (state, payload) {
    state.items = [...payload]
  },
  [types.insert.failure] (state) {
    // Nothing
  },
  [types.insert.success] (state, payload) {
    state.items = [...state.items, payload]
  },
  [types.setSearch] (state, payload) {
    state.search = payload
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

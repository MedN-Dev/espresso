import types from '@/store/types'

export default {
  [types.setActiveByItem] (state, payload) {
    state.active = 'parent' in payload ? payload.parent : payload.name
  },
  [types.setActiveByPath] (state, payload) {
    const item = state.items.find(item => item.path === payload)
    if (item) {
      state.active = 'parent' in item ? item.parent : item.name
    }
  },
  [types.setValue] (state, payload) {
    state.value = payload
  }
}

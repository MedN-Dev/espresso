import types from '@/store/types'

export default {
  [types.setValue] (state, payload) {
    state.value = payload
  },
  [types.showFailure] (state, payload) {
    state.color = state.ERROR
    state.text = payload
    state.value = true
  },
  [types.showContent] (state, payload) {
    state.color = state.INFO
    state.text = payload
    state.value = true
  },
  [types.showSuccess] (state, payload) {
    state.color = state.SUCCESS
    state.text = payload
    state.value = true
  }
}

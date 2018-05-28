import types from '@/store/types'

const close = ({ dispatch }) => {
  dispatch('setValue', false)
}

const open = ({ commit }, { code, id, name, safe } = {}) => {
  commit(types.open, { code, id, name, safe })
}

const reset = ({ commit }) => {
  commit(types.reset)
}

const setCode = ({ commit }, value) => {
  commit(types.setCode, value)
}

const setName = ({ commit }, value) => {
  commit(types.setName, value)
}

const setValue = ({ commit }, value) => {
  commit(types.setValue, value)
}

export default {
  close,
  open,
  reset,
  setCode,
  setName,
  setValue
}

import types from '@/store/types'

const setActiveByItem = ({ commit }, item) => {
  commit(types.setActiveByItem, item)
}

const setActiveByPath = ({ commit, state }, path) => {
  commit(types.setActiveByPath, path)
}

const setValue = ({ commit }, value) => {
  commit(types.setValue, value)
}

export default {
  setActiveByItem,
  setActiveByPath,
  setValue
}

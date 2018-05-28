import types from '@/store/types'

const setValue = ({ commit }, value) => {
  commit(types.setValue, value)
}

const showContent = ({ commit }, text) => {
  commit(types.showContent, text)
}

const showFailure = ({ commit }, text) => {
  commit(types.showFailure, text)
}

const showSuccess = ({ commit }, text) => {
  commit(types.showSuccess, text)
}

export default {
  setValue,
  showFailure,
  showContent,
  showSuccess
}

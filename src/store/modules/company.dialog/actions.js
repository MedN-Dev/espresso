import types from '@/store/types'

const close = ({ dispatch }) => {
  dispatch('setValue', false)
}

const open = ({ commit }, { address, code, id, name, phone, taxCode } = {}) => {
  commit(types.open, { address, code, id, name, phone, taxCode })
}

const reset = ({ commit }) => {
  commit(types.reset)
}

const setAddress = ({ commit }, value) => {
  commit(types.setAddress, value)
}

const setCode = ({ commit }, value) => {
  commit(types.setCode, value)
}

const setName = ({ commit }, value) => {
  commit(types.setName, value)
}

const setPhone = ({ commit }, value) => {
  commit(types.setPhone, value)
}

const setPrototypeId = ({ commit }, value) => {
  commit(types.setPrototypeId, value)
}

const setTaxCode = ({ commit }, value) => {
  commit(types.setTaxCode, value)
}

const setValue = ({ commit }, value) => {
  commit(types.setValue, value)
}

export default {
  close,
  open,
  reset,
  setAddress,
  setCode,
  setName,
  setPhone,
  setPrototypeId,
  setTaxCode,
  setValue
}

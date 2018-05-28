import _ from 'lodash'
import types from '@/store/types'

const close = ({ dispatch }) => {
  dispatch('setValue', false)
}

const open = (
  { commit },
  { account, address, code, id, name, phone, trucks } = {}
) => {
  commit(types.open, {
    account,
    address,
    code,
    id,
    name,
    phone,
    trucks
  })
}

const reset = ({ commit }) => {
  commit(types.reset)
}

const setAccount = ({ commit }, { bank, code, name }) => {
  const payload = _.omitBy({ bank, code, name }, _.isUndefined)
  commit(types.setAccount, payload)
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

const setTrucks = ({ commit }, values) => {
  commit(types.setTrucks, values)
}

const setValue = ({ commit }, value) => {
  commit(types.setValue, value)
}

export default {
  close,
  open,
  reset,
  setAccount,
  setAddress,
  setCode,
  setName,
  setPhone,
  setTrucks,
  setValue
}

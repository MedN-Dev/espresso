import Axios from 'axios'
import router from '@/router'
import endpoints from '@/settings/endpoints'
import types from '@/store/types'

const get = async ({ commit, rootState }) => {
  try {
    if (rootState.Companies.id == null) {
      router.push('/')
      throw Error('Companies.id is null')
    }
    const { data } = await Axios.get(
      endpoints.api.customers_company + '/' + rootState.Companies.id
    )
    commit(types.get.success, data)
    return data
  } catch (err) {
    console.log(`${err.name}: ${err.message}`)
    commit(types.get.failure)
  }
}

const insert = async (
  { commit, rootState },
  { account, address, code, name, phone, trucks }
) => {
  try {
    if (rootState.Companies.id == null) {
      router.push('/')
      throw Error('Companies.id is null')
    }
    const { data } = await Axios.post(endpoints.api.customers, {
      account,
      address,
      code,
      companyId: rootState.Companies.id,
      name,
      phone,
      trucks
    })
    commit(types.insert.success, data)
    return data
  } catch (err) {
    console.log(`${err.name}: ${err.message}`)
    commit(types.insert.failure)
  }
}

const setSearch = ({ commit }, value) => {
  commit(types.setSearch, value)
}

const update = async (
  { commit },
  { account, address, code, id, name, phone, trucks }
) => {
  try {
    const { data } = await Axios.patch(endpoints.api.customers + '/' + id, {
      account,
      address,
      code,
      name,
      phone,
      trucks
    })
    commit(types.update.success, data)
    return data
  } catch (err) {
    console.log(`${err.name}: ${err.message}`)
    commit(types.update.failure)
  }
}

export default {
  // delete: del,
  get,
  insert,
  setSearch,
  update
}

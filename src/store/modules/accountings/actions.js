import Axios from 'axios'
import router from '@/router'
import endpoints from '@/settings/endpoints'
import types from '@/store/types'

const del = async ({ commit }, id) => {
  try {
    const { data } = await Axios.delete(endpoints.api.accountings + '/' + id)
    commit(types.delete.success, data.id)
    return data
  } catch (err) {
    console.log(`${err.name}: ${err.message}`)
    commit(types.delete.failure)
  }
}

const get = async ({ commit, rootState }) => {
  try {
    if (rootState.Companies.id == null) {
      router.push('/')
      throw Error('Companies.id is null')
    }
    const { data } = await Axios.get(
      endpoints.api.accountings_company + '/' + rootState.Companies.id
    )
    commit(types.get.success, data)
    return data
  } catch (err) {
    console.log(`${err.name}: ${err.message}`)
    commit(types.get.failure)
  }
}

const insert = async ({ commit, rootState }, { code, name }) => {
  try {
    if (rootState.Companies.id == null) {
      router.push('/')
      throw Error('Companies.id is null')
    }
    const { data } = await Axios.post(endpoints.api.accountings, {
      code,
      companyId: rootState.Companies.id,
      name
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

const update = async ({ commit }, { code, id, name }) => {
  try {
    const { data } = await Axios.patch(endpoints.api.accountings + '/' + id, {
      code,
      name
    })
    commit(types.update.success, data)
    return data
  } catch (err) {
    console.log(`${err.name}: ${err.message}`)
    commit(types.update.failure)
  }
}

export default {
  delete: del,
  get,
  insert,
  setSearch,
  update
}

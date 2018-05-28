import Axios from 'axios'
import endpoints from '@/settings/endpoints'
import types from '@/store/types'

const del = async ({ commit, dispatch }, id) => {
  try {
    const { data } = await Axios.delete(endpoints.api.companies + '/' + id)
    commit(types.delete.success, data.id)
    dispatch('getActive')
    return data
  } catch (err) {
    console.log(`${err.name}: ${err.message}`)
    commit(types.delete.failure)
  }
}

const get = async ({ commit }) => {
  try {
    const { data } = await Axios.get(endpoints.api.companies)
    commit(types.get.success, data)
    return data
  } catch (err) {
    console.log(`${err.name}: ${err.message}`)
    commit(types.get.failure)
  }
}

const getActive = async ({ commit }) => {
  try {
    const { data } = await Axios.get(endpoints.api.companies_active)
    commit(types.getActive.success, data.id)
    return data
  } catch (err) {
    console.log(`${err.name}: ${err.message}`)
    commit(types.getActive.failure)
  }
}

const insert = async (
  { commit },
  { address, code, name, phone, prototypeId, taxCode }
) => {
  try {
    const { data } = await Axios.post(endpoints.api.companies, {
      address,
      code,
      name,
      phone,
      prototypeId,
      taxCode
    })
    commit(types.insert.success, data)
    return data
  } catch (err) {
    console.log(`${err.name}: ${err.message}`)
    commit(types.insert.failure)
  }
}

const setActive = async ({ commit }, id) => {
  try {
    const { data } = await Axios.patch(
      endpoints.api.companies_active + '/' + id
    )
    commit(types.setActive.success, data.id)
    return data
  } catch (err) {
    console.log(`${err.name}: ${err.message}`)
    commit(types.setActive.failure)
  }
}

const update = async (
  { commit },
  { address, code, id, name, phone, taxCode }
) => {
  try {
    const { data } = await Axios.patch(endpoints.api.companies + '/' + id, {
      address,
      code,
      name,
      phone,
      taxCode
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
  getActive,
  insert,
  setActive,
  update
}

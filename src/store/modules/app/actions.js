import _ from 'lodash'
import types from '@/store/types'

const setPagination = ({ commit }, { descending, page, rowsPerPage }) => {
  const payload = _.omitBy({ descending, page, rowsPerPage }, _.isUndefined)
  commit(types.setPagination, payload)
}

const setTitle = ({ commit }, value) => {
  commit(types.setTitle, value)
}

export default {
  setPagination,
  setTitle
}

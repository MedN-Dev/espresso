import _ from 'lodash'
import types from '@/store/types'

export default {
  [types.setPagination] (state, { descending, page, rowsPerPage }) {
    const payload = _.omitBy({ descending, page, rowsPerPage }, _.isUndefined)
    state.pagination = Object.assign(state.pagination, payload)
  },
  [types.setTitle] (state, payload) {
    state.title = payload
  }
}

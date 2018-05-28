const currentCompany = state => {
  if (state.id && state.items) {
    return state.items.find(item => item.id === state.id)
  } else {
    return null
  }
}

export default {
  currentCompany
}

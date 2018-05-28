const normalizedItems = state => {
  return state.items.filter(item => {
    if (item.parent) {
      if (item.parent !== state.active) {
        return false
      }
    }
    return true
  })
}

export default {
  normalizedItems
}

const state = {
  count:0
}

const mutations={
  count(state,data){
    state.count=data
  }
}

export default {
  namespaced: true,
  state,
  mutations
}

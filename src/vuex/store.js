import Vue from 'vue'
import Vuex from 'vuex'

import test from './modules/test'
import conditionSelect from './modules/conditionSelect'

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    test,
    conditionSelect
  }
})

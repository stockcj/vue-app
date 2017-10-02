import Vue from 'vue'
import Vuex from 'vuex'

import exams from './Exams'
import users from './Users'
import shared from './Shared'
import contingency from './Contingency'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    exams: exams,
    users: users,
    contingency: contingency,
    shared: shared
  }
})


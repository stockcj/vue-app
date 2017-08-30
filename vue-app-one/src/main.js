import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuelidate from 'vuelidate'
import App from './App'
import * as firebase from 'firebase'
import firebaseConfig from './helpers/firebaseHelper.js'
import router from './router'
import { store } from './store'

Vue.use(Vuetify)
Vue.use(Vuelidate)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp(firebaseConfig)
  }
})

import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuelidate from 'vuelidate'
import App from './App'
import * as firebase from 'firebase'
import { firebaseConfig } from './helpers/firebaseHelper'
import router from './router'
import { store } from './store'
import AlertCmp from './components/Shared/Alert.vue'

Vue.use(Vuetify)
Vue.use(Vuelidate)
Vue.config.productionTip = false

Vue.component('app-alert', AlertCmp)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp(firebaseConfig)
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
    this.$store.dispatch('loadExams')
  }
})

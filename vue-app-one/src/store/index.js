import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedExams: [],
    user: null,
    error: null,
    loading: false
  },
  mutations: {
    setLoadedExams (state, payload) {
      state.loadedExams = payload
    },
    createExam (state, payload) {
      state.loadedExams.push(payload)
    },
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    loadExams ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('exams').once('value')
        .then((data) => {
          const exams = []
          const obj = data.val()
          for (let key in obj) {
            exams.push({
              $key: key,
              name: obj[key].name,
              components: obj[key].components,
            })
          }
          commit('setLoading', false)
          commit('setLoadedExams', exams)
        })
        .catch((error) => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    createExam ({commit}, payload) {
      const exam = payload
      // Reach out to firebase and store it
      firebase.database().ref('exams').push(exam)
        .then((data) => {
          const key = data.key
          commit('createExam', {
            ...exam,
            $key: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    signUserIn ({commit}, payload) {
      commit('clearError')
      commit('setLoading', true)
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const currentUser = {
              id: user.uid,
              role: ''
            }
            commit('setUser', currentUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
          }
        )
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {id: payload.uid, role: ''})
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    },
    clearError ({commit}) {
      commit('clearError')
    }
  },   
  getters: {
    loadedExams (state) {
      return state.loadedExams.sort((examA, examB) => {
        return examA.name > examB.name
      })
    },
    loadedExam (state) {
      return (examKey) => {
        return state.loadedExams.find((exam) => {
          return exam.$key === examKey
        })
      }
    },
    user (state) {
      return state.user
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
})

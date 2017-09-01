import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedExams: [],
    loadedUsers: [],
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
    updateExam (state, payload) {
      const exam = state.loadedExams.find(exam => {
        return exam.id === payload.id
      })
    },
    setLoadedUsers (state, payload) {
      state.loadedUsers = payload
    },
    createUser (state, payload) {
      state.loadedUsers.push(payload)
    },
    updateUser (state, payload) {
      const user = state.loadedExams.find(user => {
        return user.id === payload.id
      })
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
              id: key,
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
      firebase.database().ref('exams').push(exam)
        .then((data) => {
          const key = data.key
          commit('createExam', {
            ...exam,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    updateExam ({commit}, payload) {
      commit('setLoading', true)
      const exam = payload
      firebase.database().ref('exams').child(payload.id).update(exam)
        .then(() => {
          commit('setLoading', false)
          commit('updateExam', payload)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    loadUsers ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('users').once('value')
        .then((data) => {
          const users = []
          const obj = data.val()
          for (let key in obj) {
            users.push({
              id: key,
              profile: obj[key].profile,
              role: obj[key].role
            })
          }
          commit('setLoading', false)
          commit('setLoadedUsers', users)
        })
        .catch((error) => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    createUser ({commit}, payload) {
      //
    },
    updateUser ({commit}, payload) {
      //
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
          return exam.id === examKey
        })
      }
    },
    loadedUsers (state) {
      return state.loadedUsers.sort((userA, userB) => {
        return userA.name > userB.name
      })
    },
    loadedUser (state) {
      return (userKey) => {
        return state.loadedUsers.find((user) => {
          return user.id === userKey
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

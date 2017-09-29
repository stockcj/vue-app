import * as firebase from 'firebase'
import { firebaseConfig } from '../../helpers/firebaseHelper'

export default {
  state: {
    loadedExams: [],
    contHistory: [],
    issuance: null,
  },
  mutations: {
    setLoadedExams (state, payload) {
      state.loadedExams = payload
    },
    setContHistory (state, payload) {
      state.contHistory = payload
    },
    setIssuance (state, payload) {
      state.issuance = payload
    },
    updateExam (state, payload) {
      const exam = state.loadedExams.find(exam => {
        return exam.id === payload.id
      })
    }
  },
  actions: {
    loadExams ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('exams').on('value', function(data) {
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
    },
    issueContingency({commit}, payload) {
      const issuance = payload
      const snackbar = {active: true, text: 'Contingency issued'}
      firebase.database().ref('issuances').push(issuance)
        .then(() => {
          commit('setSnackbar', snackbar)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    createExam ({commit}, payload) {
      const exam = payload
      const snackbar = {active: true, text: 'Exam created successfully'}
      firebase.database().ref('exams').push(exam)
        .then(() => {
          commit('setSnackbar', snackbar)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    updateExam ({commit}, payload) {
      commit('setLoading', true)
      const exam = payload
      const snackbar = {active: true, text: 'Exam updated successfully'}
      firebase.database().ref('exams').child(payload.id).update(exam)
        .then(() => {
          commit('setLoading', false)
          commit('updateExam', payload)
          commit('setSnackbar', snackbar)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    deleteExam ({commit}, payload) {
      commit('setLoading', true)
      const snackbar = {active: true, text: 'Exam deleted successfully'}
      firebase.database().ref('exams').child(payload).remove()
        .then(() => {
          commit('setLoading', false)
          commit('setSnackbar', snackbar)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    loadContHistory ({commit}, payload) {
      const centre = payload.centre
      const exam = payload.exam
      commit('setLoading', true)
      firebase.database().ref('issuances').orderByChild("centre").equalTo(centre).once('value')
        .then((data) => {
          const contHistory = []
          const obj = data.val()
          for (let key in obj) {
            if (obj[key].exam.id === exam) {
              contHistory.push({
                id: key,
                centre: obj[key].centre,
                exam: obj[key].exam,
                issueDate: obj[key].issueDate,
                testDate: obj[key].testDate
              })
            } 
          }
          commit('setLoading', false)
          commit('setContHistory', contHistory)
        })
        .catch((error) => {
          console.log(error)
          commit('setLoading', false)
        })
    },
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
    loadedContHistory (state) {
      return state.contHistory
    }
  }
}

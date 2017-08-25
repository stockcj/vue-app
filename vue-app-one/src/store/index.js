import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedExams: [
      { $key: 'j390ujg3ng3ojg',
        name: 'PET',
        components: [
          { $key: 'nu3hg093jg3',
            name: 'Reading and Use of English',
            versions: [
              { $key: 'u92u9023ur2', name: 'A', active: true},
              { $key: 'u92erg23ur2', name: 'B', active: true}
           ]
          },
          { $key: 'nu3h34t3jg3',
            name: 'Writing',
            versions: [
              { $key: 'u92vvv23ur2', name: 'A', active: true},
              { $key: 'u92yyy23ur2', name: 'B', active: true}
            ]
         }
        ]

      },
      { $key: 'j390uj345345ojg',
      name: 'CAE',
      components: [
        { $key: 'nu3hg088jg3',
          name: 'Reading and Use of English',
          versions: [
            { $key: 'u92u90tttr2', name: 'A', active: true},
            { $key: 'u92erg2jjj2', name: 'B', active: false}
         ]
        },
        { $key: 'nu3h34t3jg3',
          name: 'Writing',
          versions: [
            { $key: 'u92vxxx3ur2', name: 'A', active: true},
            { $key: 'u92yccc3ur2', name: 'B', active: true}
          ]
       }
      ]

    }
    ],
    user: {
      $key: 'h02i3r-0i203rkp2',
      profile: { displayName: 'Christopher', email: "christopherstock@hotmail.co.uk", username: 'christopher'},
      role: { $key: 'u9032utjg34n', name: 'admin'}
    }
  },
  mutations: {},
  actions: {},
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
    }
  }
})

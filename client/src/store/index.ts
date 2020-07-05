import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: '',
    room: '',
    logo: '',
    number: null,
    card: null,
    players: []
  },
  mutations: {
    SAVE_CONTEXT(state, value) {
      state.user = value.user
      state.room = value.room
      state.logo = value.logo
      state.number = value.number
    },
    SET_AVATAR(state, value) {
      state.logo = value
    }
  },
  actions: {
    saveContext({ commit }, value) {
      commit('SAVE_CONTEXT', value)
    },
    setAvatar({ commit }, value) {
      commit('SET_AVATAR', value)
    }
  },
  modules: {}
})

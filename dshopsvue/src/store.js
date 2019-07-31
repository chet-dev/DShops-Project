import Vue from 'vue'
import Vuex from 'vuex'
import '@/pollAddress'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    loadingMessage: '',
    coinbase: null
  },
  getters: {
    loading: state => {
      return state.loading
    },
    loadingMessage: state => {
      return state.loadingMessage
    },
    coinbase: state => {
      return state.coinbase
    }
  },
  mutations: {
    SET_LOADING_ON(state, payload) {
      state.loading = true
      state.loadingMessage = payload
    },
    SET_LOADING_OFF(state) {
      state.loading = false
      state.loadingMessage = ''
    },
    UPDATE_COINBASE(state, payload) {
      state.coinbase = payload
    }
  },
  actions: {
    setLoadingOn: ({ commit }, payload = '') => {
      commit('SET_LOADING_ON', payload)
    },
    setLoadingOff: ({ commit }) => {
      commit('SET_LOADING_OFF')
    },
    updateCoinbase: ({ commit }, payload) => {
      commit('UPDATE_COINBASE', payload)
    }
  }
})

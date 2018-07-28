import Vue from 'vue'
import Vuex from 'vuex'
import ui from './modules/ui'
import word from './modules/word'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
  	ui,
  	word,
  	user
  },
  strict: process.env.NODE_ENV !== 'production'
})

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index.js'
import './assets/styles/normalize.less'
import axios from 'axios'
Vue.config.productionTip = false
Vue.prototype.$ajax = axios
//Vue.prototype.$ajax.defaults.withCredentials = true
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

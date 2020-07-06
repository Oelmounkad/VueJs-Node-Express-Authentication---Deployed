import Vue from 'vue'
import App from './App.vue'
import {router} from './routes'
import axios from 'axios'
import Vuex from 'vuex'
import { store } from './store'

Vue.config.productionTip = false

Vue.use(Vuex)

Vue.use({
  install (Vue) {
  Vue.prototype.$api = axios.create({
    baseURL: '/'
  })
}
})

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')

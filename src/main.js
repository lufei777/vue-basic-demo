// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import Vuex from 'vuex'
import store from './vuex/store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import VueRouter from 'vue-router'
import routes from './routes'

import App from './App'

Vue.use(ElementUI)
Vue.use(VueRouter)

import Cookies from 'js-cookie'
window.Cookies = Cookies

import moment from 'moment'
Vue.prototype.$moment = moment;//赋值使用
moment.locale('zh-cn');//需要汉化



let router = new VueRouter({
    routes
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  Vuex,
  store,
  components: { App },
  template: '<App/>'
})

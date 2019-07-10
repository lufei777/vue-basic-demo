// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import VueRouter from 'vue-router'
import routes from './routes'

import Vuex from 'vuex'
import store from './vuex/store'

import Cookies from 'js-cookie'
window.Cookies = Cookies

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import { Button } from 'ant-design-vue';
Vue.use(Button)

Vue.use(VueRouter)
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

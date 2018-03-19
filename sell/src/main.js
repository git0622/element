// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Router from 'vue-router'
import route from './router'
import VueResource from 'vue-resource'
import '@/common/stylus/index.styl'

Vue.use(Router)
Vue.use(VueResource)
Vue.config.productionTip = false
const router = new Router(route)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
  // render: h => h(App)
})

// 入口js文件
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import AppTemp from './App'
import router from './router/router.js'

import 'iview/dist/styles/iview.css';
import '../static/css/base.css';
Vue.config.productionTip = false

/* eslint-disable no-new */
// 在vue实例中加入路由属性
new Vue({
  el: '#myapp',
  router,
  components: { AppTemp },
  template: '<AppTemp/>'
})

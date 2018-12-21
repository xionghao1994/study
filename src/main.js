import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'

// 全局一像素边框
// 安装npm install stylus stylus-loader --save-dev
import './assets/common/index.styl'
// 引用axios
import axios from 'axios';
// baseURL基地址
axios.defaults.baseURL = "http://localhost:8080/api/";
// 让所有vue的实例都共享axios
Vue.prototype.$http = axios;


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

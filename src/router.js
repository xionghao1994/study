import Vue from 'vue'
import Router from 'vue-router'
import header from './components/header.vue'
import goods from './components/goods.vue'
import comment from './components/comment.vue'
import merchant from './components/merchant.vue'
Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    { path: '/', redirect:{name:'goods'}},
    { name:'goods',path:'/goods',component:goods},
    { name:'header',path:'/header',component:header},
    { name:'comment',path:'/comment',component:comment},
    { name:'merchant',path:'/merchant',component:merchant} 
  ]
})

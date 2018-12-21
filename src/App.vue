<template>
  <!--此处下只能有一个根节点 -->
  <div id="app">
  <!--头部组件 -->
  <v-header></v-header>
  <!--商品分类 -->
   <div class="tabs border-1px" >
     <ul>
      <li><router-link to="/goods">商品</router-link></li>
      <li><router-link to="/comment">评论</router-link></li>
      <li><router-link to="/merchant">商家</router-link></li>
     </ul>
   </div>
   <!--把接受的数据绑定到路由上用于传递到子组件上-->
    <router-view :seller="seller"></router-view>
  <!--/商品分类 --> 
  </div>
</template>
<script>
import header from './components/header.vue'
export default{
  data(){
    return{
        seller:{
           
        }
    }
  },
  // 用于组件传值到goods
  created(){
    this.$http.get('seller').then((res)=>{
          this.seller = res.data.data
          // console.log(res.data.data)
    })
  },
  components:{
     // 组件不能和内置的语法冲突
    'v-header':header,
  }
}
</script>
<style lang="stylus">
@import './assets/common/mixin.styl'
// 路由动画
.Router {
     position: absolute;
     width: 100%;
     transition: all .8s ease;
}

.slide-left-enter,
 .slide-right-leave-active {
     opacity: 0;
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
}

.slide-left-leave-active,
.slide-right-enter {
     opacity: 0;
    -webkit-transform: translate(-100%, 0);
    transform: translate(-100% 0);
}
// over路由动画
.tabs{
  border-1px(rgba(7, 17, 27, 0.1));
}
.tabs ul{
  display:flex;
  list-style:none;
}
.tabs ul li{
  flex:1;
  text-align:center;
  font-size:14px;
  height:40px;
  line-height:40px;
}
a{
  text-decoration:none;
  color:#333;
  -webkit-tap-highlight-color:transparent;
}
.active{
    color: rgb(240, 20, 20);
}
</style>

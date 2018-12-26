<template>
 <div class="cartcontrol">
 <!--按钮减 -->
 <transition name="move">
  <div class="cart-descrease" v-show="food.count>0" @click.stop.prevent="decreaseCart">
   <span class="inner icon-remove_circle_outline"></span>
  </div>
  </transition>
 <!--/按钮减 -->

 <!--中间数量 -->
  <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
  <!--/中间数量 -->

  <!--按钮加 -->
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
  <!--/按钮加 -->
 </div>
</template>
<script>
import Vue from 'vue';
export default{
    // 接受父组件定义的值
    props:{
        food:{
            type:Object
        }
    },
    methods:{
        // 按钮加
        addCart(event){
            if(!event._constructed){
                return;
            }
            if(!this.food.count){
                Vue.set(this.food,'count',1);
            }else{
                this.food.count++;
            }   
            // 调小球动画添加商品
            this.$emit('cart.add',event.target);
        },
        // 按钮减
        decreaseCart(event){
            if(!event._constructed){
                return;
            }
            if(this.food.count){
                this.food.count--;
            }
        }
    }
}
</script>
<style lang="stylus" scoped>
.cartcontrol
    font-size: 0
    display:flex
    flex:1
    // 按钮减
.cart-decrease
    display: inline-block
    padding: 6px
    opacity: 1
    transform: translate3d(0, 0, 0)
    // 按钮
.inner  
        display: inline-block
        line-height: 24px
        font-size: 24px
        transition: all 0.4s linear
        transform: rotate(0)
      &.move-enter-active, &.move-leave-active
        transition: all 0.4s linear
      &.move-enter, &.move-leave-active
        opacity: 0
        transform: translate3d(24px, 0, 0)
        .inner
          transform: rotate(180deg)
    // 计数
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
    //  按钮加
    .cart-add, .icon-remove_circle_outline
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)
   
    //   按钮动画
//    .inner  
//         display: inline-block
//         line-height: 24px
//         font-size: 24px
//         transition: all 0.4s linear
//         transform: rotate(0)
//       &.move-enter-active, &.move-leave-active
//         transition: all 0.4s linear
//       &.move-enter, &.move-leave-active
//         opacity: 0
//         transform: translate3d(24px, 0, 0)
//         .inner
//           transform: rotate(180deg)
</style>
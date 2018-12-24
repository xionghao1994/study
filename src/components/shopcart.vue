<template>
 <div class="shopcart">
    <div class="content">
      <!--左 -->
     <div class="content-left">
        <div class="logo">
          <div class="icon" :class="{'highlight':totalCount>0}">
            <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
          </div>
          <div class="num" v-show="totalCount0">{{totalCount0}}</div>
        </div>
          <div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
     </div>
     <!-- /左 -->
     <!--右 -->
     <div class="content-right">
         <div class="pay" :class="payClass">{{payDesc}}</div>
     </div>
      <!--左 -->
    </div>
 </div>
</template>
<script>
  export default{
    props: {
      selectFoods: {
        type: Array,
        default() {
          return [
            {
              price: 10,
              count: 1
            }
          ];
        }
      },
      deliveryPrice: {
        type: Number,
        default: 10
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
      data(){
          return{
              seller:{},
              totalCount0:0
          }
      },
      computed:{
        totalPrice() {
           let total = 0;
           this.selectFoods.forEach((food) => {
           total += food.price * food.count;
        });
        return total;
         },
           totalCount() {
           let count = 0;
           this.selectFoods.forEach((food) => {
           count += food.count;
         });
            return count;
        },
        payDesc() {
            if (this.totalPrice === 0) {
            return `￥${this.minPrice}元起送`;
            } else if (this.totalPrice < this.minPrice) {
            let diff = this.minPrice - this.totalPrice;
            return `还差￥${diff}元起送`;
            } else {
            return '去结算';
            }
        },
         payClass() {
            if (this.totalPrice < this.minPrice) {
            return 'not-enough';
            } else {
            return 'enough';
            }
        }
      },
      created(){
          this.getseller()
      },
       methods:{
        getseller(){
            this.$http
                .get('seller')
                .then((res)=>{    
                    // console.log(res.data.data)
                    if(res.status === 200){
                    this.seller =res.data.data
                    }
                })
                .catch((err) =>{
                    console.log(err);
                })
        }
    }
  }  
</script>
<style lang="stylus" scoped>
 .shopcart{
    position:fixed;
    left:0;
    bottom:0;
    width:100%;
    height:48px;
    background-color:#141d27;
}
.content{
    display:flex;
    width:100%;
    height:48px;
    color: rgba(255,255,255,0.4);
}
.content .content-left{
    flex:1;
}
.content .content-left .logo{
    display:inline-block;
    vertical-align:top;
    position:relative;
    top:-10px;
    margin:0 12px;
    padding:6px;
    width:56px;
    height:56px;
    box-sizing: border-box;
    border-radius: 50%;
    background: #141d27;
}
.content .content-left .logo .icon{
    width:100%;
    height:100%;
    border-radius:50%;
    text-align: center;
    background: #2b343c;
}
.content-left .logo .icon.highlight{
     background: rgb(0, 160, 220);
}
.icon-shopping_cart{
    line-height: 44px;
    font-size: 24px;
    color: #80858a;
}
.icon-shopping_cart.highlight{
     color: #fff;
}
.content .content-right{
    flex: 0 0 105px;
    background:#333;
}
.num{
     position: absolute;
     top: 0;
     right: 0;
     width: 24px;
     height: 16px;
     line-height: 16px;
     text-align: center;
     border-radius: 16px;
     font-size: 9px;
     font-weight: 700;
     color: #fff ;
     background: rgb(240, 20, 20);
     box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
}
.price{
    display: inline-block;
    vertical-align: top;
    margin-top: 12px;
    line-height: 24px;
    padding-right: 12px;
    box-sizing: border-box;
    border-right: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 16px;
    font-weight: 700;
}
.price.highlight{
    color: #fff; 
}
 .desc{
    display: inline-block;
    vertical-align: top;
    margin: 12px 0 0 12px;
    line-height: 24px;
    font-size: 10px;   
 }
 .pay{
    height: 48px;
    line-height: 48px;
    text-align: center;
    font-size: 12px;
    font-weight: 700;   
 }
 .enough{
    background: #00b43c;
    color:#fff;
 }              
</style>
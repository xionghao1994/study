<template>
 <!--此处只能有一个根节点 -->
 <div class="container">
 <div class="goods">
  <!--左侧商品目录 -->
   <div class="menu-wrapper" ref="menuWrapper"> 
      <ul>
        <li v-for="(item,index) in goods" :class="{'current':currentIndex===index}"
         @click="selectMenu(index,$event)"  ref="menuList" :key="item.index">
         <span >{{item.name}}</span>
        </li>
      </ul>
   </div>
   <!--右侧商品详情 -->
   <div class="foods-wrapper" ref="foodWrapper">
      <ul>
       <li v-for="item in goods" class="foodList" ref="foodList">
        <h1>{{item.name}}</h1>
        <ul>
         <li class="pra" v-for="food in item.foods"> 
         <div class="icon">
          <img width="57" height="57" :src="food.icon">
         </div>
         <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <!--按钮控件 -->
                  <div class="control">
                   <!--定义子组件标签用于传值 -->
                   <cartcontrol :food="food"></cartcontrol>
                  </div>
                  <!--/按钮控件 -->
         </div>
         </li>
        </ul>
       </li>
      </ul>
   </div>
 </div>
  <!--footer -->
  <shopcart ref="shopcart" :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart>
   <!--/footer -->
 </div>
</template>
<script>
// 导入scroll滑动组件
import BScroll from 'better-scroll';
import shopcart from '../components/shopcart'
// 导入按钮组件
import cartcontrol from '../components/cartcontrol'

export default {
  // props接受父组件传递的值
  props:{
    seller:{
      type:Object
    }
  },
  data() {
    return {
      goods:[],
      scrollY: 0,
      listHeight: [],
    
    }
  },
  created(){
      this.getgoods()
  },
  computed:{
    // 左右联动
    currentIndex(){
      for (let i =0; i<this.listHeight.length;i++){
        let height = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if(!height2 || (this.scrollY >=height && this.scrollY <height2)){
          this._followScroll(i);
          return i;
        }
      }
       return 0;
    },
    // 左右联动
     selectFoods() {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          });
        });
        return foods;
    }
  },
  methods: {
     getgoods(){
        this.$http
            .get('goods')
            .then((res)=>{
                // console.log(res.data.data)
                this.goods =res.data.data
                // 调用scroll滑动组件
                this.$nextTick(() => {
                  this._initScroll();
                  this._calculateHeight();
                });
                // over 调用scroll滑动组件
            })
            .catch((err)=>{
                console.log(err)
            })
     },
     selectMenu(index,event){
      //  console.log(index)
       if(!event._constructed){
         return;
       }
        let foodList = this.$refs.foodList;
        let el = foodList[index];
        this.foodsScroll.scrollToElement(el, 300);
     },
    //  scroll滑动组件
      _initScroll() {
        // 滑动范围 ref="menuWrapper" ref="foodWrapper"
        this.meunScroll = new BScroll(this.$refs.menuWrapper, {
          click:true
        });
        this.foodsScroll = new BScroll(this.$refs.foodWrapper, {
           click: true,
           probeType: 3
        });

         this.foodsScroll.on('scroll', (pos) => {
          // 判断滑动方向，避免下拉时分类高亮错误（如第一分类商品数量为1时，下拉使得第二分类高亮）
          if (pos.y <= 0) {
            this.scrollY = Math.abs(Math.round(pos.y));
          }
        });
  },
  // over scroll滑动组件
  // 左右联动
   _calculateHeight() {
        let foodList = this.$refs.foodList;
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      },
     _followScroll(index) {
        let menuList = this.$refs.menuList;
        let el = menuList[index];
        this.meunScroll.scrollToElement(el, 300, 0, -100);
      }
   },
   // 左右联动
   components:{
     shopcart,
     cartcontrol
   }
}
</script>
<style lang="less" scoped> 
.goods{
  display:flex;
  flex-flow:row;/*伸缩项目单行排列*/ 
  height:440px;
  overflow:hidden;
  .menu-wrapper{
    width:80px;
    background-color:#f1f1f1;
    ul{
      width:100%;
      span{
       padding:16px 12px;
       height:40px;
       text-align:center;
       font-size:12px;
       display:block;
       color:#E47833;
      }
    }
  }
  .foods-wrapper{
    flex:1;
    li{
      padding-left:10px;
      margin:20px 0;
      margin-top:15px;
      h1{
         color:#E47833;
         height:20px;
         background:#ccc;
      }
      h2,p,span{
        font-size:14px;
      }
      .desc,.extra{
        margin:5px 0;
      }
      .price{
        color:red;
      }
    }
  }
}
.icon{
   display:inline-block;
   vertical-align:top;
}
.content{
   display:inline-block;
   padding-left:15px;
}
.old{
  margin-left:25px;
  color:#93999f;
  text-decoration:line-through;
}
.current{
   background:#fff;
}
.pra{
  border-bottom:1px solid #f1f1f1;
  position:relative;
  padding-bottom:5px;
}
.control{
  display:inline-block;
  position:absolute;
  right:5px;
  bottom:0px;
}
</style>
<template>
<!--此处只能有一个根节点 -->
<div class="container">
  <div class="head">
      <div class="left"><img :src="seller.avatar"/></div>
      <div class="right">
        <div class="title">
           <span class="brand"></span>
           <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
        <!--接口嵌套比较深的情况下建议用v-if否则报错undefined -->
        <div v-if="seller.supports" class="text">
          <span class="brand2"></span>
          <span class="message">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div style="display:inline-block;color:#fff;position:relative;" @click="fullScreen">全屏</div>
    </div>
    <div class="banner"><span class="brand"></span>{{seller.bulletin}}</div>
 </div>
</template>
<script>
export default {
  data(){
    return{
        // 定义是否全屏
        isfullScreen: true,
        seller:{}
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
    },
     // 全屏效果
      fullScreen () {
        if (this.isfullScreen) {
          var docElm = document.documentElement
          if (docElm.requestFullscreen) {
            docElm.requestFullscreen()
          } else if (docElm.mozRequestFullScreen) {
            docElm.mozRequestFullScreen()
          } else if (docElm.webkitRequestFullScreen) {
            docElm.webkitRequestFullScreen()
          } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen()
          }
          this.isfullScreen = false
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen()
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen()
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen()
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen()
          }
          this.isfullScreen = true
        }
      }
      // 全屏效果
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.head{
   padding: 24px 12px 18px 24px;
   background-color: rgba(7,17,27,0.5); 
   position:relative;
}
/*背景图片模糊*/
.head:before{
    content:'';
    position:absolute;
    top:0;
    left:0;
    background:transparent url('http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg') center center no-repeat;
    filter:blur(5px);
    z-index:-1;
    background-size:cover;
    width:100%;
    height:110px;
}
.left{
    display:inline-block;
    vertical-align:top;
}
.left img{
    border-radius:5px;
    width:64px;
    height:64px;
}
.right{
     display:inline-block;
     margin-left:12px;
}
.right .name{
    margin-left:6px;
    font-size: 16px;
    line-height: 18px;
    font-weight: bold;
    color:#fff;
}
.right .brand{
    width:30px;
    height:18px;
    background:url('../assets/brand.png')no-repeat;
    background-size:30px 18px;
    display:inline-block;
    vertical-align:top;
}
.description{
    line-height: 12px;
    font-size: 12px;
    color:#fff;
    margin-top:10px;
}
.text{
   margin-top:6px;
}
.text .brand2{
    width:12px;
    height:12px;
    background:url('../assets/decrease.png')no-repeat;
    background-size:12px 12px;
    display:inline-block;
    vertical-align:middle;
}
.text .message{
    line-height: 12px;
    font-size: 12px;
    color:#fff;
}
.banner{
    font-size:12px;
    color:#fff;
    position: relative;
    height: 28px;
    line-height: 28px;
    padding: 0 22px 0 38px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background-color:#333;
}
.banner .brand{
    width:22px;
    height:12px;
    background:url('../assets/bulletin.png') no-repeat;
    background-size:22px 12px;
    display:inline-block;
    position:absolute;
    left:8px;
    top:7px;
}
</style>

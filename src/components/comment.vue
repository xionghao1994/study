<template>
<div class="container">
  <div @click="next()">点击</div>
</div>
</template>
<script>
export default{
    data(){
        return{

        }
    },
    methods:{
        next(){
            this.$router.push('/ce')
        }
    }
}
</script>
<style lang="less" scoped>

</style>
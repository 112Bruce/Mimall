<template>
  <div>
       <!-- 
           orderList、orderConfirm会嵌套在order.vue的
           router-view标签中
        -->
        <!-- 
            order.vue是订单主页面
         -->
      <!-- 下面的标签都是对应的vue文件暴露的name的值 -->
      <!-- 标签里面不用写内容，其内容在其vue文件中 -->
      order
      <order-header></order-header>
      <router-view></router-view>
      <nav-footer></nav-footer>
  </div>
</template>

<script>
import OrderHeader from './../components/OrderHeader'
import NavFooter from './../components/NavFooter'

export default {
    name:'order',
    components:{
        OrderHeader,
        NavFooter
    },
}
</script>

<style>

</style>
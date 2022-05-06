<template>
  <div>
       <!-- 
           orderList、orderConfirm会嵌套在order.vue的
           router-view标签中
        -->
        <!-- 
            order.vue是订单主页面
         -->
      <!-- 下面的自定义标签都是对应的vue文件暴露的name的值 -->
      <order-header></order-header>
      cart
      <nav-footer></nav-footer>
  </div>
</template>

<script>
import OrderHeader from './../components/OrderHeader'
import NavFooter from './../components/NavFooter'

export default {
    name:'cart',
    components:{
        OrderHeader,
        NavFooter
    },
}
</script>

<style>

</style>
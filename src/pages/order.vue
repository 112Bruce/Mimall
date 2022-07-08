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
      <order-header :title="title">
        <template v-slot:tip>
          <span>{{tip}}</span>
        </template>
      </order-header>
      <router-view></router-view>
      <service-bar></service-bar>
      <nav-footer></nav-footer>
  </div>
</template>

<script>
import ServiceBar from './../components/ServiceBar.vue'
import OrderHeader from './../components/OrderHeader'
import NavFooter from './../components/NavFooter'

export default {
    name:'order',
    components:{
        OrderHeader,
        NavFooter,
        ServiceBar,
    },
    data(){
        return {
            title: "",
            tip:'',
        }
    },
    mounted(){
        // 根据路由填写对应的title和tip
        this.titleAndTip();
        
    },
    methods:{
        // 根据路由填写对应的title和tip
        titleAndTip(){
            let path = this.$route.path;
            if(path == '/order/confirm'){
                this.title = '订单确认';
                this.tip = '请认真填写收获地址';
            }else if(path == '/order/list'){
                this.title = '订单列表';
                this.tip = '请仔细核对订单';
            }else if(path == '/order/pay'){
                this.title = '订单支付';
                this.tip = '请尽快支付';
            }
        },

    }

}
</script>

<style>

</style>
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
      <router-view></router-view>
      <service-bar></service-bar>
      <nav-footer></nav-footer>
  </div>
</template>

<script>
import ServiceBar from './../components/ServiceBar.vue'
import NavFooter from './../components/NavFooter'

export default {
    name:'order',
    components:{
        NavFooter,
        ServiceBar,
    },
    data(){
        return {
            
        }
    },
    mounted(){
        // 根据路由填写对应的title和tip
        // this.titleAndTip();
        
    },
    methods:{
        // 不能写在父组件这里,因为mounted在页面渲染第一次
        // 时会被调用,后面不会再调用了(除非强制刷新)
        // 根据路由填写对应的title和tip
        // titleAndTip(){
        //     let path = this.$route.path;
        //     if(path == '/order/confirm'){
        //         this.title = '订单确认';
        //         this.tip = '请认真填写收获地址';
        //     }else if(path == '/order/list'){
        //         this.title = '订单列表';
        //         this.tip = '请仔细核对订单';
        //     }else if(path == '/order/pay'){
        //         this.title = '订单支付';
        //         this.tip = '请尽快支付';
        //     }else{
        //         this.title = '订单支付';
        //         this.tip = '请尽快支付';
        //     }
        // },

    }

}
</script>

<style>

</style>
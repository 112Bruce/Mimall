<template>
  <div class="ali-pay">
      <loading v-if="loading"></loading>
      <div class="form" v-html="content"></div>
  </div>
</template>

<script>
import loading from '../components/loading.vue'
export default {
    // name，vue组件的名字
    name:'aliPay',
    components:{
      loading,
    },
    data(){
      return{
        orderId: this.$route.query.orderId,
        content:'',
        loading:true, //是否展示loading
        
      }
    },
    mounted(){
      this.paySubmit();
    },
    methods:{
      paySubmit(){
        this.axios.post('/pay',{
          orderId:this.orderId,
          orderName:'高仿小米商城',
          amount:0.01, //支付金额
          payType:1, // 1、支付宝支付， 2、微信支付
        }).then((res)=>{
          // content是支付宝的Form表单数据（html源码）
          // 渲染到页面后自动跳转到支付页面
          this.content= res.content;
          // setTimeout()：定时器只执行一次
          setTimeout(()=>{
            // 提交表单，submit()触发Form表单跳转
            document.forms[0].submit();

            // 这个网址是在支付宝后台设置的，
            // 你只需要在那个地址下进行你需要的操作即可
          },500);
        })
      },
  }
    }
</script>

<style>

</style>
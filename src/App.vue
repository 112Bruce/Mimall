<template>
  <div id="app">
    <!-- {{this.res}} -->
    <router-view></router-view>
  </div>
</template>

<script>
// import storage from './storage'v
import axios from 'axios'
import Vue from 'vue'
// import jsonp from 'jsonp'

Vue.prototype.axios = axios

export default {
  name: 'App',
  // data声明为对象，是全局声明，声明为函数，是局部声明，全局声明会
  // 污染数据
  data(){
    return{
      // 忘记写res:{}了,所以mockjs没有拦截数据
      // 在data中不写数据res:{},在mounted里写
      // this.res = res,不能进行数据代理,Vue插件
      // 不能监测到
      // res:{},
      // age:30,
      // data:''
    }
  },
  mounted() {
    // 如果没有登录,则没有必要获取后端数据,在login.vue中
    // 我们用cookie设置了一个前端userId,且在NavHeader.vue
    // 中我们退出登录时,将其设置为了空,因此可以通过userId
    // 判断有没有登录
    if(this.$cookie.get('userId')){
      this.getUser();
      this.getCartCount();
    }
    
    // 接口代理
    // let url = "/api/servicetime";
    // jsonp(url,(err,res)=>{
    //   let result = res;
    //   this.data = result;
    // });

    // 第一种mock方法，本地加载请求静态json文件的形式
    // this.axios.get('/mock/user/login.json').then((res)=>{
    //   this.res = res
    // })

    // 第二种方式，通过easy-mock平台实现数据mock
    // this.axios.get('/user/login').then((res)=>{
    //   this.res = res
    // })

    // 第三种mock方式，本地集成mockjs插件实现数据mock,
    // 用js实现的插件库，可以实现拦截数据、请求，但其本质
    // 上没有发真正的请求,而是在代码上就拦截到了数据
    // this.axios.get('/user/login').then((res)=>{
    //   this.res = res
    // })  
    },
    methods:{
      getUser(){
        this.axios.get('/user').then((res)=>{
          // to-do 保存到vuex中
          this.$store.dispatch('saveUserName',res.username)
        })
      },
      getCartCount(){
        // 从服务器接口获取数据
        this.axios.get('/carts/products/sum').then((res)=>{
          // to-do 保存到vuex中
          this.$store.dispatch('saveCartCount',res)
        })
      }
    }
}
</script>

<style lang="scss">
  @import './assets/scss/reset.scss';
  @import './assets/scss/config.scss';
  @import './assets/button.scss';
</style>

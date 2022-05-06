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

Vue.prototype.axios = axios

export default {
  name: 'App',

  data(){
    return{
      // 忘记写res:{}了,所以mockjs没有拦截数据
      // 在data中不写数据res:{},在mounted里写
      // this.res = res,不能进行数据代理,Vue插件
      // 不能监测到
      res:{}
    }
  },
  mounted() {
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
    this.axios.get('/user/login').then((res)=>{
      this.res = res
    })  
    }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

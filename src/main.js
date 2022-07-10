// 先执行main.js文件,然后再执行app.vue文件


// ctrl + p : 快速查找并跳转页面
// ctrl + d 选中多个


// 从main.js中引入node_modules中的文件可以省略前面的
// ../node_modules/
// import Vue from 'vue' 中的第一个Vue的名字可以随便起，
// 如用Vues，但后面注册时也要用Vues
import Vue from 'vue'
import router from './router'
import axios from 'axios'
// import VueAxios from 'vue-axios'
import VueLazyLoad from 'vue-lazyload'
// 用来保存数据
import VueCookie from 'vue-cookie'
import { Message } from 'element-ui'
// 一定要引入这个样式，否则eliment-ui无效
import 'element-ui/lib/theme-chalk/index.css'
// ./ 表示当前目录，没有 ./ ,会认为是一个插件
// 导入store实际上是使用Vuex
import store from './store'
import App from './App.vue'
// import env from './env'

// 根据前端的跨域方式做调整 /a/b: 访问时：/api/a/b =>
// 转发时：/a/b
// 接口代理才能直接写 /api
axios.defaults.baseURL = '/api'

//跨域的另一种解决方案，接口环境设置 
// axios.defaults.baseURL = env.baseURL

// Mock的第二种方式，通过easy-mock平台实现
// baseURL地址从easy-mock平台获取
// axios.defaults.baseURL = ''

// 设置7s超时
axios.defaults.timeout = 7000

// 第三种mock方式,本地集成mockjs插件,需要添加一个开关
const mock = false
if(mock){
  // import是预编译加载
  // require是执行时才加载,如果mock是false,不会加载
  // mockjs是在发送请求前一刻拦截数据
  require('./mock/api')
}

// 接口错误响应拦截，第一个function拦截业务，第二个function
// 拦截http状态码
axios.interceptors.response.use(function(response){
  // 获取接口返回的值
  let res = response.data;
  // 获取路由地址
  let path = location.hash;
  // 状态码为0，成功
  if(res.status == 0){
    return res.data
    // 未登录，状态码为10
  }else if(res.status == 10){
    // 跳转到登录页面，用路由跳转没用，因为路
    // 由是挂载在vue实例中的，这个文件获取不到vue实例
    // 因为它的this不指向vue实例

    // # 是哈希路由
    // 不是首页的话，跳转到登录界面
    if(path !='#/index'){
      window.location.href = '/#/login';
    }
    // 所有的状态都有返回结果，只有0成功才不抛出错误，抛出
    // 错误才会使调用axios不成功时进入.catch()函数
    return Promise.reject(res); 
  }else{
    this.$message.error(res.msg)
    alert(res.msg);
    // 抛出错误
    return Promise.reject(res);
  }
}, (error)=>{
  let res = error.response;
  Message.error(res.data.message);
  return Promise.reject(error);
})

Vue.use(VueCookie)
// 图片懒加载插件
Vue.use(VueLazyLoad,{loading:''})
Vue.use(store)
Vue.use(router)

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$message = Message


new Vue({
  //ES6简写 router:router => router
  router,
  store,
  render: h => h(App),
}).$mount('#app')

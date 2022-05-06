// 从main.js中引入node_modules中的文件可以省略前面的
// ../node_modules/
// import Vue from 'vue' 中的第一个Vue的名字可以随便起，
// 如用Vues，但后面注册时也要用Vues
import Vue from 'vue'
import router from './router'
import axios from 'axios'
// import VueAxios from 'vue-axios'
import VueLazyLoad from 'vue-lazyload'
import VueCookie from 'vue-cookie'
import { Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// ./ 表示当前目录，没有 ./ ,会认为是一个插件
import store from './store'
import App from './App.vue'
import env from './env'

// 根据前端的跨域方式做调整 /a/b: 访问时：/api/a/b =>
// 转发时：/a/b
// 接口代理才能直接写 /api
// axios.defaults.baseURL = '/api'

//跨域的另一种解决方案，接口环境设置 
axios.defaults.baseURL = env.baseURL

// 设置7s超时
axios.defaults.timeout = 7000

// 接口错误响应拦截
axios.interceptors.response.use(function(response){
  // 获取接口返回的值
  let res = response.data
  // 状态码为0，成功
  if(res.status == 0){
    return res.data
    // 未登录，状态码为10
  }else if(res.status == 10){
    // 跳转到登录页面，用路由跳转没用，因为路
    // 由是挂载在vue实例中的，这个文件获取不到vue实例
    // 因为它的this不指向vue实例

    // # 是哈希路由
    window.location.href = '/#/login'
  }else{
    alert(res.msg)
  }
})

Vue.use(VueCookie)
Vue.use(VueLazyLoad)
Vue.use(store)
Vue.use(router)

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$message = Message

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

<!-- 
          有home.vue，nav-header、nav-footer组件标签
            只需在home.vue中引用一次，而不需再去其他pages
            下的vue文件中再次引用，这就是复用了组件
       -->
       <!-- 
           pages下的其他vue文件,包括:index.vue,detail.vue,
           product.vue等,会嵌套在home.vue的router-view标签中
        -->
        <!-- 
            home.vue是主页面
-->
<template>
  <div>
      home
      <nav-header></nav-header>
      <router-view></router-view>
      <nav-footer></nav-footer>
  </div>
</template>

<script>

// 引入Swiper
// import {Swiper, SwiperSlide} from 'vue-awesome-swiper'
// import 'swiper/css/swiper.css'
import NavHeader from './../components/NavHeader'
import NavFooter from './../components/NavFooter'


export default {
    // name，vue组件的名字
    name:'nav-home',
    components:{
        // Swiper,
        // SwiperSlide,
        NavHeader,
        NavFooter
    },
    data(){
        return{
            
        }
    }
}
</script>

<style>

</style>
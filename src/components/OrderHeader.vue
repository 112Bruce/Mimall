<template>
  <div>
     <div class="order-header">
       <div class="container clearfix">
          <div class="header-logo">
            <!-- 跳转到首页index -->
            <a href="/#/index"></a>
          </div>
          <div class="title">
            <h2>{{title}}<slot name="tip"></slot></h2>
          </div>
          <div class="username">
            <a href="javascript:;">{{username}}</a>
          </div>
       </div>
     </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
    name:'order-header',
    // props，从父组件接收参数
    props:{
      title: String,
    },
    computed:{
      ...mapState(['username'])
    }
}
</script>

<style lang='scss'>
  .order-header{
    padding: 30px 0;
    border-bottom: 2px solid #FF6600;
    .header-logo{
      float:left
    }
    .title, .username{
      display: inline-block;
      height: 55px;
      line-height: 55px;
    };
    .title{
      // font-size: 28px;
      float: left;
      // color: #333333;
      margin-left: 54px;
      h2{
        // 子元素的优先级更高
        font-size: 28px;
        color: #333333;
      };
      span{
        font-size:14px;
        margin-left: 17px;
        color: #999999;
        font-weight: 300;
      }
    }
    .username{
      float: right;
      a{
        color: #666666;
        font-size: 16px;
      }
    }
  }
</style>
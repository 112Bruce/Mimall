<template>
<!-- vue动态绑定类名 -->
  <div class="nav-bar" :class="{'is_Fixed':isFixed}">
      <div class="container">
          <div class="pro-title">小米8</div>
          <div class="pro-param">
              <a href="javascript:;">概述</a><span>|</span>
              <a href="javascript:;">参数</a><span>|</span>
              <a href="javascript:;">用户评价</a>
              <!-- 引入插槽，更灵活 -->
              <slot name='buy'></slot>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name:"product-param",
    data(){
        return{
            // 默认不需要固定定位
            isFixed: false,
        }
    },
    mounted(){
        // 不在里面直接定义函数，而是调用函数名，是为了后面能够清除
        window.addEventListener('scroll', this.initHeight)
    },
    methods:{
        initHeight(){
            // 获取浏览器滚动条的高度，考虑浏览器的兼容性
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            // 是否需要固定定位
            this.isFixed = scrollTop > 152 ? true:false
       }
    },
    destroyed(){
        // 第三个参数，事件行为的处理方式，默认为true：捕获处理，false: 冒泡处理
        // 必须加上为false，否则事件无法移除
        window.removeEventListener('scroll', this.initHeight, false);
    }
}
</script>

<style lang='scss'>
    @import './../assets/scss/config.scss';
    @import './../assets/mixin.scss';
    .is_Fixed{
        position: fixed;
        top:0px;
        // width:100%;
    };
    .nav-bar{
        width:100%;
        height: 70px;
        line-height: 70px;
        border: 1px solid $colorH;
        background-color: #ffffff;
        .container{
            @include flex();
            .pro-title{
                font-size: $fontH;
                color: $colorB;
                font-weight: bold;
            };
            .pro-param{
                font-size: $fontJ;
                a{
                    color: $colorC;
                }
                span{
                    margin:0 10px;
                }

            };

        }
    }
</style>
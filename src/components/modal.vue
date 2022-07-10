<template>
    <!-- 为了演示slide动画，必须将结构代码放在transition标签里面 -->
  <transition name="slide">
    <div class="modal" v-show="showModal">
        <div class="mask"></div>
        <div class="modal-dialog">
            <div class="modal-header">
                <span>{{title}}</span>
                <a href="javascript:;" class="icon-close" @click="$emit('cancel')"></a>
            </div>
            <div class="modal-body">
                <slot name="body"></slot>
            </div>
            <div class="modal-footer">
                <!-- 子组件向父组件传递数据，$emit -->
                <a href="javascript:;" class="btn" v-if="btnType == 1" @click="$emit('submit')">{{sureText}}</a>
                <a href="javascript:;" class="btn" v-if="btnType == 2" @click="$emit('cancel')">{{cancelText}}</a>
                <div class="btn-group" v-if="btnType == 3">
                    <a href="javascript:;" class="btn" @click="$emit('submit')">{{sureText}}</a>
                    <a href="javascript:;" class="btn btn-default" @click="$emit('cancel')">{{cancelText}}</a>
                </div>
            </div>
        </div>
    </div>
  </transition>
</template>

<script>
export default {
    name:"modal",
    // 子组件接收父组件传递的数据
    props:{
        // 文本框类型
        modalType:{
            type:String,
            // 弹框类型
            default:'form'
            },
        // 弹框标题
        title:String,
        // 按钮类型：1、确定按钮 2、取消按钮 3、确定取消按钮都有
        btnType:String,
        sureText:{
            type:String,
            default:'确定',
            },
        cancelText:{
            type:String,
            default:'取消',
            },
        // 做动画
        showModal:Boolean,
    }
}
</script>

<style lang='scss'>
  @import './../assets/scss/config.scss';
  // 引入@import './assets/mixin.scss';时，没有在style标签写lang="scss"
  @import './../assets/mixin.scss';
  @import './../assets/modal.scss';
</style>
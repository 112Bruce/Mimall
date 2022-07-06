<template>
  <div>
      <order-header title="确认订单">
        <template v-slot:tip>
          <span></span>
        </template>
      </order-header>
  </div>
</template>

<script>
import OrderHeader from '../components/OrderHeader.vue'
export default {
    // name，vue组件的名字
    name:'orderConfirm',
    components:{
      OrderHeader,
    }
}
</script>

<style>

</style>
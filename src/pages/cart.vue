<template>
       <!-- 
           orderList、orderConfirm会嵌套在order.vue的
           router-view标签中
        -->
        <!-- 
            order.vue是订单主页面
         -->
      <!-- 下面的自定义标签都是对应的vue文件暴露的name的值 -->
      <!-- 1、props传参title -->
      <!-- 2、使用插槽在子组件写html标签 -->
    <div class="cart">
    <order-header title="我的购物车">
      <template v-slot:tip>
        <span>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span>
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <div class="cart-box">
          <ul class="cart-item-head">
            <li class="col-1"><span class="checkbox" v-bind:class="{'checked':allChecked}" @click="toggleAll"></span>全选</li>
            <li class="col-3">商品名称</li>
            <li class="col-1">单价</li>
            <li class="col-2">数量</li>
            <li class="col-1">小计</li>
            <li class="col-1">操作</li>
          </ul>
          <ul class="cart-item-list">
            <li class="cart-item" v-for="(item,index) in list" v-bind:key="index">
              <div class="item-check">
                <span class="checkbox" v-bind:class="{'checked':item.productSelected}"  @click="updateCart(item)"></span>
              </div>
              <div class="item-name">
                <img v-lazy="item.productMainImage" alt="">
                <span>{{item.productName + ' , ' + item.productSubtitle}}</span>
              </div>
              <div class="item-price">{{item.productPrice}}</div>
              <div class="item-num">
                <div class="num-box">
                  <a href="javascript:;" @click="updateCart(item,'-')">-</a>
                  <span>{{item.quantity}}</span>
                  <a href="javascript:;"  @click="updateCart(item,'+')">+</a>
                </div>
              </div>
              <div class="item-total">{{item.productTotalPrice}}</div>
              <div class="item-del" @click="isOrNotdelProduct(item)"></div>
            </li>
          </ul>
        </div>
        <div class="order-wrap clearfix">
          <div class="cart-tip fl">
            <a href="/#/index">继续购物</a>
            共<span>{{list.length}}</span>件商品，已选择<span>{{checkedNum}}</span>件
          </div>
          <div class="total fr">
            合计：<span>{{cartTotalPrice}}</span>元
            <a href="javascript:;" class="btn" @click="order">去结算</a>
          </div>
        </div>
      </div>
    </div>
    <service-bar></service-bar>
    <nav-footer></nav-footer>
     <!-- 在modal中加参数，让modal.vue中的 props 接收数据 -->
    <!-- 
      子组件modal.vue通过 $emit 中传递自定义事件submit和cancel, 
      父组件index.vue中也要用submit和cancel
    -->
    <modal 
      title="提示"
      sureText="确认删除" 
      btnType="1" 
      modalType="middle" 
      :showModal="showModal"
      @submit="delProduct();showModal=false"
      @cancel="showModal=false"
    >
      <!-- 
        新插槽的用法，modal.vue中用slot标签添加name属性定义，
        index.vue中在template标签中添加v-slot属性，属性值为
        插槽名称 
      -->
      <template v-slot:body>
        <p>是否删除该商品？</p>
      </template>
    </modal>
  </div>
</template>

<script>
import OrderHeader from './../components/OrderHeader'
import ServiceBar from './../components/ServiceBar'
import NavFooter from './../components/NavFooter'
import Modal from './../components/modal'

export default {
    name:'cart',
    components:{
        OrderHeader,
        ServiceBar,
        NavFooter,
        Modal
    },
    data(){
        return{
            allChecked:false, //是否全选
            list:[], //商品列表
            cartTotalPrice:0, //商品总金额
            checkedNum:0, //选中商品数量
            showModal:false, //是否添加动画
            itemId:Number,  //产品id
        }
    },
    mounted(){
        this.getCartList();
    },
    methods:{
        // filter,
        renderData(res){
            this.list = res.cartProductVoList || [];
            this.allChecked = res.selectedAll;
            this.cartTotalPrice = res.cartTotalPrice;
            // 数组的滤波方法，获取已经选中的商品数量
            // this.checkedNum = this.list.filter(item => item.productSelected).length;
            this.checkedNum = res.cartTotalQuantity;
        },
        getCartList(){
            this.axios.get('/carts').then((res)=>{
                this.renderData(res);
            })
        },
        // 控制全选
        toggleAll(){
            let url = this.allChecked?'/carts/unSelectAll':'/carts/selectAll';
            this.axios.put(url).then((res)=>{
            this.renderData(res);
        })
        },
        // 控制单选、数量增加/减少。
        updateCart(item,type){
          let quantity = item.quantity,
              selected = item.productSelected;
        
          if(type == "+"){
            if(quantity> item.productStock){
              this.$message.warning('商品不能超过库存数量');
              return;
            }
            ++quantity;
          }else if(type == "-"){
            if(quantity == 0){
              this.$message.warning('商品已经是0件了')
              return;
            }
            --quantity;
          }else{
            selected = !selected;
          }
          
          this.axios.put(`/carts/${item.productId}`,{
            quantity,
            selected
          }).then((res)=>{
            this.renderData(res);
          });
        },
        // 是否删除
        isOrNotdelProduct(item){
          this.itemId = item.productId
          this.showModal = true;
        },
        // 确认删除
        delProduct(){
          this.axios.delete(`/carts/${this.itemId}`).then((res)=>{
            this.renderData(res);
          });
        },
        // 确认下单
        order(){
          let allNotChecked = this.list.every(item => !item.productSelected);
          if(allNotChecked){
            this.$message.warning('请至少选择一件商品')
          }else{
            this.$router.push('/order/confirm');
          }
        }
    }
}
</script>

<style lang="scss">
  .cart{
    .wrapper{
      background-color:#F5F5F5;
      padding-top:30px;
      padding-bottom:114px;
      .cart-box{
        background-color:#fff;
        font-size:14px;
        color:#999999;
        text-align:center;
        .checkbox{
          display: inline-block;
          width: 22px;
          height: 22px;
          border: 1px solid #E5E5E5;
          vertical-align: middle;
          margin-right: 17px;
          cursor:pointer;
          &.checked{
            background:url('../imgs/icon-gou.png') #FF6600 no-repeat center;
            background-size:16px 12px;
            border:none;
          }
        }
        .cart-item-head{
          display:flex;
          height: 79px;
          line-height: 79px;
          .col-1{
            flex:1;
          }
          .col-2{
            flex:2;
          }
          .col-3{
            flex:3;
          }
        }
        .cart-item-list{
          .cart-item{
            display:flex;
            align-items:center;
            height:125px;
            border-top:1px solid #E5E5E5;
            font-size:16px;
            .item-check{
              flex:1;
            }
            .item-name{
              flex:3;
              font-size: 18px;
              color: #333333;
              display: flex;
              align-items: center;
              img{
                width:80px;
                height:80px;
                vertical-align:middle;
              }
              span{
                margin-left: 30px;
              }
            }
            .item-price{
              flex:1;
              color:#333333;
            }
            .item-num{
              flex:2;
              .num-box{
                display:inline-block;
                width:150px;
                height:40px;
                line-height:40px;
                border:1px solid #E5E5E5;
                font-size:14px;
                a{
                  display:inline-block;
                  width:50px;
                  color:#333333;
                }
                span{
                  display:inline-block;
                  width:50px;
                  color:#333333;
                }
              }
            }
            .item-total{
              flex:1;
              color:#FF6600;
            }
            .item-del{
              flex:1;
              width:14px;
              height:12px;
              background:url('../imgs/icon-close.png') no-repeat center;
              background-size:contain;
              cursor:pointer;
            }
          }
        }
      }
      .order-wrap{
        font-size:14px;
        color: #666666;
        margin-top: 20px;
        height: 50px;
        line-height: 50px;
        .cart-tip{
          margin-left: 29px;
          a{
            color: #666666;
            margin-right:37px;
          }
          span{
            color:#FF6600;
            margin:0 5px;
          }
        }
        .total{
          font-size:14px;
          color:#FF6600;
          span{
            font-size:24px;
          }
          a{
            width:202px;
            height:50px;
            line-height:50px;
            font-size:18px;
            margin-left:37px;
          }
        }
      }
    }
  }
</style>
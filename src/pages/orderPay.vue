<template>
  <div class="order-pay">
    <div class="wrapper">
      <div class="container">
        <div class="order-wrap">
          <div class="item-order">
            <div class="icon-succ"></div>
            <div class="order-info">
              <h2>订单提交成功！去付款咯～</h2>
              <p>请在<span>30分钟</span>内完成支付, 超时后将取消订单</p>
              <p>收货信息：{{addressInfo}}</p>
            </div>
            <div class="order-total">
              <p>应付总额：<span>{{payment}}</span>元</p>
              <!-- 动态绑定类名，及在绑定事件中写入表达式 -->
              <p>订单详情<em class="icon-down" :class="{'up':showDetail}" @click="showDetail=!showDetail"></em></p>
            </div>
          </div>
          <div class="item-detail" v-if="showDetail">
            <div class="item">
              <div class="detail-title">订单号：</div>
              <div class="detail-info theme-color">{{orderId}}</div>
            </div>
            <div class="item">
              <div class="detail-title">收货信息：</div>
              <div class="detail-info">{{addressInfo}}</div>
            </div>
            <div class="item good">
              <div class="detail-title">商品名称：</div>
              <div class="detail-info">
                <ul>
                  <li v-for="(item,index) in orderDetail" :key="index">
                    <img v-lazy="item.productImage"/>{{item.productName}}
                  </li>
                </ul>
              </div>
            </div>
            <div class="item">
              <div class="detail-title">发票信息：</div>
              <div class="detail-info">电子发票 个人</div>
            </div>
          </div>
        </div>
        <div class="item-pay">
          <h3>选择以下支付方式付款</h3>
          <div class="pay-way">
            <p>支付平台</p>
            <div class="pay pay-ali" :class="{checked:payType==1}" @click="paySubmit(1)"></div>
            <div class="pay pay-wechat" :class="{checked:payType==2}" @click="paySubmit(2)"></div>
          </div>
        </div>
      </div>
    </div>
    <!-- 接收自定义事件close，传参img给子组件ScanPayCode -->
    <scan-pay-code v-if="showPay" :img="payImage" @close="closePayModal()"></scan-pay-code>
    <modal
      title="支付确认"
      btnType="3" 
      :showModal="showPayModal"
      sureText="查看订单"
      cancelText="未支付"
      @submit="goOrderList()"
      @cancel="showPayModal=false"
    >
        <template v-slot:body>
          <p>您确认是否完成支付？</p>
        </template>
    </modal>
  </div>
</template>

<script>
import modal from '../components/modal.vue'
import QRCode from 'qrcode';
import ScanPayCode from '../components/ScanPayCode.vue'
export default {
    // name，vue组件的名字
    name:'orderPay',
    components:{
      ScanPayCode,
      modal
    },
    data(){
      return{
        // 在orderConfirm中的orderSubmit()中已经传参
        // orderNo了
        orderId:this.$route.query.orderNo,
        addressInfo:'', //收货人地址
        orderDetail:[], //订单详情
        showDetail:false, //是否显示订单详情
        payment:0, //支付总金额
        payType:'', //选中什么支付方式
        showPay:false, //是否显示微信支付弹框
        payImage:'', //微信支付的二维码地址
        showPayModal:false, //是否显示二次支付确认弹框
        timer:'', // 定时器的id
    }},
    mounted(){
      this.getOrderDetail();
    },
    methods:{
      getOrderDetail(){
        this.axios.get(`/orders/${this.orderId}`).then((res)=>{
        let addressInfo = res.shippingVo;
        this.payment = res.payment;
        this.addressInfo = `${addressInfo.receiverName} ${addressInfo.receiverMobile} ${addressInfo.receiverProvince} ${addressInfo.receiverCity} ${addressInfo.receiverDistrict} ${addressInfo.receiverAddress} ${addressInfo.receiverZip}`
        this.orderDetail = res.orderItemVoList;
        })
      },
      // 关闭支付二次弹框
      closePayModal(){
         this.showPay = false;
         this.showPayModal = true;
         clearInterval(this.timer);
      },
      // 轮询当前订单支付状态
      loopOrderState(){
        this.timer = setInterval(()=>{
          this.axios.get(`/orders/${this.orderId}`).then((res)=>{
            if(res.status == 20){
              // 已经支付
              clearInterval(this.timer);
              this.goOrderList();
            }
          })
        },1000)
      },
      // 跳转到订单列表
      goOrderList(){
        this.$router.push('/order/list');
      },
      paySubmit(payType){
        this.payType = payType;

        if(this.payType == 1){
          // 支付宝支付

          // 打开一个新窗口  window.open(url,'_blank'), _blank：打开新窗口
          // 在url中用?+参数传参，传参orderId
        window.open('#/order/aliPay?orderId='+this.orderId,'_blank')
        }else{
          // 微信支付
            this.axios.post('/pay',{
            orderId:this.orderId,
            orderName:'高仿小米商城',
            amount:0.01, //支付金额
            payType:2, // 1、支付宝支付， 2、微信支付
          }).then((res)=>{
            // content是一串字符串，我们需要将其转换为
            // 二维码，我们用一个插件qrcode，webpack会
            // 把小的icon转换为base64格式的图片，减少请求
            QRCode.toDataURL(res.content)
            // 将res.content转换为base64的格式
            .then(url => {
              this.showPay = true;
              this.payImage = url;
              this.loopOrderState();
            })
            .catch(() => {
              this.$message.error('微信二维码生成失败，请稍后重试');
            });
         });

        }
      },
    }
}
</script>

<style lang="scss">
  .order-pay{
    .wrapper{
      background-color:#F5F5F5;
      padding-top:30px;
      padding-bottom:61px;
      .order-wrap{
        padding: 62px 50px;
        background-color: #fff;
        font-size:14px;
        margin-bottom:30px;
        .item-order{
          display: flex;
          align-items: center;
          .icon-succ{
            width: 90px;
            height: 90px;
            border-radius: 50%;
            background:url('../imgs/icon-gou.png') #80c58a no-repeat center;
            background-size:60px;
            margin-right:40px;
          }
          .order-info{
            margin-right: 248px;
            h2{
              font-size:24px;
              color:#333333;
              margin-bottom:20px;
            }
            p{
              color:#666666;
              span{
                color:#FF6700;
              }
            }
          }
          .order-total{
            &>p:first-child{
              margin-bottom:30px;
            }
            span{
              font-size:28px;
              color:#FF6700;
            }
            .icon-down{
              display:inline-block;
              width:14px;
              height:10px;
              background:url('../imgs/icon-down.png') no-repeat center;
              background-size:contain;
              margin-left:9px;
              transition:all .5s;
              cursor:pointer;
              &.up{
                // 翻转180度
                transform: rotate(180deg);
              }
            }
            .icon-up{
              transform: rotate(180deg);
            }
          }
        }
        .item-detail{
          border-top: 1px solid #D7D7D7;
          padding-top: 47px;
          padding-left: 130px;
          font-size: 14px;
          margin-top: 45px;
          .item{
            margin-bottom:19px;
            .detail-title{
              float:left;
              width:100px;
            }
            .detail-info{
              display:inline-block;
              img{
                width: 30px;
                vertical-align: middle;
              }
            }
          }
        }
      }
      .item-pay{
        padding:26px 50px 72px;
        background-color:#ffffff;
        color: #333333;
        h3{
          font-size: 20px;
          font-weight: 200;
          color: #333333;
          padding-bottom: 24px;
          border-bottom: 1px solid #D7D7D7;
          margin-bottom: 26px;
        }
        .pay-way{
          font-size:18px;
          .pay{
            display:inline-block;
            width:188px;
            height:64px;
            border:1px solid #D7D7D7;
            cursor:pointer;
            &:last-child{
              margin-left:20px;
            }
            &.checked{
              border:1px solid #FF6700;
            }
          }
          .pay-ali{
            background:url('../imgs/pay/icon-ali.png') no-repeat center;
            background-size:103px 38px;
            margin-top:19px;
          }
          .pay-wechat{
            background:url('../imgs/pay/icon-wechat.png') no-repeat center;
            background-size:103px 38px;
          }
        }
      }
    }
  }
</style>
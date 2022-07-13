<template>
  <div class="order-list">
    <order-header title="订单列表">
      <template v-slot:tip>
        <span>请谨防钓鱼链接或诈骗电话，了解更多></span>
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <div class="order-box">
          <loading v-if="loading"></loading>
          <div class="order" v-for="(order,index) in list" :key="index">
            <div class="order-title">
              <div class="item-info fl">
                {{order.createTime}}
                <span>|</span>
                {{order.receiverName}}
                <span>|</span>
                订单号：{{order.orderNo}}
                <span>|</span>
                {{order.paymentTypeDesc}}
              </div>
              <div class="item-money fr">
                <span>应付金额：</span>
                <span class="money">{{order.payment}}</span>
                <span>元</span>
              </div>
            </div>
            <div class="order-content clearfix">
              <div class="good-box fl">
                <div class="good-list" v-for="(item,i) in order.orderItemVoList" :key="i">
                  <div class="good-img">
                    <img v-lazy="item.productImage" alt="">
                  </div>
                  <div class="good-name">
                    <div class="p-name">{{item.productName}}</div>
                    <div class="p-money">{{item.totalPrice + 'X' + item.quantity}}元</div>
                  </div>
                </div>
              </div>
              <div class="good-state fr" v-if="order.status == 20">
                <a href="javascript:;">{{order.statusDesc}}</a>
              </div>
              <div class="good-state fr" v-else>
                <a href="javascript:;" @click="goPay(order.orderNo)">{{order.statusDesc}}</a>
              </div>
            </div>
          </div>
          <no-data v-if="!loading && list.length==0"></no-data>
          <!-- elimentui的分页器 -->
          <el-pagination
            class="pagination"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"  
            :page-sizes="pageSizes"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            v-if="LoadingMethod == 1"
          >
          </el-pagination>

          <!-- <el-pagination
            class="pagination"
            background
            layout="prev, pager, next"
            :total="total"
            :pageSize="pageSize"
            @current-change = "handleChange"
            >
          </el-pagination> -->

          <div class="load-more" v-if="LoadingMethod == 2 && hasNextPage">
            <!-- type="primary": 阻塞. el-button的loading属性有一个加载的效果 -->
            <el-button type="primary" :loading="loading" @click="loadingMore">加载更多</el-button> 
          </div>

          <!-- 
            滚动加载数据 

            v-infinite-scroll="scrollMore"，滚动时触发的方法
            infinite-scroll-disabled="busy"，busy为true，停止滚动
            infinite-scroll-distance="410"，离底部多远时开始滚动
          -->
          <!-- 不能在.scroll-more中写入v-if="LoadingMethod == 3 && list.length" -->
          <div class="scroll-more" 
            v-infinite-scroll="scrollMore"
            infinite-scroll-disabled="busy"
            infinite-scroll-distance="410"
            v-if="LoadingMethod == 3 && list.length"
          >
            <img src="../imgs/loading-svg/loading-spinning-bubbles.svg" v-if="busy && this.hasNextPage">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import后面的组件名最好与from后面的组件名一致
import NoData from '../components/NoData.vue'
import loading from '../components/loading.vue'
import OrderHeader from './../components/OrderHeader'
// Pagination:分页器, Button:按钮
import {Pagination, Button} from 'element-ui'
// 滚动加载插件
import infiniteScroll from 'vue-infinite-scroll'

export default {
    // name，vue组件的名字
    name:'orderList',
    components:{
      OrderHeader,
      loading,
      NoData,
      // 动态加载一个变量: [变量],用中括号
      // Pagination.name等同于el-Pagination
      [Pagination.name]:Pagination,
      [Button.name]:Button,
    },
    // 滚动加载插件指令配置
    directives: {
      infiniteScroll
    },
    data(){
      return{
        list:[], //订单列表
        loading:true, //是否加载loading组件及展示button的loading效果

        // 分页器数据
        // pageSize:10, //分页器每页显示的条目
        // total:0, //订单列表的总条数
        // pageNum:1, //当前分页器的页数

        currentPage: 1, //当前分页器的页数
        pageSizes:[10,20,30,40], //每页可选择的条数
        pageSize:10, //每页实际的条数
        total:0, //订单列表的总条数

        hasNextPage:false, //是否有下一页

        LoadingMethod:1, //加载更多页的方式, 1:分页器, 2:按钮, 3:滚动加载

        busy:false, //滚动加载的停止滚动（true:不触发滚动）
      }
    },
    mounted(){
      this.getOrderList();
    },
    methods:{
      getOrderList(){
        this.loading = true;
        this.axios.get('/orders',{
          params:{
            // pageNum: this.pageNum,
            // 这两个参数是后端接口设置好的,无法改变
            // 上传这两个参数,会覆盖服务器里对应的值
            // 并获取这两个值对应的数据
            pageNum: this.currentPage,
            pageSize: this.pageSize
          }
        }).then((res)=>{
          this.hasNextPage = res.hasNextPage;
          // 查看no-data组件的样式
          // this.list = [] || res.list;
          if(this.LoadingMethod == 1){
            // 分页器
            this.list = res.list;
            this.total = res.total;
          }else if(this.LoadingMethod == 2){
            // 加载按钮
            // concat用于拼接两个数组
            // this.list = res.list;
            this.list = this.list.concat(res.list);
          }else{
            // 滚动加载
            // concat用于拼接两个数组
            this.list = this.list.concat(res.list);
            if(res.hasNextPage){
              this.busy = false;
            }else{
              this.busy = true;
            }
          }
          this.loading = false;
        }).catch(()=>{
          this.loading = false;
        })
      },
      goPay(orderNo){

        // this.$router.push({
        //   name:'order-pay',
        //   query:{orderNo}
        // });

        this.$router.push({
          path:'/order/pay',
          query:{orderNo}
        });
      },

      // 1-分页器的方法
      // handleChange(pageNum){
      //   // 保存点击的pageNum到data的pageNum中
      //   this.currentPage = pageNum;
      //   this.getOrderList();
      // }

      handleSizeChange(pageSize) {
        this.pageSize = pageSize;
        this.getOrderList();
      },
      handleCurrentChange(currentPage) {
         this.currentPage = currentPage;
         this.getOrderList();
      },

      // 2-按钮加载列表数据的方法
      loadingMore(){
        this.currentPage++;
        this.getOrderList();
      },

      // 3-滚动加载列表数据触发的事件
      scrollMore(){
        this.busy=true;
        // this.currentPage++;
        setTimeout(()=>{
          this.currentPage++;
          this.getOrderList();
        },500)
      }
    }
}
</script>

<style lang="scss">
  @import './../assets/scss/config.scss';
  @import './../assets/mixin.scss';
  .order-list{
    .wrapper{
      background-color:$colorJ;
      padding-top:33px;
      padding-bottom:110px;
      .order-box{
        .order{
          @include border();
          background-color:$colorG;
          margin-bottom:31px;
          &:last-child{
            margin-bottom:0;
          }
          .order-title{
            @include height(74px);
            background-color:$colorK;
            padding:0 43px;
            font-size:16px;
            color:$colorC;
            .item-info{
              span{
                margin:0 9px;
              }
            }
            .money{
              font-size:26px;
              color:$colorB;
            }
          }
          .order-content{
            padding:0 43px;
            .good-box{
              width:88%;
              .good-list{
                display: flex;
                align-items: center;
                height:145px;
                .good-img{
                  width:112px;
                  img{
                    width:100%;
                  }
                }
                .good-name{
                  font-size:20px;
                  color:$colorB;
                }
              }
            }
            .good-state{
              @include height(145px);
              font-size: 20px;
              color:$colorA;
              a{
                color:$colorA;
              }
            }
          }
        }
        .pagination{
          // 必须将button写在一个div里面,然后将div设置
          // text-align: center才有效
          text-align: right;
        };
        .el-pagination.is-background .el-pager li:not(.disabled).active{
          background-color: #FF6600;
          color: #FFF;
        }
        .load-more,.scroll-more{
          text-align: center;
        }
      }
    }
  }
</style>
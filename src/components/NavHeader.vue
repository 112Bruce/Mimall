<template>
  <div class="header">
      <div class="nav-topbar">
        <div class="container">
          <div class="topbar-menu">
            <!-- javascript:; 防止刷新 -->
            <a href="javascript:;">小米商城</a>
            <a href="javascript:;">MUI</a>
            <a href="javascript:;">云服务</a>
            <a href="javascript:;">协议规则</a>
          </div>
          <div class="topbar-user">
            <!-- javascript:; 防止刷新 -->
            <a href="javascript:;" v-if="username">{{username}}</a>
            <a href="javascript:;" v-if="!username" @click="login">登录</a>
            <a href="javascript:;" v-if="username" @click="logout">退出</a>
            <a href="javascript:;" v-if="username">我的订单</a>
            <a href="javascript:;" class="my-cart" @click="gotoCart"><span class="icon-cart"></span>购物车{{cartCount}}</a>
          </div>
        </div>
      </div>
      <div class="nav-header">
        <div class="container">
          <div class="header-logo">
            <!-- 跳转到首页index -->
            <a href="/#/index"></a>
          </div>
          <div class="header-menu">
            <div class="item-menu">
              <span>小米手机</span>
              <div class="children">
                <ul>
                  <li class="product" v-for="(item,index) in phoneList" :key="index">
                    <!-- target="_blank"在当前窗口打开新窗口 -->
                    <a :href="'/#/product/' + item.id" target="_blank">
                      <div class="pro-img">
                        <img v-lazy="item.mainImage" alt="item.subtitle">
                      </div>
                      <div class="pro-name">{{item.name}}</div>
                      <div class="pro-price">{{item.price | currency}}</div>
                    </a>
                  </li>   
                </ul>
              </div>
            </div>
            <div class="item-menu">
              <span>RedMi红米</span>
              <div class="children"></div>
            </div>
            <div class="item-menu">
              <span>电视</span>
              <div class="children">
                <ul>
                  <li class="product">
                    <!-- target="_blank"在当前窗口打开新窗口 -->
                    <a href="" target="_blank">
                      <div class="pro-img">
                        <img v-lazy="'../imgs/nav-img/nav-3-1.jpg'" alt="">
                      </div>
                      <div class="pro-name">小米壁画电视 65英寸</div>
                      <div class="pro-price">6999元</div>
                    </a>
                  </li>
                   <li class="product">
                     <a href="" target="_blank">
                      <div class="pro-img">
                        <img v-lazy="'../imgs/nav-img/nav-3-2.jpg'" alt="">
                      </div>
                      <div class="pro-name">小米全面屏电视E55A</div>
                      <div class="pro-price">1999元</div>
                    </a>
                  </li>
                   <li class="product">
                     <a href="" target="_blank">
                      <div class="pro-img">
                        <img v-lazy="'../imgs/nav-img/nav-3-3.png'" alt="">
                      </div>
                      <div class="pro-name">小米电视4A 32英寸</div>
                      <div class="pro-price">699元</div>
                    </a>
                  </li>
                   <li class="product">
                     <a href="" target="_blank">
                      <div class="pro-img">
                        <img v-lazy="'../imgs/nav-img/nav-3-4.jpg'" alt="">
                      </div>
                      <div class="pro-name">小米电视4A 55英寸</div>
                      <div class="pro-price">1799元</div>
                    </a>
                  </li>
                   <li class="product">
                     <a href="" target="_blank">
                      <div class="pro-img">
                        <img v-lazy="'../imgs/nav-img/nav-3-5.jpg'" alt="">
                      </div>
                      <div class="pro-name">小米电视4A 65英寸</div>
                      <div class="pro-price">2699元</div>
                    </a>
                  </li>
                   <li class="product">
                     <a href="" target="_blank">
                      <div class="pro-img">
                        <img v-lazy="'../imgs/nav-img/nav-3-6.png'" alt="">
                      </div>
                      <div class="pro-name">小米CC9</div>
                      <div class="pro-price">1799元</div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="header-search">
            <div class="wrapper">
              <input type="text" name="keyword">
              <a href="javascript:;"></a>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>

import {mapState} from 'vuex'
export default {
    name:'nav-header',
    data(){
      return{
        phoneList:[],
        // username:''
      }
    },
    computed:{
      // username(){
      //   return this.$store.state.username;
      // },
      // cartCount(){
      //   return this.$store.state.cartCount;
      // }
      
      // 等同于上面的两个函数，从vuex中获取数据
      ...mapState(['username','cartCount'])
    },
    // 过滤器
    filters:{
      currency(val){
        if(!val) return '0.00';
        return '￥' + val.toFixed(2) + '元';
      }
    },
    mounted(){
      // 不能少this
      this.getProductList();

      // 为了登录后能保存上次登录的购物信息
      // 前面login.vue文件中的login()函数成功时
      // 会跳转路由,并在路由中的params中传了参数from

      // 通过传参判断以前是否登录过,从而获取购物车信息,
      // 减少了请求,优化了项目
      if(this.$route.params && this.$route.params.from == 'login'){
        this.getCartCount();
      }
    },
    methods:{
      login(){
        // 跳转路由
        this.$router.push('/login');
      },
      logout(){
        this.axios.post('/user/logout').then(()=>{
          // 用vue-cookie保存用户名,第一个参数：key值，第二个参数：
          // value值，第三个参数：期限值，到期就会清除 1M:一个月,
          // -1:即刻过期 
          this.$cookie.set('userId','',{expires: '-1'});
          this.$store.dispatch('saveUserName','');
          this.$store.dispatch('saveCartCount',0);
          this.$message.success('退出成功');

        })
      },
      gotoCart(){
        // 跳转路由
        this.$router.push('/cart');
      },
      // 获取购物车数量
      getCartCount(){
        // 从服务器接口获取数据
        this.axios.get('/carts/products/sum').then((res)=>{
          // to-do 保存到vuex中
          this.$store.dispatch('saveCartCount',res)
        })
      },
      getProductList(){
        this.axios.get('/products',{
          // get传参
          params:{
            categoryID:"100012",
            // 一页是6条数据
            // pageSize:6
          }
        }).then((res)=>{
          if(res.list.length>6){
            // slice，左闭右开，截取数组里的数据，从左索引到右索引
            this.phoneList = res.list.slice(4,10);
          }
        });
      }
    },
}
</script>

<style lang="scss" scoped>
// 导入样式文件
@import './../assets/base.scss';
@import './../assets/mixin.scss';
@import './../assets/scss/config.scss';

  .header{
    .nav-topbar{
      height:39px;
      line-height:39px;
      background-color:#333333;
      color:#B0B0B0;
      .container{
        @include flex();
        a{
          display:inline-block;
          color:#B0B0B0;
          margin-right:17px;
        }
        .my-cart{
          width:110px;
          background-color:#FF6600;
          text-align:center;
          color:#ffffff;
          margin-right: 0px;
          .icon-cart{
            @include bgImg(16px,12px,'../imgs/icon-cart-checked.png');
            text-align:center;
            margin-right:4px;
          }
         }
        }
      };
    .nav-header{
      .container{
        position:relative;
        height: 112px;
        @include flex();
        .header-menu{
          display: inline-block;
          width: 643px;
          padding-left: 209px;
          .item-menu{
            display: inline-block;
            color: #333333;
            font-weight: bold;
            font-size: 16px;
            line-height: 112px;
            margin-right: 20px;
            span{
              // 鼠标移上去会变成小手
              cursor: pointer;
            };
            &:hover{
              color: $colorA;
              .children{
                height: 220px;
                opacity: 1;
                // border-top的定义应该写在鼠标移入后的.children里面
                // 而不是下面的.children里面，否则就会出现笔记.mk的问题1
                border-top: 1px solid #e5e5e5;
                background-color: #ffffff
              };
            };
            .children{
              position: absolute;
              top: 112px;
              left:0;
              width: 1226px;
              height: 0px;
              opacity: 0;
              // 隐藏
              overflow: hidden;
              box-shadow: 0px 7px 6px 0px rgba(0,0,0,0.11);
              z-index: 10;
              // 给高度做动画效果，不知道的话可以用all
              transition: height 0.4s;
              .product{
                position: relative;
                float:left;
                // 占父元素的16.6%
                width: 16%;
                height: 220px;
                font-size: 12px;
                line-height: 12px;
                text-align: center;
                &:before{
                content: ' ';
                position: absolute;
                top: 28px;
                right: 0;
                border-left:1px solid $colorF;
                height: 100px;
                width: 1px;
                };
                 &:last-child:before{
                  display: none;
                };
                a{
                  display: inline-block;
                  .pro-img{
                  height: 137px;
                    img{
                    width:auto;
                    height:111px;
                    margin-top: 26px;
                        };
                          };
                  .pro-name{
                    font-weight: bold;
                    margin-top: 19px;
                    margin-bottom: 8px;
                    color: $colorB;
                  };
                  .pro-price{
                    color: $colorA;
                  }
                };
              }
            }
          };
        };
        .header-search{
          width: 319px;
          .wrapper{
            height: 50px;
            border: 1px solid #e0e0e0;
            display: flex;
            // 垂直居中
            align-items: center;
            input{
              border: none;
              box-sizing: border-box;
              border-right: 1px solid #e0e0e0;
              width:264px;
              height: 50px;
              padding-left: 14px;
            };
            a{
              @include bgImg(18px,18px,'../imgs/icon-search.png');
              margin-left: 17px;
            }
          }
        }
      }
    }
  }
</style>
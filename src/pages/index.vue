<template>
  <div class="index">
    <!-- 
      用一个大容器包裹其他模块，为了形成安全区域，让其他模块中的元素
      不会超出安全区域，影响布局及美观
     -->

    <!-- 
      用绝对定位脱离文档流，并让其父元素开启相对定位，这样既可以定位
      也不会占位
     -->

    <div class="container">
      <!-- 用swiper实现轮播 -->
      <div class="swiper-box">
        <div class="nav-menu">
          <ul class="menu-wrap">
            <li class="menu-item">
              <a href="javascript::">手机 电话卡</a>
              <div class="children">
                <!-- item与index的顺序不能错，否则图片出不来 -->
                <ul v-for="(item,i) in menuList" :key="i">
                  <li v-for="(sub,j) in item" :key="j">
                    <a :href=" sub?'/#/product'+sub.id : '' ">
                      <img v-lazy="sub?sub.img:'./../imgs/item-box-1.png'" alt="">
                      {{sub?sub.name : "小米9"}}
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="menu-item">
              <a href="javascript::">电视 盒子</a>
              <div class="children"></div>
            </li>
            <li class="menu-item">
              <a href="javascript::">笔记本 平板</a>
              <div class="children"></div>
            </li>
            <li class="menu-item">
              <a href="javascript::">家电 插线板</a>
              <div class="children"></div>
            </li>
            <li class="menu-item">
              <a href="javascript::">出行 穿戴</a>
              <div class="children"></div>
            </li>
            <li class="menu-item">
              <a href="javascript::">智能 路由器</a>
              <div class="children"></div>
            </li>
            <li class="menu-item">
              <a href="javascript::">电源 配件</a>
              <div class="children"></div>
            </li>
            <li class="menu-item">
              <a href="javascript::">生活 箱包</a>
              <div class="children"></div>
            </li>
          </ul>
        </div>
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item,index) in slideList" :key="index">
            <!-- 用了指令，字符串要用单引号括起来 -->
            <a :href="'/#/product/'+item.id"><img v-lazy="item.img"></a>
          </swiper-slide>
          <!-- Optional controls -->
          <!-- 使用插槽 slot 确定分页器的位置 -->
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>
      <!-- 广告位 -->
      <div class="ads-box">
        <a :href="'/#/product/'+item.id" v-for='(item,index) in adList' :key="index">
          <!-- <img :src="item.img" alt=""> -->
          <img v-lazy="item.img" alt="">
        </a>
      </div>
      <div class="banner">
        <a href="/#/product/30">
        <!-- v-lazy是v指令，会把双引号里面的内容当作变量，而地址
        是字符串，故还需要加单引号 -->
          <img v-lazy="'./../imgs/banner-1.png'" alt="">
        </a>
      </div>
      <!-- 产品位 -->
      <div class="product-box">
        <div class="container">
          <h2>手机</h2>
          <div class="wrapper">
            <div class="banner-left">
              <a href="javascript:;">
                <img v-lazy="'./../imgs/mix-alpha.jpg'" alt="">
              </a>
            </div>
            <div class="list-box">
              <div v-for="(arr,i) in phoneList" :key="i" class="list">
                <div v-for="(item,j) in arr" :key="j" class="item">
                  <span :class="{'new-pro' : j % 2 == 0}">新品</span>
                  <div class="item-img">
                    <img v-lazy="item.mainImage" alt="">
                  </div>
                  <div class="item-info">
                    <h3>{{item.name}}</h3>
                    <p>{{item.subtitle}}</p>
                    <p class="price" @click="addCart(item.id)">{{item.price}}元</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
    <service-bar></service-bar>
    <!-- 在modal中加参数，让modal.vue中的 props 接收数据 -->
    <!-- 
      子组件modal.vue通过 $emit 中传递自定义事件submit和cancel, 
      父组件index.vue中也要用submit和cancel
    -->
    <modal 
      title="提示"
      sureText="查看购物车" 
      btnType="1" 
      modalType="middle" 
      :showModal="showModal"
      @submit="goToCart"
      @cancel="showModal=false"
    >
      <!-- 
        新插槽的用法，modal.vue中用slot标签添加name属性定义，
        index.vue中在template标签中添加v-slot属性，属性值为
        插槽名称 
      -->
      <template v-slot:body>
        <p>商品添加成功！</p>
      </template>
    </modal>
  </div>
</template>

<script>
import {swiper, swiperSlide} from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import ServiceBar from './../components/ServiceBar'
import Modal from './../components/modal'
export default {
    // name，vue组件的名字
    name:'index',
    components:{
      ServiceBar,
      swiper, 
      swiperSlide,
      Modal
    },
    data(){
      return{
        swiperOption:{
          // 自动播放
          autoplay:true,
          // 循环播放
          loop:true,
          effect:'cube',
          cubeEffect:{
            slideShadows:true,
            shadow:true,
            shadowOffset: 20,
            shadowScale:0.94
          },
          pagination: {
            // 哪个对象是分页器
            el: '.swiper-pagination',
            // 分页器点击能切换（下面的5个小点）
            clickable:true
          },
          // 前、后两个箭头的点击实现翻页的效果
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        },
        slideList:[
          {
            id:'42',
            img:'./../imgs/slider/slide-1.jpg'
          },
           {
            id:'45',
            img:'./../imgs/slider/slide-2.jpg'
          },
           {
            id:'46',
            img:'./../imgs/slider/slide-3.jpg'
          },
           {
            id:'',
            img:'./../imgs/slider/slide-4.jpg'
          },
           {
            id:'',
            img:'./../imgs/slider/slide-5.jpg'
          },
        ],
        menuList:[
          [
            {
              id:30,
              img:'./../imgs/item-box-1.png',
              name:'小米CC9',
            },
            {
              id:31,
              img:'./../imgs/item-box-2.png',
              name:'小米8青春版',
            },
            {
              id:32,
              img:'./../imgs/item-box-3.jpg',
              name:'Redmi K20 Pro',
            },
            {
              id:33,
              img:'./../imgs/item-box-4.jpg',
              name:'移动4G专区',
            }
          ],
          [0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]
        ],
        adList:[
          {
            id:33,
            img:'./../imgs/ads/ads-1.png'
          },
          {
            id:48,
            img:'./../imgs/ads/ads-2.jpg'
          },
          {
            id:45,
            img:'./../imgs/ads/ads-3.png'
          },
          {
            id:47,
            img:'./../imgs/ads/ads-4.jpg'
          },
        ],
        phoneList:[],
        showModal:false,
      }
    },
    mounted(){
      this.Init();
    },
    methods:{
      goToCart(){
        // 跳转到 /cart 路由
        this.$router.push('/cart');
      },
      addCart(id){
        // Modal弹框动画
        // this.showModal = true;

        this.axios.post('/carts',{
          productId:id,
          selected: true
        }).then((res) => {
          // 添加购物车且成功获取服务端数据，弹框
          this.showModal = true;
          // 将购物车总数量上传至vuex（更新购物车总数量），方便所有组件获取
          // this.$store.dispatch(saveCartCount,res.cartTotalQuantity)
          // saveCartCount是一个函数，必须写上''
          this.$store.dispatch('saveCartCount',res.cartTotalQuantity);
        }).catch(() =>{
          this.showModal = true
        })
      },
      Init(){
        this.axios.get('/products',{
          params:{
            categoryId:100012,
            pageSize:14
          }
        }).then((res)=>{
          //slice与splice的区别，前者不会改变原数组，而后者会
          res.list = res.list.slice(6,14)
          this.phoneList = [res.list.slice(0,4),res.list.slice(4,8)];
        })
      }
    }
}
</script>

<style lang="scss" scoped>
@import './../assets/scss/config.scss';
@import './../assets/mixin.scss';
@import './../assets/base.scss';
  .index{
    .swiper-box{
      .nav-menu{
        position:absolute;
        width:264px;
        height: 451px;
        z-index: 9;
        padding: 26px 0;
        background-color: #55585a7a;
        // 盒子模型的高度包括padding.margin
        box-sizing: border-box;
        .menu-wrap{
          padding:0px;
          .menu-item{
            height: 50px;
            line-height: 50px;
            a{
              position: relative;
              display: block;
              font-size: 16px;
              color: #ffffff;
              padding-left: 30px;
              &:after{
                position: absolute;
                right:30px;
                top:17.5px;
                content: '';
                @include bgImg(10px,15px,'./../imgs/icon-arrow.png');
              }
            }
            &:hover{
              background-color: $colorA;
              .children{
                display: block;
              }
            };
            .children{
              display: none;
              width: 962px;
              height: 451px;
              background-color: $colorG;
              position: absolute;
              top: 0px;
              left:264px;
              border: 1px solid $colorH;
              ul{
                display: flex;
                // 两端对齐
                justify-content: space-between;
                height: 75px;
                li{
                  height: 75px;
                  line-height: 75px;
                  // 每个li都是平均值
                  flex:1;
                  padding-left: 23px;
                };
                a{
                  color:$colorB;
                  font-size:14px;
                  img{
                    width:42px;
                    height:35px;
                    // 图片和文字垂直居中
                    vertical-align:middle;
                    margin-right:15px;
                }
                };
              }
            }
          }
        }
      };
      // 用了swiper插件，其样式里面肯定也用了绝对定位
      .swiper-container{
        height: 451px;
        .swiper-button-prev{
          left:274px;
        }
        img{
          width:100%;
          height: 100%;
        }
      }
    };
    .ads-box{
      @include flex();
      margin-top: 14px;
      margin-bottom: 31px;
      a{
        width: 296px;
        height: 167px;
        img{
          width: 100%;
          height:100%;
        }
      }
    };
    .banner{
      width: 1226px;
      height: 167px;
        img{
          width: 100%;
          height:100%;
        }

    };
    .product-box{
      background-color: $colorJ;
      padding: 30px 0 50px;
      h2{
        font-size: $fontF;
        height: 21px;
        line-height: 21px;
        color: $colorB;
        margin-bottom: 20px;
      };
      .wrapper{
        // flex布局非常好，可以自动排列，而不用使用float
        display:flex;
        .banner-left{
          margin-right: 16px;
          a{
             img{
                width: 224px;
                height: 619px;
              };
          };
        };
        .list-box{
          .list{
            @include flex();
            width:986px;
            margin-bottom: 14px;
            &:last-child{
              margin-bottom: 0px;
            }
            .item{
              width: 236px;
              height: 302px;
              background-color: $colorG;
              // 文字居中
              text-align: center;
              span{
                // 设置为行内块元素才能设置宽度和高度
                display: inline-block;
                width: 67px;
                height: 24px;
                font-size: 14px;
                line-height: 24px;
                color: $colorG;
                &.new-pro{
                  background-color: #7ecf68;
                };
                &.kill-pro{
                  background-color: #e82626;
                };
              };
              .item-img{
                height:195px;
                margin: 5px 0;
                img{
                  width: 100%;
                  height: 100%;
                }
              };
              .item-info{
                h3{
                  font-size: $fontJ;
                  color: $colorB;
                  line-height: $fontJ;
                  font-weight: bold;
                  margin: 0px;
                };
                P{
                  color: $colorD;
                  line-height: 13px;
                  margin: 6px auto 13px;
                };
                .price{
                  color:#F20A0A;
                  font-size:$fontJ;
                  font-weight:bold;
                  cursor:pointer;
                  &:after{
                    @include bgImg(22px,22px,'./../imgs/icon-cart-hover.png');
                    content:' ';
                    margin-left:5px;
                    vertical-align: middle;
                  }
                }
              };
            };

          };
        }
      }
    };
  }
</style>
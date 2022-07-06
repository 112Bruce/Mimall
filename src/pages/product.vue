<template>
  <div class="product">
      <!-- 放上组件标签（product-param） -->
      <product-param>
        <!-- vue3.0最新语法 v-slot:buy-->
        <template v-slot:buy>
          <a href="javascript:;">
            <button class="btn" @click="buy">立即购买</button>
          </a>
        </template>
      </product-param>
      <div class="content">
      <div class="item-bg">
        <h2>小米8</h2>
        <h3>8周年旗舰版</h3>
        <p>
          <a href="" id="">全球首款双频 GP</a>
          <span>|</span>
          <a href="" id="">骁龙845</a>
          <span>|</span>
          <a href="" id="">AI 变焦双摄</a>
          <span>|</span>
          <a href="" id="">红外人脸识别</a>
        </p>
        <div class="price">
          <span>￥<em>2599</em></span>
        </div>
      </div>
      <div class="item-bg-2"></div>
      <div class="item-bg-3"></div>
      <div class="item-swiper">
        <!-- 用vue-awesome-swiper实现轮播效果 -->
        <swiper :options="swiperOption">
            <swiper-slide><img src="../imgs/product/gallery-2.png" alt=""></swiper-slide>
            <swiper-slide><img src="../imgs/product/gallery-3.png" alt=""></swiper-slide>
            <swiper-slide><img src="../imgs/product/gallery-4.png" alt=""></swiper-slide>
            <swiper-slide><img src="../imgs/product/gallery-5.jpg" alt=""></swiper-slide>
            <swiper-slide><img src="../imgs/product/gallery-6.jpg" alt=""></swiper-slide>
            <!-- Optional controls -->
            <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>
        <p class="desc">小米8 AI变焦双摄拍摄</p>
      </div>
      <div class="item-video">
        <h2>60帧超慢动作摄影<br/>慢慢回味每一瞬间的精彩</h2>
        <p>后置960帧电影般超慢动作视频，将眨眼间的美妙展现得淋漓尽致！<br/>更能AI 精准分析视频内容，15个场景智能匹配背景音效。</p>
        <!-- @click里面可以是表达式，也可以是函数 -->
        <!-- transition动画 -->
        <!-- <div class="video-bg" @click="showSlide=true;videoPause(!showSlide)"></div> -->

        <!-- animation动画 -->
        <div class="video-bg" @click="showSlide='slideDown';videoPause(false)"></div>

        <div class="video-box">
          <div class="overlay"></div>
          <!-- 动态绑定类名，再在绑定的类里写top等值，用transition实现动画
          里面的类名表达式可以用数组、对象、字符串来表达
            1、对象：v-bind:class="{'slide':boolean}"
              boolean为true时，类名就是slide，否则就无。
            2、字符串：v-bind:class="showSlide"，showSlide不能再用单引号包起来了
                当showSlide = slideUp时，类名就是slideUp
            3、数组：v-bind:class="[]"，同时绑定多个类
            4、表达式：v-bind:class="showSlide?slideUp:slideDown"
           -->
          <!-- <div class="video" :class="{'slide':showSlide}">
            绑定多个事件，中间用分号隔开
            <span class="icon-close" @click="showSlide=false;videoPause(!showSlide)"></span>
            <video src="../imgs/product/video.mp4" muted autoplay controls="controls"></video>
          </div> -->

          <!-- 第二种动画animation -->
          <div class="video" :class="showSlide">
            <!-- 绑定多个事件，中间用分号隔开 -->
            <span class="icon-close" @click="showSlide='slideUp';videoPause(true)"></span>
            <video src="../imgs/product/video.mp4" controls="controls"></video>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import ProductParam from '../components/ProductParam.vue'
export default {
    // name，vue组件的名字
    name:'Product',
    // 用import导入组件后要立即注册
    components:{
      swiper, 
      swiperSlide,
      ProductParam,
    },
    data(){
      return {
        id: this.$route.params.id,
        // transition动画
        // showSlide: false,

        // animation动画
        showSlide:'',

        // 商品信息
        product:{},

        // vue-awesome-swiper轮播
        swiperOption:{
          autoplay:true,
          slidesPerView:3,
          spaceBetween: 30,
          freeMode: true,
          pagination: {
            el: '.swiper-pagination',
            clickable :true,
          }
        }
      }
    },
    mounted(){
      // 将从服务器拿到的参数动态赋值给子组件ProductParam.vue中标签的内容
      // 用props实现父组件向子组件传递数据，并在子组件的data中声明相应变量，
      // 并赋值为父组件收到的参数（age: this.age）
      this.getProductInfo();
    },
    methods: {
      videoPause(pause){
        let video = document.getElementsByTagName('video')[0];
        /*
          video.pause不起效果，原因已经找到，
        document.getElementsByTagName('video')[0],
        没有加上[0].
        */
        if(pause){
          video.pause();
        }else{
          video.play();
        }
      },
      getProductInfo(){
        // 参数用的是route，路由用的是router
        console.log(this.id);
        // ``:反引号，ES6语法，动态id(id值是变量)
        // 路径多了s是服务器路径，否则是我们自己设计的路由
        this.axios.get(`/products/${this.id}`).then((res)=>{
          this.product = res;
        })
      },
      buy(){
        // 动态绑定id，里面必须是{}，而不是().
        this.$router.push(`/detail/${this.id}`);
      }
    },
}
</script>

<style lang="scss">
  @import './../assets/mixin.scss';
  .product{
    .btn{
      margin-left: 10px;
    };
    .content{
      .item-bg{
        background:url('../imgs/product/product-bg-1.png') no-repeat center;
        height: 718px;
        text-align: center;
        h2{
          font-size: 80px;
          padding-top: 55px;
        };
        h3{
          font-size: 24px;
          letter-spacing: 10px;
        };
        p{
          margin-top: 21px;
          margin-bottom: 40px;
          a{
            font-size:16px;
            color:#333333;
          };
          span{
            margin: 0 15px;
          }
        };
        .price{
          font-size:30px;
          color:#333333;
          em{
            font-style: normal;
            font-size: 38px;
           }
        }
      };
       .item-bg-2{
        background:url(../imgs/product/product-bg-2.png) no-repeat center;
        height:480px;
        background-size:1226px 397px;
      }
      .item-bg-3{
        background:url(../imgs/product/product-bg-3.png) no-repeat center;
        height:638px;
        background-size:cover;
      }
      .item-swiper{
        margin:36px auto 52px;
        .desc{
          font-size:18px;
          color:#333333;
          text-align:center;
        }
        img{
          width:100%;
        };
      };
      .item-video{
        height:1044px;
        background-color:#070708;
        margin-bottom:76px;
        color:#FFFFFF;
        text-align:center;
        h2{
          font-size:60px;
          padding-top:82px;
          margin-bottom:47px;
        };
        p{
          font-size:24px;
          margin-bottom:58px;
        };
        .video-bg{
          background:url('../imgs/product/gallery-1.png') no-repeat center;
          background-size:cover;
          width:1226px;
          height:540px;
          margin:0 auto 120px;
          cursor:pointer;
        };
    };
    .video-box{  
          .overlay{
            // 一开启，就覆盖掉整个窗口，且默认z-index非常大，
            // 因此其他标签属性的js点击效果全部失效
            // @include position(fixed);
            background-color:#333333;
            opacity:.4;
            z-index:1;
          }

          // 定义animation动画，@keyframes固定用法
          // 动画必须成对出现
          // slideDown:动画名
          @keyframes slideDown {
            from{
              top:-50%;
              opacity:0;
            }to{
              top:50%;
              opacity:1;
            }
          };
          @keyframes slideUp {
            from{
              top:50%;
              opacity:1;
            }to{
              top:-50%;
              opacity:0;
            }
          }


          .video{
            position:fixed;
            top:-50%;
            left:50%;
            transform:translate(-50%,-50%);
            z-index:10;
            width:1000px;
            height:536px;
            opacity: 0;
            transition: all .6s;

            // 第一种动画，用transition实现
            // &.slide{
            //   top: 50%;
            //   opacity: 1;
            // }

            // 引用第二种动画，用animation实现
            &.slideDown{
              // 第一个值：动画名，第二个值：动画过渡时间，
              // 第三个值：动画运动曲线
              animation:slideDown .6s linear;
              top:50%;
              opacity:1;
            };
            &.slideUp{
              animation:slideDown .6s linear;
              top:-50%;
              opacity:0;
            }

            .icon-close{
              position:absolute;
              top:20px;
              right:20px;
              @include bgImg(20px,20px,'../imgs/icon-close.png');
              cursor:pointer;
              &:hover{
                background-color: red;
                transform: scale(1.4);
              }
              z-index:11;
            }
            video{
              width:100%;
              height:100%;
              object-fit:cover;
              outline:none;
            };
          }
        }
    }
  }
</style>
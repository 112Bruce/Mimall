<template>
  <div class="login">
    <div class="container">
      <a href="/#/index"><img v-lazy="'/imgs/login-logo.png'" alt=""></a>
    </div>
    <div class="wrapper">
      <div class="container">
        <div class="login-form">
          <h3>
            <span class="checked">帐号登录</span><span class="sep-line">|</span><span>扫码登录</span>
          </h3>
          <div class="input">
            <input type="text" placeholder="请输入帐号" v-model="username">
          </div>
          <div class="input">
            <input type="password" placeholder="请输入密码" v-model="password">
          </div>
          <div class="btn-box">
            <a href="javascript:;" class="btn" @click="login">登录</a>
          </div>
          <div class="tips">
            <div class="sms" @click="register">手机短信登录/注册</div>
            <div class="reg">立即注册<span>|</span>忘记密码？</div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footer-link">
        <a href="https://www.imooc.com/u/1343480" target="_blank">河畔一角主页</a><span>|</span>
        <a href="https://coding.imooc.com/class/113.html" target="_blank">Vue全栈课程</a><span>|</span>
        <a href="https://coding.imooc.com/class/236.html" target="_blank">React全家桶课程</a><span>|</span>
        <a href="https://coding.imooc.com/class/343.html" target="_blank">微信支付专项课程（H5+小程序/云+Node+MongoDB）</a>
      </div>
      <p class="copyright">Copyright ©2019 mi.futurefe.com All Rights Reserved.</p>
    </div>
  </div>
</template>

<script>

export default {
    // name，vue组件的名字
    name:'login',
    data(){
      // 必须要return
      return{
        username:'',
        password:'',
        userId:''
      }

    },
    methods:{
      login(){
        // 解构赋值
        let { username,password } = this;
        // 将数据上传到服务器，表单请求，首选post
        this.axios.post('/user/login',{
          username,
          password
        }).then(res=>{
          // 用vue-cookie保存用户名,第一个参数：key值，第二个参数：
          // value值，第三个参数：期限值，到期就会清除 1M:一个月,
          // Session:会话级,只有退出浏览器cookie的值才会消失(必须
          // 是右键浏览器小图标,点击退出才行)
          this.$cookie.set('userId',res.id,{expires: 'Session'});

          // 将数据发送给vuex
          this.$store.dispatch('saveUserName',username);

          // 登录成功，跳转回首页
          /*
          query传参(post传参)用name，params传参(get传参)
          用path.（所以router.js文件中既配置了name，又配置
          了path。name没有'/'，比如 name:'index', 
          path:'/index'）
          */
          // this.$router.push('/index');
          // 在跳转路由里传参，方便第二次登录时判断是否再次
          // 获取购物车信息
          this.$router.push({
            name: 'index',
            params:{
              from: 'login',
            }
          })
          this.$message.success('登录成功');
        }).catch(()=>{
          this.$message.success('密码或账号错误');
        })
      },
      register(){
        // 将数据上传到服务器，表单请求，首选post
        this.axios.post('/user/login',{
          username:'admin1',
          password:'admin1',
          email:'admin1@qq.com'
        }).then(()=>{
          this.$message.success('注册成功');
        })
      }
    }
}
</script>

<style lang = "scss">
@import './../assets/base.scss';
.login{
  &>.container{
    height:113px;
    img{
      width:auto;
      height:100%;
    }
  }
  .wrapper{
    background:url('./../imgs/login-bg.jpg') no-repeat center;
    .container{
      height:576px;
      .login-form{
        box-sizing: border-box;
        padding-left: 31px;
        padding-right: 31px;
        width:410px;
        height:510px;
        background-color:#ffffff;
        position:absolute;
        bottom:29px;
        right:0;
        h3{
          line-height:23px;
          font-size:24px;
          text-align:center;
          margin:40px auto 49px;
          .checked{
            color:#FF6600;
          }
          .sep-line{
            margin:0 32px;
          }
        }
        .input{
          display:inline-block;
          width:348px;
          height:50px;
          border:1px solid #E5E5E5;
          margin-bottom:20px;
          input{
            width: 100%;
            height: 100%;
            border: none;
            padding: 18px;
          }
        }
        .btn{
          width:100%;
          line-height:50px;
          margin-top:10px;
          font-size:16px;
        }
        .tips{
          margin-top:14px;
          display:flex;
          justify-content:space-between;
          font-size:14px;
          cursor:pointer;
          .sms{
            color:#FF6600;
          }
          .reg{
            color:#999999;
            span{
              margin:0 7px;
            }
          }
        }
      }
    }
  }
  .footer{
    height:100px;
    padding-top:60px;
    color:#999999;
    font-size:16px;
    text-align:center;
    .footer-link{
      a{
        color:#999999;
        display:inline-block;
      }
      span{
        margin:0 10px;
      }
    }
    .copyright{
      margin-top:13px;
    }
  }
}
</style>
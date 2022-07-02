// ctrl + d 选中多个
// import Vue from 'vue' 中的第一个Vue的名字可以随便起，
// 如用Vues，但后面注册时也要用Vues

import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/home'
import Index from './pages/index'
import Detail from './pages/detail'
import Product from './pages/product'
import Cart from './pages/cart'
import Order from './pages/order'
import OrderConfirm from './pages/orderConfirm'
import OrderList from './pages/orderList'
import OrderPay from './pages/orderPay'
import AliPay from './pages/aliPay'
import Login from './pages/login'

// 必须要在路由文件中使用vue.use(VueRouter),否则渲染不出
// pages中的vue的内容
Vue.use(Router)

export default new Router({
    routes:[
        {
            // '/' 表示父路由
            // 如果路径是 /
            path:'/',
            // 加载home组件
            name:'home',
            // 则给你看Home组件
            component: Home,
            // 默认跳转到 /index
            redirect: '/index',
            
            // 加载子路由
            children:[
                {
                    // 子路由的路径中不能有 /
                    path:'index',
                    // 加载home组件
                    name:'index',
                    component: Index, 
                    },
                {
                    // 动态路由
                    path:'detail/:id',
                    // 加载home组件
                    name:'detail',
                    component: Detail, 
                },
                {
                    path:'product/:id',
                    // 加载home组件
                    name:'product',
                    component: Product, 
                }
                    ]
        },

        {
            // '/' 表示父路由
            path:'/login',
            // 加载login组件
            name:'login',
            component: Login,
        },

        {
            // '/' 表示父路由
            path:'/cart',
            // 加载home组件
            name:'cart',
            component: Cart,
        },

        {
            // '/' 表示父路由
            path:'/order',
            // 加载home组件
            name:'order',
            component: Order,
            children:[
                {
                    // 子路由的路径中不能有 /
                    path:'list',
                    // 加载home组件
                    name:'order-list',
                    component: OrderList, 
                },
                {
                    // 动态路由
                    path:'confirm',
                    // 加载home组件
                    name:'order-confirm',
                    component: OrderConfirm, 
                },
                {
                    path:'pay',
                    // 加载home组件
                    name:'order-pay',
                    component: OrderPay, 
                },
                {
                    path:'aliPay',
                    // 加载home组件
                    name:'aliPay',
                    component: AliPay, 
                }
                    ]
        },
    ]
})

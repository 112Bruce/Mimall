// node.js用module导入模块，而不是import，exports导出

// 改配置必须重启项目

// 接口代理的条件：当前接口（后端）的域名(指向主机)与前端的域名是一样的
// 接口代理，访问接口A，但实际上代理到访问接口B


// 这个文件是给webpack（CommonJS规范）用的，而不是给项目用的

module.exports = {

    // 关闭语法检查小驼峰命名法
    lintOnSave: false,

    // devServer:{
    //     host:'localhost',
    //     port:8082,
    //     proxy:{
    //         // 当从访问路径中拦截到 /api 接口时
    //         '/api':{
    //             // 将这个target与app.vue里的mounted里的url拼接起来
    //             // 真实地址： https://www.imooc.com/api/servicetime
    //             // 发送的请求的地址是：https://localhost:8082/api/servicetime
    //             target:'https://www.imooc.com',
    //             changeOrigin:true,
    //             // 代理接口，实际就是改路径
    //             pathRewrite:{
    //                 // 真实地址： https://www.imooc.com/activity/servicetime
    //             // 发送的请求的地址是：https://localhost:8082/activity/servicetime
    //                 // 将 /api 接口 改为 /activity 接口
    //                 '/api':'/activity'
    //             }
    //         }
    //     }
    // }

    devServer:{
        host:'localhost',
        port:8082,
        // 因为在main.js中有： axios.defaults.baseURL = '/api'
        // 所以Request URL中加入了： /api，
        /*
           又因为NavHeader.vue中有：
             this.axios.get('/products',{
                // get传参
                params:{
                    categoryID:"100012"
                }
                }).then((res)=>{
                if(res.list>6){
                    // slice，左闭右开
                    this.phoneList = res.list.slice(0,6);
                }
        });

        所以Request URL中加入了： /products?categoryID=100012
        */
        //最终的Request URL为: http://localhost:8082/api/products?categoryID=100012
        proxy:{
            // 当从访问路径中拦截到 /api 接口时
            '/api':{
                target:'http://mall-pre.springboot.cn',
                changeOrigin:true,
                // 代理接口，实际就是改路径
                pathRewrite:{
                    '/api':''
                }
            }
        }
    }
}

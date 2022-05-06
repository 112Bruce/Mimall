// node.js用module导入模块，而不是import，exports导出
// 改配置必须重启项目
// 接口代理的条件：当前接口（后端）的域名与前端的域名是一样的
// 接口代理，访问接口A，但实际上代理到访问接口B


// 这个文件是给webpack（CommonJS规范）用的，而不是给项目用的

module.exports = {
    devServer:{
        host:'localhost',
        port:8082,
        proxy:{
            // 当从访问路径中拦截到 /api 接口时
            '/api':{
                // 将这个target与app.vue里的mounted里的url拼接起来
                // 即 https://www.imooc.com/api/servicetime
                target:'https://www.imooc.com',
                changeOrigin:true,
                // 代理接口，实际就是改路径
                pathRewrite:{
                    // 将 /api 接口 改为 /activity 接口
                    // 即 https://www.imooc.com/activity/servicetime
                    '/api':'/activity'
                }
            }
        }
    }
}
let baseURL

/*
    "scripts": {
        "serve": "vue-cli-service serve --mode=development",
        "test": "vue-cli-service build --mode=test",
        "build": "vue-cli-service build --mode=production",
        "lint": "vue-cli-service lint"
    },

    接口环境设置时需要在package.json文件中设置 --mode=？？？

    --mode=里面的名字不能随便起，如果要自定义名字，比如te_st，需要三个步骤
     1、新建一个文件，命名为env.te_st，没有后缀
     2、在文件夹里写 NODE_ENV = 'te_st'
     3、switch (process.env.NODE_ENV)里的其中一个 case 为 'te_st'
*/

// 根据不同的环境输出不同的baseURL地址
// process.env 是获取当前Node.js进程中的环境变量
// 这个项目是在node.js服务器下运行的


switch (process.env.NODE_ENV) {
    case 'development':
        baseURL = 'http://dev-mall-pre.springboot.cn/api'
        break;
    case 'test':
        baseURL = 'http://test-mall-pre.springboot.cn/api'
        break;
    case 'prod':
        baseURL = 'http://mall-pre.springboot.cn/api'
        break;
    default:
        baseURL = 'http://mall-pre.springboot.cn/api'
        break;
}

export default {
    baseURL
}
// 专门定义Mock文件
import Mock from 'mockjs' 
// 为什么多了 /api ,因为main.js中有
// axios.defaults.baseURL = '/api'
Mock.mock('/api/user/login',{
  "status": 0,
  "data": {
    // 产生随机数
    "id|1-20": 12, 
    "username": "admin",
    "email": "admin@51purse.com",
    "phone": null,
    "role": 0,
    "createTime": 1479048325000,
    "updateTime": 1479048325000
  }
})
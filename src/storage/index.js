/*
    项目用的文件，服从ES6规范
*/

/*
    Storage封装，JSON封装
*/
const STORAGE_KEY = 'mall'

export default{
    // 存储值
    setItem(key,value,module_name){
        if(module_name){
        if(!this.getItem(module_name)) return
           let val = this.getItem(module_name) 
           val[key] = value
           this.setItem(module_name,val)
        }else{
            if(!this.getStorage()) return
            let val = this.getStorage()
            val[key] = value
            window.sessionStorage.setItem(STORAGE_KEY,JSON.stringify(val))
        }
    },
    // 获取某一个模块下的属性
    getItem(key, module_name){
        if(module_name){
            if(!this.getItem(module_name)) return
            let val = this.getItem(module_name)
            // val是一个对象。对象的属性的通用写法
            // val['key']
            if(val) return val[key]
        }
        if(!this.getStorage()) return
        return this.getStorage()[key]
    },
    // 获取整个数据
    getStorage(){
        return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || '{}')
    },
    // 清空某个值
    clear(key,module_name){
        let val = this.getStorage()
        if(module_name){
            if(!val[module_name])return
            delete val[module_name][key]
        }else{
            if(!val[key])return
            delete val[key]
        }
        window.sessionStorage.setItem(STORAGE_KEY,JSON.stringify(val))
    },
}
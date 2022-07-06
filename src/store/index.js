import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'

Vue.use(Vuex);

const state = {
    // 登录用户名
    username:'',
    // 购物车商品数量
    cartCount:0
};
// store首字母必须大写，否则报错
export default new Vuex.Store({
    // ES6简写，state:state => state
    state,
    mutations,
    actions
});

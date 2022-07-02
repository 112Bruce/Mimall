/*
    商城Vuex-mutations，里面要配置各种各样的方法
*/

// default后面必须加空格才能加对象
export default {
    saveUserName(state, username){
        state.username = username;
    },
    saveCartCount(state, count) {
        state.cartCount = count;
      }
}
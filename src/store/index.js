import {   createStore } from 'vuex'
export default createStore({
    state: {
        isCollapse: true,
        isLogin:false,
        token:null,
        username:null,
        is_admin:false,
        isLoginShow:false,
    },
    mutations: {
        toggleMenu(state,payload) {
            state.isCollapse = !state.isCollapse
        },
        loginSuccess(state, role){
            state.isLogin = true
            state.token = role
        },
        setUser(state, data){
            state.username = data.username
            state.is_admin = data.is_admin===1
        },
        logout(state,data){
            state.isLogin=false
            state.token=null
            state.username=null
            state.is_admin=false
        }
    },
})
<template>
  <el-header>
    <div class="l-content">
      <el-button size="small" plain @click="SwitchMenu">
        <el-icon :size="20">
          <Menu />
        </el-icon>
      </el-button>
      <h3>首页</h3>
    </div>
    <div class="r-content">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img class="user" :src="GetImageUrl()"  alt=""/>
        </span>
        <template #dropdown>
          <div v-show="!isShow">
            <el-dropdown-menu v-show="isAdmin">
              <el-dropdown-item @click="toUserDetail">个人中心</el-dropdown-item>
              <el-dropdown-item @click="router.push('/admin')">后台管理</el-dropdown-item>
              <el-dropdown-item @click="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
            <el-dropdown-menu v-show="!isAdmin">
              <el-dropdown-item @click="toUserDetail">个人中心</el-dropdown-item>
              <el-dropdown-item @click="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </div>
          <el-dropdown-menu v-show="isShow">
            <el-dropdown-item @click="isLoginShow = true">登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <el-dialog
        v-model="isLoginShow"
        title="用户登录/注册"
        width="500px"
        :before-close="handleClose"
    >
      <LoginPage  @loginSucc="loginSuccess"/>
    </el-dialog>

  </el-header>
</template>


<script lang="ts" setup>
import {Menu, Switch, Upload,Plus} from '@element-plus/icons-vue'
import LoginPage from "../views/login.vue";
import {ref} from "vue";
import {useStore} from 'vuex'
import {useRouter} from "vue-router";
const isShow = ref(localStorage.getItem('token') === null)
const isLoginShow = ref(false)
const store = useStore()
const UploadAvatar = ref(false)
const imageUrl = ref('')
const router = useRouter()
const isAdmin = ref(localStorage.getItem('is_admin') === '1')
const GetImageUrl = () =>{
  const identity = localStorage.getItem('identity')
  console.log(new URL(`../assets/profile/${identity}.jpg`, import.meta.url).href)
  if (identity === null) return new URL(`../assets/images/logo.png`, import.meta.url).href
  return new URL(`../assets/profile/${identity}.jpg`, import.meta.url).href
}
const handleClose = () => {
  isLoginShow.value = false
}
const toUserDetail = () => {
  router.push('/user')
}
const loginSuccess = () => {
  isShow.value = false
  isLoginShow.value = false
  console.log(isShow.value)
}
const logout = () => {
  localStorage.clear()
  store.commit('logout')
  location.reload();
  isShow.value = true
}
let SwitchMenu = () => {
  store.commit('toggleMenu')
}
</script>
<style scoped>
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
.r-content {
  .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
.l-content {
  display: flex;
  align-items: center;
  .el-button{
    margin-right: 20px;
  }
}
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
</style>
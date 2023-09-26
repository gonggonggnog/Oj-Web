<template>
  <div class="common-layout">
    <el-container>
      <CommonAside />
      <el-container>
        <el-header>
          <CommonHeader />
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import CommonHeader from "../components/CommonHeader.vue";
import CommonAside from "../components/CommonAside.vue";
export default defineComponent({
  name: 'App',
  components: {
    CommonHeader,
    CommonAside
  }
})
</script>
<style>
.common-layout {
  height: 100%;
  width: 100%;
}
el-header{
  height: 100%;
  width: 100%;
  align-items: baseline;
}
.el-container{
  height: 100%;
  width: 100%;
}
.el-main{
  height: 100%;
  width: 100%;
  padding: 0;
  background-color: #F4F4F4;
}
</style>

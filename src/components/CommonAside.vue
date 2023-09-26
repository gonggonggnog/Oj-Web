<template>
  <el-aside :width="$store.state.isCollapse ? '180px' : '64px'">
    <div style="display: flex; margin-left: 12px">
      <img src="../assets/images/logo.png" class="logo" alt=""/>
      &nbsp;
      <h1 class="centered-text" v-show="$store.state.isCollapse">Easy-Oj</h1>
    </div>
      <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="!$store.state.isCollapse"
          :collapse-transition="false"
      >
        <el-menu-item :index="item.path"
                      v-for="item in noChildren()"
                      :key="item.path"
                      @click="selectMenu(item)">
          <component class="icons" :is="item.icon"></component>
          <span>{{item.label}}</span>
        </el-menu-item>
        <el-sub-menu :index="item.path"
                     v-for="item in hasChildren()"
                     :key="item.path">
          <template #title>
            <el-icon><More /></el-icon>
            <span>{{ item.label }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item :index="child.path"
                          v-for="child in item.children"
                          :key="child.path"
                          @click="selectMenu(child)">
              <component class="icons" :is="child.icon"></component>
              <span>{{ child.label }}</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
      </el-menu>
  </el-aside>
</template>

<script lang="ts" setup>
import {useStore} from "vuex"
import {useRouter} from "vue-router";
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
const router = useRouter()
const store = useStore()
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const list = [
  {
    path: "/problem",
    name: "problem",
    label: "问题列表",
    icon: "grid",
  },
  {
    path: "/submit-list",
    name: "submit-list",
    label: "提交列表",
    icon: "promotion",
  },
  {
    path: "/rank-list",
    name: "rank-list",
    label: "排行榜",
    icon: "connection",
  },
  {
    label: "其他",
    icon: "location",
    path: "/other",
    children: [
      {
        path: "/about",
        name: "about",
        label: "关于",
        icon: "setting",
        url: "Other/PageOne",
      },
    ],
  },
];
const noChildren = () => {
  return list.filter((item) => !item.children);
};

const hasChildren = () => {
  return list.filter((item) => item.children);
};
const selectMenu = (item: any) => {
  console.log(item);
  router.push({
    name: item.name,
  })
};
</script>
<style>
  .icons {
    width: 18px;
    height: 18px;
  }
  .logo{
    width: 40px;
    height: 40px;
    align-self: center;
  }
  .centered-text {
    font-family:"华文彩云";/*设置字体*/
    font-size:20px; /*设置字体大小*/
    font-weight:bolder; /*设置字体粗细*/
    -webkit-text-stroke:1px #6654FE;        /*文字描边*/
    -webkit-text-fill-color:transparent;    /*设置文字的填充颜色*/
  }
</style>
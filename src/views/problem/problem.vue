<template>
  <div class="problem-list">
    <el-button type="primary" class="search" @click="getCategoryList" circle>
      <el-icon>
        <Search/>
      </el-icon>
    </el-button>

    <el-drawer v-model="drawer" title="I am the title" :with-header="false">
      <el-input
          v-model="keyword"
          clearable
          class="inline-input w-50"
          placeholder="Please Input a keyword"
      />
      <el-button type="primary" @click="getProblemList">搜索</el-button>
      <div class="m-4">
        <p>分类选择</p>
        <el-select
            v-model="category_identity"
            placeholder="Select"
            style="width: 240px"
            @change="getProblemList"
        >
          <el-option
              v-for="item in categories"
              :key="item.name"
              :label="item.name"
              :value="item.identity"
          />
        </el-select>
      </div>
    </el-drawer>
    <el-scrollbar class="scrollbar" v-loading="loading"
                  element-loading-text="Loading..."
                  :element-loading-spinner="svg"
                  element-loading-svg-view-box="-10, -10, 50, 50">
      <div class="list">
        <div class="item" v-for="item in problemList" :key="item.id">
          <el-card shadow="hover" body-class="problemCard" >
          <div @click="toDetail(item)">
            <div class="title">
              <b  >{{ item.title }}</b>
              <div class="sort">
              <span v-for="mi in item.problem_categories" :key="mi.id">
                <el-tag class="ml-2" type="danger" v-if="mi.category_basic">{{ mi.category_basic.name }}</el-tag>
              </span>
              </div>
            </div>
            <div class="msg">
              <span>提交人数：{{ item.submit_num }}</span>
              <span>通过人数：{{ item.pass_num }}</span>
            </div>
          </div>

          <div class="edit">
            <el-icon @click="toDetail(item)" title="详情"><edit /></el-icon>
            <el-icon title="提交列表" @click="toSubList(item)" style="margin-left: 40px"><list /></el-icon>
          </div>
          </el-card>
        </div>
      </div>
    </el-scrollbar>
    <div class="demo-pagination-block">
      <el-pagination
          v-model:current-page="currentPage1"
          layout=" prev, pager, next"
          :total='count'
          @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<style scoped>
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);

}

.demo-pagination-block {
  display: flex;
  width: 100%;
  margin-bottom: 0px;
  justify-content: center;
}

.problem-list {
  width: 98%;
  height: 97%;
  background: white;
  margin-left: 12px;
  margin-top: 10px;
}

.el-scrollbar {
  height: 94%;
}

.scrollbar {
  position: relative;
}

.search {
  right: 100px;
  bottom: 100px;
  height: 40px;
  width: 40px;
  position: absolute;
  z-index: 2;

  .ques-list {
    height: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }
}
  .list{
    flex: 1;
    overflow: auto;
  }

  .item {
    padding: 20px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .edit {
      width: 80%;
      margin-left: 1150px;
      justify-content: space-between;
      color: #13b6f9;
      cursor: pointer;
    }
    .title {
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      font-size: 18px;
      b{
        margin-bottom: 40px;
        cursor: pointer;
      }
      span {
        background-color: #d3ebff;
        font-size: 12px;
        margin: 0 10px;
        padding: 4px;
        border-radius: 5px;
        border: 1px solid #62a9ff;
        color: #62a9ff;
      }
    }
    .msg {
      font-size: 14px;
      color: #999;
      span {
        margin-right: 20px;
      }
    }
  }
    span {
      color: #13b6f9;
      margin-right: 20px;
      cursor: pointer;
      &.act {
        color: black;
      }
    }
.problemCard {
  width: 600px;
}
.el-card{
  width: 1800px;
}
.sort{
  margin-left: 80px;
}
.example-showcase .el-loading-mask {
  z-index: 9;
}
</style>
<script lang="ts" setup>
import {handleCurrentChange} from "element-plus/es/components/tree/src/model/util";
import {defineComponent, onMounted, ref} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";
const router = useRouter()
import api from '../../api/api.js'
import {ElMessage} from "element-plus";
const drawer = ref(false)
const loading = ref(true)
const currentPage = ref(1)
const pageSize = ref(20)
axios.defaults.baseURL = 'http://127.0.0.1:8988';
let problemList = ref([])
const keyword = ref('')
const category_identity = ref('')
const categories = ref([])
const count = ref(0)
const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `
const getProblemList = async () => {
  loading.value = true
  drawer.value = false
  api.getProblemList({
      page: currentPage.value,
      size: pageSize.value,
      category_identity: category_identity.value,
      keyword: keyword.value
  }).then(res => {
    problemList.value = res.data.list
    loading.value = false
    count.value = res.data.count
  }).catch(error => {
    console.error('请求出错：', error);
  });
}
const getCategoryList = async () => {
  drawer.value = true
  api.getCategoriesList({
    page: 1,
    size: 100
  }).then(res => {
    categories.value = res.data.list
    console.log(categories.value)
  }).catch(error => {
    console.error('请求出错：', error);
  });
}
const toDetail = (item) => {
  router.push({
    path: '/problem-detail',
    query: {
      problem_identity: item.identity
    }
  })
}
const toSubList = (item) => {
  console.log(item)
  router.push({
    path: '/submit-list',
    query: {
      problem_identity: item.identity
    }
  })
}
const handleCurrentChange = (val) => {
  currentPage.value = val
  getProblemList()
}
onMounted(getProblemList)
</script>
<template>
  <div class="submit-list">

    <div class="list" v-loading="loading"
         element-loading-text="Loading..."
         :element-loading-spinner="svg"
         element-loading-svg-view-box="-10, -10, 50, 50">
      <div class="submit-container">
        <div class="msg title">
          <span>问题</span><span>用户</span><span>提交时间</span>
          <span style="display:flex;white-space:nowrap;align-items:center">状态：

                    <el-select v-model="myStatus" clearable @change="getSubmitList">
                        <el-option :value="i" v-for="(mi,i) in status" :key="mi" :label="mi">{{ mi }}</el-option>
                    </el-select>
                </span>
        </div>
        <el-scrollbar class="scrollbar">
        <div class="msg" v-for="item in submitList" :key="item.id">
          <span @click="toProblem(item)" class="name">{{ item.problem_basic.title }}</span>
          <span v-if="item.user_basic">{{ item.user_basic.name }}</span>
          <span v-if="item.user_basic">{{ formattedTime(item.CreatedAt) }}</span>
          <span><el-tag> {{status[item.status] }}</el-tag></span>
        </div>
        </el-scrollbar>

        <div class="pagination-block">
          <el-pagination
              v-model:current-page="currentPage1"
              :page-size="pageSize"
              layout=" prev, pager, next"
              :total="total"
              @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.submit-list {
  height: 99%;
  width: 99%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

.list {
  flex: 1;
  overflow: auto;
}


.item {
  // padding: 20px;

  display: flex;
  justify-content: space-between;
  align-items: center;


}
.pagination-block{
  display: flex;
  width: 100%;
  justify-content: center;
  margin-bottom: 2px;
}
.submit-container {
  width: 98%;
  height: 99%;
  display: flex;
  margin-left: 12px;
  margin-top: 8px;
  flex-direction: column;
  justify-content: space-between;
  background: white;
}

.msg {
  font-size: 14px;
  padding: 20px;
  display: flex;
  color: #999;
  border-bottom: 1px solid #eee;

  span:nth-child(1) {
    width: 50%;
  }

  span:nth-child(2) {
    width: 10%;
  }

  span:nth-child(3) {
    width: 20%;
  }

  span:nth-child(4) {
    width: 20%;
  }

  &.title {
    border-bottom: 1px solid #0087bf;
    border-top: 1px solid #0087bf;
    // color: white;
    align-items: center;
  }
  .demo-pagination-block {
    display: flex;
    width: 100%;
    margin-left: 200px;
    justify-content: center;
  }
  .name {
    color: skyblue;
    cursor: pointer;
  }
}
</style>
<script setup>
import {ref, onMounted, reactive, toRefs} from 'vue'
import {useRouter} from "vue-router";
const router = useRouter()
import api from '../../api/api.js'
import moment from "moment/moment.js";
let submitList = ref([])
const loading = ref(false)
const currentPage = ref(1)
const pageSize = ref(20)
const total = ref(0)
const myStatus = ref('')
const problem_identity = ref('')
const user_identity = ref('')
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
//-1为等待判断，1为答案正确，2为答案错误，3为超时，4为超内存
const status = ['全部', '答案正确', '答案错误', '超时', '超内存', '运行错误']
const getSubmitList = async () => {
  loading.value = true
  api.getSubmitList({
      page: currentPage.value,
      size: pageSize.value,
      status: myStatus.value,
      problem_identity : problem_identity.value,
      user_identity : user_identity.value
  }).then((res) => {
    console.log(res.data.list)
    submitList.value = res.data.list
    loading.value = false
    total.value = res.data.count
  }).catch(error => {
    console.error('请求出错：', error);
  });
}
const handleCurrentChange = (val) => {
  currentPage.value = val
  getSubmitList()
}
const toProblem = (item) => {
  router.push({
    path: '/problem-detail',
    query: {
      problem_identity: item.problem_identity
    }
  })
}
const formattedTime = (time) => {
  // 使用toLocaleString()方法将日期时间格式化为本地时间字符串
  return moment(time).format('YYYY-MM-DD HH:mm:ss')
}
onMounted(getSubmitList)
</script>
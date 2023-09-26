<template>
  <div class="rank-list">
    <el-scrollbar class="scrollbar" v-loading="loading"
                  element-loading-text="Loading..."
                  :element-loading-spinner="svg"
                  element-loading-svg-view-box="-10, -10, 50, 50">
      <div class="block" v-for="(item , index) in rankList" :key="item.id">
        <el-card shadow="hover" body-class="RankCard">
          <div style="display: inline-flex">
            {{ index + 1 }}.
            <el-avatar  style="margin-left: 10px"
                src="https://api.t1qq.com/api/tool/sjtx?key=rfso2kLbG5iQN33wE6k36GCOEI"
            />
            <b>&nbsp;&nbsp;&nbsp;{{ item.name }}</b>
          </div>
          <div class="RankMsg">
            <el-tag >提交数：{{ item.submit_num }};</el-tag> &nbsp;
            <el-tag >通过数：{{ item.pass_num }}</el-tag>
          </div>
          <div>
            <el-tag class="ml-2" type="info" style="margin-right: 10px">{{ item.email }}</el-tag>
          </div>
        </el-card>
      </div>
    </el-scrollbar>
  </div>

</template>
<script setup>
import {ref, onMounted} from 'vue'
import api from "../../api/api.js";
import {navy as currentPage} from "mockjs";

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
const rankList = ref([]);
const loading = ref(false);
const count = ref(0);
const getRankList = () => {
  loading.value = true;
  api.getRankList().then(res => {
    rankList.value = res.data.list;
    count.value = res.data.count;
    console.log(rankList.value);
  }).catch(err => {
    console.log(err)
  })
  loading.value = false;
}
const handleCurrentChange = (val) => {
  currentPage.value = val
  getRankList()
}
onMounted((getRankList))
</script>
<style>
.rank-list {
  width: 98%;
  height: 97%;
  background: white;
  margin-left: 12px;
  margin-top: 10px;
}

.RankMsg {
  font-size: 10px;
  color: #13b6f9;
  width: 100%;
  text-align: center;
}

.RankCard {
  display: inline-flex;
}

.el-card__body {
  width: 1300px;
  padding: 20px;
}

.block {
  display: flex;
  justify-content: center;
}

.col-span {
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
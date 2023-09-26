<template xmlns="http://www.w3.org/1999/html">
  <div style="display: inline-flex" v-loading="loading">
    <div class="l-problemDetail">
      <el-card style="width: 90%;height: 90%;margin-left: 30px; margin-top: 30px">
        <el-row>
          <el-col :span="24"><h1 style="text-align: center">{{ title }}</h1></el-col>
        </el-row>
        <el-row>
          <el-col :span="24"><h4>{{ content }}</h4></el-col>
        </el-row>
        <el-scrollbar>
          <el-collapse height="400px">
            <el-collapse-item v-for="(item, index) in testCase" :title="handleIndex(index)">
              <h4>测试样例{{ index + 1 }}：</h4>
              <el-card shadow="never" body-class="TestCase"> input:{{ item.input }}</el-card>
              <br>
              <el-card shadow="never" body-class="TestCase"> input:{{ item.output }}</el-card>
            </el-collapse-item>
          </el-collapse>
        </el-scrollbar>
      </el-card>

    </div>
    <div class="r-problemDetail">
      <div class="select">
        <el-select v-model='language' clearable>
          <el-option value="go">go</el-option>
          <el-option value="g++">g++</el-option>
        </el-select>
      </div>
      <div class="box">
        <codemirror
            v-model="code"
            placeholder="Code goes here..."
            :style="{ height: '340px'}"
            :indent-with-tab="true"
            :tab-size="2"
            :autocapitalize="true"
            :extensions="extensions"
        />
      </div>
      <div class="submit">
        <el-button type="primary" @click="submitCode" round>提交</el-button>
      </div>
      <div class="sub-box">
        编译结果： {{ msg }}
      </div>
    </div>
  </div>
</template>
<script setup>
import {oneDark} from '@codemirror/theme-one-dark'
import {nextTick, ref, onBeforeUnmount, onMounted} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import api from "../../api/api.js";
import {ElMessage} from "element-plus";

const router = useRouter();
const route = useRoute();
const msg = ref('');
const title = ref('');
const content = ref('');
const submit_num = ref(0);
const pass_num = ref(0);
const create_time = ref(0);
const max_runtime = ref(0);
const max_memory = ref(0);
const problem_identity = ref(route.query.problem_identity);
const extensions = [oneDark];
const language = ref('go');
const testCase = ref([]);
const code = ref('');
const loading = ref(false);
const submitCode = () => {
  loading.value = true;
  api.submit({
    problem_identity: problem_identity.value,
  },{
    code: code.value
  }).then(res => {
    msg.value = res.data.msg;
    loading.value = false;
    if(res.data === 'unauthorized Authorization') {
      ElMessage.error("请先登录")
    }else {
      ElMessage.info(res.data.data)
    }
  }).catch(err => {
    console.log(err)
  })
}
const getProblemDetail = () => {
  api.getProblemDetail({
    identity: problem_identity.value
  }).then(res => {
    title.value = res.data.title;
    content.value = res.data.content;
    submit_num.value = res.data.submit_num;
    pass_num.value = res.data.pass_num;
    create_time.value = res.data.CreatedAt;
    max_runtime.value = res.data.max_runtime;
    max_memory.value = res.data.max_mem;
    testCase.value = res.data.test_case;
    console.log(testCase.value);
  }).catch(err => {
    console.log(err)
  })
}
const handleIndex = (index) => {
  return `测试样例${index + 1}`
}
onMounted((getProblemDetail))
</script>
<style>
.TestCase {
  background-color: #F7F7F8;
  height: 12px;
  text-align-all: start;
  text-align: -moz-center;
}

.r-problemDetail {
  margin-left: 10px;
  width: 660px;
  background-color: white;
  margin-top: 10px;
  margin-bottom: 10px;
  height: 615px;
}

.sub-box {
  border-radius: 10px;
  background-color: #999;
  padding: 10px;
  box-sizing: border-box;
  flex: 1;
  color: white;
  height: 150px;
  width: 95%;
  margin-left: 15px;
}

.submit {
  text-align: center;
  padding: 10px 0;
  height: auto;
}

.select {
  padding: 10px 0;
}

.box {
  width: 95%;
  margin-left: 15px;
}

.l-problemDetail {
  background-color: white;
  height: 615px;
  width: 660px;
  margin-top: 10px;
  margin-left: 10px;
}
</style>
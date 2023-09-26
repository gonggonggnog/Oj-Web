<template>
  <el-form>
    <el-form-item label="问题名称" label-width="120px" required="required">
      <el-input v-model="form.title"></el-input>
    </el-form-item>
    <el-form-item label="内容" label-width="120px">
      <el-input v-model="form.content" :autosize="{ minRows: 2, maxRows: 4 }"
                type="textarea"></el-input>
    </el-form-item>
    <el-row>
      <el-form-item label="最大运行时间" label-width="120px" required="required">
        <el-input-number v-model="form.max_runtime" :min="1" :max="10000"/>
      </el-form-item>
      <el-form-item label="最大运行内存" label-width="120px" required="required" style="margin-left: 40px">
        <el-input-number v-model="form.max_mem" :min="1" :max="10000"/>
      </el-form-item>
      <el-form-item label="分类" label-width="120px" required="required">
        <el-select
            v-model="category_ids"
            placeholder="Select"
            multiple
        >
          <el-option
              v-for="item in categories"
              :key="item.name"
              :label="item.name"
              :value="item.ID"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="测试案例" prop="test_cases" required>
        <el-form-item
            label-width="0"
            v-for="(mi, i) in test_cases"
            :key="i"
        >
          <el-row :gutter="20">
            <el-col :span="4" style="text-align: right">输入：</el-col>
            <el-col :span="6">
              <el-input type="textarea" v-model="mi.input" rows="4" cols="40"/>
            </el-col>
            <el-col :span="4" style="text-align: right">输出：</el-col>
            <el-col :span="6">
              <el-input type="textarea" v-model="mi.output" rows="4" cols="40"/>
            </el-col>
            <el-col :span="4">
              <el-icon @click="addCase">
                <Circle-plus/>
              </el-icon>
              <el-icon @click="removeCase(i)">
                <Remove/>
              </el-icon
              >
            </el-col>
          </el-row>
        </el-form-item>
      </el-form-item>
      <el-form-item style="margin-left: 40%">
        <el-button type="primary" @click="AddProblem">提交</el-button>
      </el-form-item>
    </el-row>
  </el-form>
</template>
<script setup>
import {ref, defineProps} from 'vue'
import api from "../../api/api.js";
import {ElMessage} from "element-plus";
import {navy as dialogFormVisible} from "mockjs";
import {onMounted} from "vue";

const categories = ref([])
const category_ids = ref([])
const form = ref({
  title: '',
  content: '',
  max_runtime: 0,
  max_mem: 0,
})
const props = defineProps({
  identity: String,
})
const test_cases = ref([{input: "", output: ""}])
const formData = new FormData();
onMounted(() => {
  api.getCategoriesList({
    page: 1,
    size: 100
  }).then(res => {
    categories.value = res.data.list
    console.log(categories.value)
  }).catch(error => {
    console.error('请求出错：', error);
  });
  api.getProblemDetail({
    identity: props.identity
  }).then(res => {
    console.log(res.data)
    form.value.title = res.data.title
    form.value.content = res.data.content
    form.value.max_runtime = res.data.max_runtime
    form.value.max_mem = res.data.max_mem
  }).catch(err => {
    console.log(err)
    return
  })
  api.DeleteProblem({
    identity: props.identity
  }).then(res => {
    console.log(res.data)
  }).catch(err => {
    console.log(err)
  })
})
const addCase = () => {
  test_cases.value.push({input: "", output: ""})
}
const removeCase = (index) => {
  test_cases.value.splice(index, 1)
}
const AddProblem = () => {
  console.log(test_cases.value.length)
  for (let i = 0; i < test_cases.value.length; i++) {
    formData.append(`test_cases`, JSON.stringify(test_cases.value[i]))
  }
  api.AddProblem({
    title: form.value.title,
    content: form.value.content,
    max_runtime: form.value.max_runtime,
    max_mem: form.value.max_mem,
    category_ids: category_ids.value,
    test_case: formData.getAll('test_cases')
    //[{"input":"1 2\n","output":"3\n"} {"input":"1 3\n","output":"3\n"}]
  }).then(res => {
    console.log(res.data)
    ElMessage.success(res.data)
    if (res.code === 200) {
      location.reload();
    }
  }).catch(err => {
    console.log(err)
  })
}
</script>
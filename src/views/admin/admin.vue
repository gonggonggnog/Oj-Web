<template>
  <div style="width: 98%;height: 625px;background-color: white;margin-left: 13px;margin-top: 10px;">
    <el-col :gutter="10" style="display: flex;">
      <div style="width: 23%;height: 80%;">
        <el-scrollbar height="550px">
          <div v-for="item in categoriesList" :key="item.ID" style="margin-top: 10px;z-index: 1">
            <el-card style="width: 100%;"><b>{{ item.name }}</b>
              <el-button style="margin-left: 180px;border:none;height: 30px;width: 30px"
                         @click="DeleteCategory(item.identity)" circle>
                <el-icon>
                  <Delete/>
                </el-icon>
              </el-button>
            </el-card>
          </div>
        </el-scrollbar>
        <el-button class="add-category" @click="AddCategoryShow" circle>
          <el-icon>
            <CirclePlus/>
          </el-icon>
        </el-button>
      </div>
      <el-divider direction="vertical" class="el-divider1" border-style="dashed"></el-divider>
      <div style="width: 80%;height: 100%;">
        <el-scrollbar height="550px">
          <el-table :data="ProblemList" stripe style="width: 100%" height="100%">
            <el-table-column prop="ID" label="问题编号" width="250"/>
            <el-table-column prop="title" label="问题名称" width="250"/>
            <el-table-column label="分类" width="250">
              <template v-slot="scope">
                <el-row>
                  <div v-for="Category in scope.row.problem_categories"
                       style="margin-top: 10px;z-index: 9;">
                    <el-tag style="margin-left: 10px">
                      {{ Category.category_basic.name }}
                    </el-tag>
                  </div>
                </el-row>
              </template>
            </el-table-column>
            <el-table-column width="250">
              <template v-slot="scope">
              <el-button type="primary" @click="EditProblem(scope.row.identity)" circle>
                <el-icon>
                  <Edit/>
                </el-icon>
              </el-button>
                <el-button type="primary" @click="DeleteProblem(scope.row.identity)" circle>
                  <el-icon>
                    <Delete/>
                  </el-icon>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-scrollbar>
        <el-button class="add-category" @click="AddProblemVisible = true" circle>
          <el-icon>
            <CirclePlus/>
          </el-icon>
        </el-button>
      </div>
    </el-col>
    <el-dialog v-model="dialogFormVisible" title="新增分类">
      <el-form :model="form">
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"/>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="AddCategory">
          Confirm
        </el-button>
      </span>
      </template>
    </el-dialog>
    <el-dialog
        v-model="AddProblemVisible"
        title="新增问题"
        width="700px"
        :before-close="handleClose"
    >
      <AddPage :identity="curIdentity"/>
    </el-dialog>
  </div>
</template>
<script setup>
import {CaretTop, Delete, Edit, Warning} from "@element-plus/icons-vue";
import {onMounted, ref, reactive} from "vue";
import api from "../../api/api.js";
import {ElMessage} from "element-plus";
import AddPage from "./add.vue";

const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
const ProblemList = ref([])
const categoriesList = ref([])
const ProblemKeyword = ref('')
const CategoryKeyword = ref('')
const AddProblemVisible = ref(false)
const curIdentity = ref('')
const form = reactive({
  name: '',
})
const EditProblem = (identity) => {
  curIdentity.value = identity
  AddProblemVisible.value = true
}
const handleClose = () => {
  AddProblemVisible.value = false
}
const AddCategoryShow = () => {
  dialogFormVisible.value = true
}
const DeleteProblem = (identity) => {
  api.DeleteProblem({
    identity: identity
  }).then(res => {
    console.log(res.data)
    ElMessage.info(res.data)
    //刷新页面
    if (res.code === 200) {
      location.reload();
    }
  }).catch(err => {
    console.log(err)
  })
}
const AddCategory = () => {
  api.AddCategory({
    name: form.name
  }).then(res => {
    console.log(res.data)
    ElMessage.info(res.data)
    dialogFormVisible.value = false
    //刷新页面
    location.reload();
  }).catch(err => {
    console.log(err)
  })
}
const DeleteCategory = (identity) => {
  api.DeleteCategory({
    identity: identity
  }).then(res => {
    console.log(res.data)
    ElMessage.info(res.data)
    //刷新页面
    if (res.code === 200) {
      location.reload();
    }
  }).catch(err => {
    console.log(err)
  })
}
onMounted(() => {
  api.getProblemList({
    keyword: ProblemKeyword.value
  }).then(res => {
    ProblemList.value = res.data.list
    console.log(res.data)
  }).catch(err => {
    console.log(err)
  })
  api.getCategoriesList({
    keyword: CategoryKeyword.value
  }).then(res => {
    categoriesList.value = res.data.list
    console.log(res.data)
  }).catch(err => {
    console.log(err)
  })
})
</script>
<style>
.add-category {
  margin-top: 20px;
  margin-left: 80%;
  border: none;
  height: 40px;
  width: 40px;
  background-color: #13b6f9;
  z-index: 9;
}

.el-divider1 {
  display: inline-block;
  width: 1px;
  height: 39em;
  margin: 0 8px;
  vertical-align: middle;
  position: relative;
  border-left: 1px var(--el-border-color) var(--el-border-style);
}
</style>
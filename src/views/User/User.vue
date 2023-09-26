<template>
  <div style="width: 98%;height: 97%;background-color: white;margin-left: 13px;margin-top: 10px;">
    <el-col :gutter="10" style="display: flex;">
      <div style="width: 25%;height: 100%;">
        <el-row>
          <img src="../../assets/profile/d14d617b-f5dc-4646-818e-2c7ac94cea3d.jpg" alt="/" class="profile-image"/>
          <el-button style="border: none" :icon="Edit" @click="UploadAvatar = true"/>
          <el-descriptions
              style="margin-left: 30px;margin-top: 30%"
              border="true"
              :column="2"
              :size="size"
              direction="vertical"
          >
            <el-descriptions-item label="Username">{{ userInfo.name }}</el-descriptions-item>
            <el-descriptions-item label="Telephone">{{ userInfo.phone }}</el-descriptions-item>
            <el-descriptions-item label="Remarks">
              <el-tag size="small">School</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="Email">{{ userInfo.email }}</el-descriptions-item>
          </el-descriptions>
        </el-row>
      </div>
      <el-divider direction="vertical" class="el-divider1" border-style="dashed"></el-divider>
      <div style="width: 80%;height: 100%;">
          <el-table :data="submitList" stripe style="width: 100%" height="450">
            <el-table-column prop="problem_basic.ID" label="问题编号" width="180"/>
            <el-table-column prop="problem_basic.title" label="问题名称" width="180"/>
            <el-table-column  label="提交时间">
              <template #default="{row}">
                <span>{{ formattedTime(row.CreatedAt) }}</span>
              </template>
            </el-table-column>
            <el-table-column label="状态" width="180">
              <template #default="{row}">
                <el-tag v-if="row.status === 1" type="success">Accepted</el-tag>
                <el-tag v-else-if="row.status === 2" type="warning">Wrong Answer</el-tag>
                <el-tag v-else-if="row.status === 3" type="warning">Time Limit Exceeded</el-tag>
                <el-tag v-else-if="row.status === 4" type="warning">Memory Limit Exceeded</el-tag>
                <el-tag v-else-if="row.status === 5" type="warning">Compile Error</el-tag>

              </template>
            </el-table-column>
          </el-table>
        <el-row>
          <el-col :span="8" style="margin-left: 20%">
            <div class="statistic-card">
              <el-statistic :value="userInfo.submit_num">
                <template #title>
                  <div style="display: inline-flex; align-items: center">
                    Total Submit Number
                    <el-tooltip
                        effect="dark"
                        content="Number of submit time"
                        placement="top"
                    >
                      <el-icon style="margin-left: 4px" :size="12">
                        <Warning/>
                      </el-icon>
                    </el-tooltip>
                  </div>
                </template>
              </el-statistic>
              <div class="statistic-footer">
                <div class="footer-item">
                  <span>than yesterday</span>
                  <span class="green">
              40%
              <el-icon>
                <CaretTop/>
              </el-icon>
            </span>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="statistic-card">
              <el-statistic :value="userInfo.pass_num">
                <template #title>
                  <div style="display: inline-flex; align-items: center">
                    Total Pass Number
                    <el-tooltip
                        effect="dark"
                        content="Number of pass time"
                        placement="top"
                    >
                      <el-icon style="margin-left: 4px" :size="12">
                        <Warning/>
                      </el-icon>
                    </el-tooltip>
                  </div>
                </template>
              </el-statistic>
              <div class="statistic-footer">
                <div class="footer-item">
                  <span>than yesterday</span>
                  <span class="green">
              24%
              <el-icon>
                <CaretTop/>
              </el-icon>
            </span>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-col>
    <el-dialog
        v-model="UploadAvatar"
        title="上传头像"
        width="500px"
        :before-close="handleClose">
      <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          accept=".jpg,.png"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar" alt="">
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
    </el-dialog>
  </div>
</template>
<script setup>
import {onMounted, ref} from 'vue'
import api from '../../api/api.js'
import {Edit, Plus} from "@element-plus/icons-vue";
import {
  ArrowRight,
  CaretBottom,
  CaretTop,
  Warning,
} from '@element-plus/icons-vue'
import moment from 'moment'
import {ElMessage} from "element-plus";
const userInfo = ref({})
const submitList = ref([])
const size = ref('mini')
const UploadAvatar = ref(false)
const imageUrl = ref('')
const handleAvatarSuccess = (res, file) =>{
  imageUrl.value = URL.createObjectURL(file.raw)
}
const beforeAvatarUpload=(file)=> {
  //在头像上传之前需要做的判断，如判断文件格式
  const isJPG = file.type === 'image/jpeg';
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isJPG) {
    ElMessage.error('上传头像图片只能是 JPG 格式!');
  }
  if (!isLt2M) {
    ElMessage.error('上传头像图片大小不能超过 2MB!');
  }
  return isJPG && isLt2M;
}
onMounted(() => {
  api.getUserDetail({
    identity: localStorage.getItem('identity')
  }).then(res => {
    userInfo.value = res.data
  }).catch(err => {
    console.log(err)
  })
  api.getSubmitList({
    user_identity: localStorage.getItem('identity')
  }).then(res => {
    submitList.value = res.data.list
    console.log(submitList.value)
  }).catch(err => {
    console.log(err)
  })
})
const uploadAvatar = () => {
  console.log('upload')
}
const formattedTime = (time) => {
  // 使用toLocaleString()方法将日期时间格式化为本地时间字符串
  return moment(time).format('YYYY-MM-DD HH:mm:ss')
}

</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
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

.profile-image {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin-top: 20px;
  margin-left: 20px;
}

:global(h2#card-usage ~ .example .example-showcase) {
  background-color: var(--el-fill-color) !important;
}

.el-statistic {
  --el-statistic-content-font-size: 28px;
}

.statistic-card {
  height: 100%;
  padding: 20px;
  border-radius: 4px;
  background-color: var(--el-bg-color-overlay);
}

.statistic-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  font-size: 12px;
  color: var(--el-text-color-regular);
  margin-top: 16px;
}

.statistic-footer .footer-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.statistic-footer .footer-item span:last-child {
  display: inline-flex;
  align-items: center;
  margin-left: 4px;
}

.green {
  color: var(--el-color-success);
}

.red {
  color: var(--el-color-error);
}
</style>
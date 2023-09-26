<template>
  <div class="login-page">
    <el-tabs
        v-model="activeName"
        type="card"
        class="demo-tabs"
        @tab-click="handleClick"
    >
      <el-tab-pane label="登录" name="first">
        <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            :rules="rules"
            label-width="80px"
            class="login-form"
        >
          <el-form-item label="账户" prop="username">
            <el-input v-model="ruleForm.username"/>
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password" show-password/>
          </el-form-item>
          <div style="text-align: center">
            <el-button type="primary" @click="submitForm(ruleFormRef)"
            >登录
            </el-button
            >
          </div>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="注册" name="second">

        <el-form
            ref="registFormRef"
            :model="registForm"
            :rules="rules"
            label-width="80px"
            class="login-form"
        >
          <el-form-item label="账户" prop="name">
            <el-input v-model="registForm.name"/>
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input v-model="registForm.password" show-password/>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="registForm.email"/>
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-input v-model="registForm.code"/>
              </el-col>
              <el-col :span="12" style="text-align:right;">
                <el-button disabled v-if="remainTime>0&&remainTime<60">{{ remainTime }}秒</el-button>
                <el-button @click="sendCode" v-else type="primary">发送验证码</el-button>
              </el-col>
            </el-row>


          </el-form-item>

          <div style="text-align: center">
            <el-button type="primary" @click="subRegister(registFormRef)"
            >注册
            </el-button
            >
          </div>
        </el-form>
      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import {reactive, ref,provide} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import type {FormInstance, TabsPaneContext} from "element-plus";
import {ElMessage} from "element-plus"
import api from '../api/api.js'

const activeName = ref("first");

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
const store = useStore();
const ruleFormRef = ref<FormInstance>();
const registFormRef = ref<FormInstance>()
const remainTime = ref(60)
const emits = defineEmits(["loginSucc"]);
const ruleForm = reactive({
  username: "",
  password: "",
});
const registForm = reactive({
  name: "",
  password: "",
  email: '',
  code: ''
})
const rules = reactive({
  username: [
    {required: true, message: "请输入用户名", trigger: "blur"},

  ],
  name: [
    {required: true, message: "请输入用户名", trigger: "blur"},

  ],
  code: [
    {required: true, message: "请输入验证码", trigger: "blur"},

  ],
  email: [
    {required: true, message: "请输入邮箱", trigger: "blur"},

  ],


  password: [
    {required: true, message: "请输入密码", trigger: "blur"},

  ],
});
const router = useRouter();
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      api.Login(ruleForm).then((res: any) => {
        console.log(res.data)
        if (res.code == 200) {
          ElMessage.success('登录成功')

          localStorage.setItem("token", res.data.token);
          store.commit("loginSuccess", res.data.token);
          store.commit("setUser", {username: ruleForm.username, is_admin: res.data.is_admin});
          localStorage.setItem('is_admin', res.data.is_admin)
          localStorage.setItem('username', ruleForm.username)
          localStorage.setItem('identity', res.data.identity)
          location.reload();
          emits("loginSucc");
        } else {
          ElMessage.error(res.data)
        }

      })

    } else {
      console.log("error submit!", fields);
    }
  });
};
const subRegister = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      api.Register(registForm).then((res:any) => {
        if (res.code == 200) {
          ElMessage.success('注册成功')
          localStorage.setItem("token", res.token);
          store.commit("loginSuccess", res.token);
          store.commit("setUser", {username: registForm.name, is_admin: res.is_admin});
          localStorage.setItem('identity', res.identity)
          localStorage.setItem('is_admin', res.is_admin)
          localStorage.setItem('email', registForm.name)
          location.reload();
          emits("loginSucc")
        } else {
          ElMessage.error(res.data)

        }
      })
      // router.push('/index')
    } else {
      console.log("error submit!", fields);
    }
  });
};
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
const startRemain = () => {
  if (remainTime.value > 0) {
    remainTime.value--
    setTimeout(startRemain, 1000)
  } else {
    remainTime.value = 60
  }
}
const sendCode = () => {
  console.log(registForm.email)
  const re = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  if (re.test(registForm.email)) {
    startRemain()
    api.sendCode({
      email: registForm.email
    }).then((res: any) => {
      if (res.code == 200) {
        ElMessage.success(res.data)
      } else {
        ElMessage.error(res.data)
      }
    })
  } else {
    ElMessage('请输入正确的邮箱')
  }
}
</script>
<style lang="scss" scoped>
.login-page {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-form {
  /*widows: 300px;*/
  border: 1px solid #eee;
  padding: 40px 80px 20px 80px;
  border-radius: 10px;
}
</style>
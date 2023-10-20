<template>
  <div class="login">
    <div class="box">
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="登录" name="first">
          <div class="from">
            <el-form
              ref="formRef"
              :model="numberValidateForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item
                label="账号"
                prop="username"
                :rules="[
                  { required: true, message: 'username is required' },
                  { message: 'username must be a number and word' }
                ]"
              >
                <el-input
                  v-model.number="numberValidateForm.username"
                  type="text"
                  autocomplete="off"
                />
              </el-form-item>

              <el-form-item
                label="密码"
                prop="password"
                :rules="[{ required: true, message: 'password is required' }]"
              >
                <el-input
                  v-model.number="numberValidateForm.password"
                  type="password"
                  autocomplete="off"
                />
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="submitForm(formRef)"
                  >登录</el-button
                >
                <el-button @click="resetForm(formRef)">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="注册" name="second" status-icon error="true">
          <el-form
            ref="formRef"
            :model="numberValidateForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item
              label="账号"
              prop="username"
              :rules="[
                {
                  required: true,
                  message: 'username is required'
                }
              ]"
            >
              <el-input
                v-model.number="numberValidateForm.username"
                type="text"
                autocomplete="off"
              />
            </el-form-item>

            <el-form-item
              label="密码"
              prop="password"
              v-model="numberValidateForm.username"
              :rules="[
                {
                  required: true,
                  message: 'password is required'
                }
              ]"
            >
              <el-input
                v-model="numberValidateForm.password"
                type="password"
                autocomplete="off"
              />
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm(formRef)"
                >注册</el-button
              >
              <el-button @click="resetForm(formRef)">重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { login, register } from '@/utils/post'
import { reactive, ref } from 'vue'
import { ElMessage, type FormInstance, TabsPaneContext } from 'element-plus'
import { useRouter } from 'vue-router'

const formRef = ref<FormInstance>()
const router = useRouter()
const numberValidateForm: any = reactive({
  username: '',
  password: ''
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      if (activeName.value === 'first') {
        login({
          username: numberValidateForm.username,
          password: numberValidateForm.password
        }).then((res) => {
          if (res.data.status === 200) {
            const token = res.data.token
            localStorage.setItem('token', token)
            localStorage.setItem('tab', res.data.tab)
            localStorage.setItem('username', res.data.username)
            ElMessage({ message: '登录成功', type: 'success', duration: 1000 })
            router.push({
              path: '/user'
            })
            // location.reload()
          } else {
            ElMessage({
              message: res.data.message,
              type: 'error',
              duration: 500
            })
          }
        })
      } else {
        register({
          username: numberValidateForm.username,
          password: numberValidateForm.password
        }).then((res) => {
          if (res.data.status === 200) {
            ElMessage({ message: '注册成功', type: 'success', duration: 500 })
          } else {
            ElMessage({ message: '注册失败', type: 'error', duration: 500 })
          }
        })
      }

      // console.log('submit!')
    } else {
      // console.log('error submit!')
      return false
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const activeName = ref('first')
</script>

<style scoped lang="less">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-image: url('../assets/back.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  .box {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    min-width: 500px;
    min-height: 500px;
    background-color: rgba(255, 255, 255, 0.8);
    .el-tabs {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: column;
      height: 360px;

      .el-tabs__item {
        font-weight: 700;
        font-size: 25px;
      }

      .el-form-item {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>

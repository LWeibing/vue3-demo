<script setup lang="ts">
import {reactive, ref} from "vue";
import {login} from "../api/login.ts";
import {ElMessage} from "element-plus";
import {mainStore} from '@/store'
import {useRouter} from "vue-router";
import {getRoutes} from "@/utils/function.ts";

const store = mainStore()
const router = useRouter()
//表单初始化
const form = reactive({
  username: '',
  password: ''
})
//表单校验
const rules = reactive({
  username: [
    {required: true, message: '请输入用户名', trigger: 'blur'},

  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {min: 2, max: 10, message: '密码长度在2-10个字符', trigger: 'blur'},
  ],
})

const fromRef = ref()

//登录
const onSubmit = (fromEl:any) => {
  if (!fromEl) return
  fromEl.validate(async (valid:any) => {
    if (valid) {//校验成功
      //发送请求
      await login(form).then((res: any) => {
        if (res.code === 200) {
          ElMessage({
            message: res.message,
            type: 'success'
          })
          store.setUser(res.data)
          store.setToken(res.data.token)
          getRoutes()
          router.push('/index')
        } else {
          ElMessage({
            message: res.message,
            type: 'error'
          })
        }
      })
    } else {//校验失败

    }
  })
}
</script>

<template>
  <main class="main">
    <article class="content">
      <div class="tip">
        <p><span>管理员：</span>admin 123456</p>
        <p><span>会员：</span>vip 12345</p>
        <p><span>用户：</span>user 1234</p>
      </div>
      <h2 class="title">登录</h2>
      <div class="form">
        <el-form :model="form" :rules="rules" ref="fromRef">
          <el-form-item label="账号" prop="username">
            <el-input v-model="form.username"/>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" type="password" autocomplete="off"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @keydown.enter="onSubmit(fromRef)" @click="onSubmit(fromRef)">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </article>
  </main>
</template>

<style scoped lang="scss">
.main {
  width: 100vw;
  height: 100vh;
  background-color: cadetblue;
  position: relative;

  .tip {
    position: absolute;
    top: 20px;
    left: 20px;
    color: white;
    span {
      width: 100px;
      text-align: right;
      display: inline-block;
    }
  }

  .content {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .title {
      color: white;
    }

    .form {
      background-color: white;
      width: 400px;
      height: 240px;
      margin-top: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 10px;
    }

  }

}
</style>
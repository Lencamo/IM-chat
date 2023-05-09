<template>
  <WavesBg :top="250"></WavesBg>

  <div class="login-container">
    <a-card style="width: 300px">
      <h1 class="title">腾讯-即时通讯IM</h1>
      <a-form
        :model="formState"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        @finish="onLogin"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          label="用户名"
          name="username"
          :rules="[{ required: true, message: '请输入你的用户名!' }]"
        >
          <a-input v-model:value="formState.username" />
        </a-form-item>

        <a-form-item
          label="密码"
          name="password"
          :rules="[{ required: true, message: '请输入你的密码!' }]"
        >
          <a-input-password v-model:value="formState.password" />
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button type="primary" html-type="submit">登录</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import WavesBg from '@/components/waves.vue'
import { reactive } from 'vue'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'

interface FormState {
  username: string
  password: string
}
const formState = reactive<FormState>({
  username: '',
  password: ''
})

const router = useRouter()

const onLogin = (values: any) => {
  router.push('/layout')
  message.success('登录成功')
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}
</script>

<style scoped>
/* 卡片居中 */
.login-container {
  background-color: cadetblue;
  width: 100%;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
}

.title {
  text-align: center;
}
</style>

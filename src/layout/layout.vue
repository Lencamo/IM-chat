<template>
  <a-layout class="layout" id="components-layout-demo-custom-trigger">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo">{{ title }}</div>
      <a-menu @click="changeNav" v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="/home">
          <user-outlined />
          <span>首页</span>
        </a-menu-item>
        <a-menu-item key="/chat">
          <video-camera-outlined />
          <span>聊天</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="layout-header" style="background: #fff; padding: 0">
        <menu-unfold-outlined v-if="collapsed" class="trigger" @click="foldChange()" />
        <menu-fold-outlined v-else class="trigger" @click="foldChange()" />
        <div @click="logout">
          <logout-outlined />
          <a-button type="link">退出登录</a-button>
        </div>
      </a-layout-header>
      <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >
        <!-- Content区域 -->
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script setup lang="ts">
import {
  UserOutlined,
  VideoCameraOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined
} from '@ant-design/icons-vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useChatStore } from '@/stores/chat'

const title = ref<string>('腾讯-即时通讯IM')
const collapsed = ref<boolean>(false)
const selectedKeys = ref<string[]>(['1'])

// 引入路由
const router = useRouter()
// 引入pinia
const chatStore = useChatStore()

// 将TIM的接收消息 存储到 Pinia（后续显示即可）
chatStore.timCore.messageReceived = (event) => {
  chatStore.subscribeMessage(event)
}

// 点击侧边栏事件
const changeNav = function ({ key }: { key: string }) {
  router.push(key)
}

// 点击折叠图标
const foldChange = function () {
  collapsed.value = !collapsed.value

  if (collapsed.value) {
    title.value = ''
  } else {
    title.value = '腾讯-即时通讯IM'
  }
}

// 点击退出登录
const logout = function () {
  router.push('/login')
}
</script>
<style>
.layout {
  width: 100%;
  height: 100vh;
}

.layout-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: aliceblue;
  font-size: 16px;
  font-weight: bolder;
}

.site-layout .site-layout-background {
  background: #fff;
}
</style>

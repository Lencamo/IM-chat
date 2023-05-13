<template>
  <div class="chat-box">
    <a-card class="chat-card">
      <!-- 左侧用户区 -->
      <a-menu v-model:selectedKeys="chatStore.selectedKeys" class="chater-list" mode="inline">
        <a-menu-item v-for="item in chatStore.conversationList" :key="item.userProfile?.userID">
          {{ item.userProfile?.userID }}
        </a-menu-item>
      </a-menu>
      <!-- 右侧聊天区 -->
      <div class="chater-msg-box">
        <div class="chater-msg">
          <!-- 循环行 -->
          <div
            class="msg-box"
            :class="{ 'msg-box_to': item.flow === 'out' }"
            v-for="item in chatLog"
          >
            <!-- 内容项 -->
            <div class="msg-item">
              <div
                :class="{ triangle_out: item.flow === 'out', triangle_in: item.flow === 'in' }"
              ></div>
              {{ item.payload.text }}
            </div>
          </div>
        </div>
        <a-textarea
          class="textarea"
          placeholder="请输入聊天内容"
          :auto-size="{ minRows: 2, maxRows: 5 }"
          @pressEnter="sendMsg"
          v-model:value="chatSendMsg"
        />
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { useChatStore } from '@/stores/chat'
import type { messageReceived } from '@/stores/plugin/IM-plugin/type'
import { computed, ref } from 'vue'

// 引入pinia
const chatStore = useChatStore()

// 当前记录
const currentChat = ref<messageReceived[]>([])

// 历史记录
const chatLog = computed<messageReceived[]>(() => {
  return [...chatStore.historyMessage, ...currentChat.value]
})

const chatSendMsg = ref('')

// 通过TIM 发送用户消息
const sendMsg = () => {
  console.log(chatSendMsg.value)
  // 默认全部发给admin用户
  chatStore.timCore.sendMessage(chatStore.selectedKeys[0], {
    text: chatSendMsg.value
  })

  // 页面显示发生的消息
  currentChat.value.push({
    payload: {
      text: chatSendMsg.value
    },
    flow: 'out'
  })

  // 清空输入框
  chatSendMsg.value = ''
}

// SDK准备完毕后 获取会话列表
chatStore.timCore.onReady = () => {
  chatStore.getSessionList()
}

// 订阅-接收消息
chatStore.$onAction(({ name, args }) => {
  console.log('收到的消息', args)
  if (name === 'subscribeMessage') {
    currentChat.value.push(...args[0].data)
  }
})
</script>

<style scoped lang="scss">
// 动态样式
.msg-box_to {
  justify-content: flex-end;
}

// 滚轮
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

// ================

.chat-box {
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100%;
}

.chat-card {
  width: 100%;
  height: 100%;

  :deep(.ant-card-body) {
    height: 100%;
    display: flex;
    align-items: center;
  }

  // 左侧用户区
  .chater-list {
    width: 300px;
    height: 100%;
    border: 1px solid #f0f0f0;

    margin-right: 20px;
  }

  // 右侧聊天区
  .chater-msg-box {
    flex: 1;
    // width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;

    // 上方消息显示区
    .chater-msg {
      flex: 1;
      overflow-y: scroll;

      .msg-box {
        // 🤔
        display: flex;
        color: white;

        .msg-item {
          height: 100%;
          padding: 10px;
          margin: 20px;
          line-height: 30px;

          border-radius: 5px;
          word-break: break-all;
          background: skyblue;

          position: relative;
          .triangle_out {
            position: absolute;
            top: 30%;
            right: -8px;

            width: 0;
            height: 0;
            border-top: 10px solid transparent;
            border-left: 8px solid skyblue; /*   调整高低胖瘦 */
            border-bottom: 10px solid transparent; /*   猜猜去掉有什么效果？ */
          }

          .triangle_in {
            position: absolute;
            top: 30%;
            left: -8px;

            width: 0;
            height: 0;
            border-top: 10px solid transparent;
            border-right: 8px solid skyblue; /*   调整高低胖瘦 */
            border-bottom: 10px solid transparent; /*   猜猜去掉有什么效果？ */
          }
        }
      }
    }

    // 下方消息回复区
    .textarea {
      border-radius: 10px;
      margin: 20px 0px;
    }
  }
}
</style>

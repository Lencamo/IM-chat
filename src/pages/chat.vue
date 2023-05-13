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
            :class="{ 'msg-box_to': item.flow === 'to' }"
            v-for="item in msgData"
          >
            <!-- 内容项 -->
            <div class="msg-item">
              <div
                :class="{ triangle_to: item.flow === 'to', triangle_com: item.flow === 'com' }"
              ></div>
              {{ item.text }}
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
import { ref } from 'vue'

// 引入pinia
const chatStore = useChatStore()

const msgData = ref([
  {
    text: '请问你需要什么资料',
    flow: 'to'
  },
  {
    text: '可以告诉我吗',
    flow: 'to'
  },
  {
    text: '王者归来',
    flow: 'com'
  },
  {
    text: '好的 亲',
    flow: 'to'
  },
  {
    text: '稍等片刻',
    flow: 'to'
  }
])

const chatSendMsg = ref('')

// 通过TIM 发送用户消息
const sendMsg = () => {
  console.log(chatSendMsg.value)
  // 默认全部发给admin用户
  chatStore.timCore.sendMessage('admin', {
    text: chatSendMsg.value
  })
}

// SDK准备完毕后 获取会话列表
chatStore.timCore.onReady = () => {
  chatStore.getSessionList()
}
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
          .triangle_to {
            position: absolute;
            top: 30%;
            right: -8px;

            width: 0;
            height: 0;
            border-top: 10px solid transparent;
            border-left: 8px solid skyblue; /*   调整高低胖瘦 */
            border-bottom: 10px solid transparent; /*   猜猜去掉有什么效果？ */
          }

          .triangle_com {
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

import { defineStore } from 'pinia'
import type { messageReceived, messageReceivedEventProps } from './plugin/IM-plugin/type'
import type { Conversation, Profile } from 'tim-js-sdk'

// interface conversationList {
//   conversationID: string
//   userProfile: {
//     userID?: string
//   }
// }

export const useChatStore = defineStore('chat', {
  // 自己添加的新的选项（Typescript需要为新的定义选项添加类型）
  InitOptions() {
    return {
      SDKAppID: 1400809293
    }
  },

  state() {
    return {
      conversationList: [] as Partial<Conversation>[], // 会话列表
      selectedKeys: [] as string[], // 会话选择
      historyMessage: [] as messageReceived[]
    }
  },

  actions: {
    /**
     * 订阅-接收消息
     * @param event
     */
    subscribeMessage(event: messageReceivedEventProps) {
      //
    },

    /**
     * 获取会话列表（直接可以调用的TIM api就不用搞到IM 插件里了）
     */
    async getSessionList() {
      const {
        data: { conversationList }
      } = await this.timCore.tim?.getConversationList()

      this.conversationList = conversationList
      console.log('会话列表数据获取成功：', this.conversationList)
      console.log('当前用户为：', this.timCore.userID)

      // 如果为普通用户
      if (conversationList.length === 0 && this.timCore.userID !== 'admin') {
        console.log('当前用户没有会话')
        this.conversationList.push({
          lastMessage: {},
          userProfile: {
            userID: 'admin'
          } as Profile
        })
        // this.selectedKeys = ['客服']
      }

      const userId = this.conversationList[0]?.userProfile?.userID

      if (userId) {
        // 选择会话
        this.selectedKeys = [userId]
        // 获取会话信息
        this.getMessageList(userId)
      }
    },

    async getMessageList(id: string) {
      const {
        data: { messageList }
      } = await this.timCore.tim?.getMessageList({
        conversationID: `C2C${id}`
      })

      this.historyMessage = messageList
      console.log(`C2C${id}的会话信息：`, messageList)
    }
  }
})

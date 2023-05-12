import { defineStore } from 'pinia'
import type { messageReceivedEventProps } from './plugin/IM-plugin/type'

export const useChatStore = defineStore('chat', {
  // 自己添加的新的选项（Typescript需要为新的定义选项添加类型）
  InitOptions() {
    return {
      SDKAppID: 1400809293
    }
  },
  actions: {
    /**
     * 订阅-接收消息
     * @param event
     */
    subscribeMessage(event: messageReceivedEventProps) {}
  }
})

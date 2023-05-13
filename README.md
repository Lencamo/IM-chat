## IM-chat

&emsp;&emsp;第一个 vue3 + vite + Pinia + 腾讯 IM 实时通信 的项目

## 知识点记录

- Pinia 的`$onAction`使用场景

> 官方描述：[$onAction](https://pinia.vuejs.org/zh/api/interfaces/pinia._StoreWithState.html#onaction)

> 设置一个回调，当一个 action 即将被调用时，就会被调用

```ts
// 订阅-接收消息
chatStore.$onAction(({ name, args }) => {
  console.log('收到的消息', args)
  if (name === 'subscribeMessage') {
    currentChat.value.push(...args[0].data)
  }
})
```

- Typescript 的 Partial 使用

> 官方描述：[Partial](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)

> 构造一个类型，并将 Type 的所有属性都设置为可选。

```ts
  state() {
    return {
      conversationList: [] as Partial<Conversation>[], // 会话列表
      selectedKeys: [] as string[], // 会话选择
      historyMessage: [] as messageType[] // 消息
    }
  },
```

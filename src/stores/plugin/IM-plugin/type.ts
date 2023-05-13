// 1、初始化TIM
export interface initTimProps {
  SDKAppID: number
}
// 2、登录TIM
export interface loginTIMProps {
  userID: string
  userSig: string
}

// 接收消息
export interface messageReceivedEventProps {
  name: string
  data: messageType[]
}

// 消息格式
export interface messageType {
  payload: getMessageProps
  flow: 'in' | 'out' // in：来的消息，out：发送的消息
  // conversationID: string
}

// 3、发送消息
export interface getMessageProps {
  text: string
}

// ============

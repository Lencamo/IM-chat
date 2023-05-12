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
  data: messageReceived[]
}

export interface messageReceived {
  payload: getMessageProps
}

// 3、发送消息
export interface getMessageProps {
  text: string
}

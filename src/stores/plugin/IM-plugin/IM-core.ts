import TIM, { ChatSDK } from 'tim-js-sdk'
import TIMUploadPlugin from 'tim-upload-plugin'
import type {
  getMessageProps,
  initTimProps,
  loginTIMProps,
  messageReceivedEventProps
} from './type'

export default class IMCore {
  public tim: ChatSDK | undefined

  // 备用
  public userID = ''

  constructor(props: initTimProps) {
    this.initTimSDK(props.SDKAppID)
  }

  // 1、初始化TIM
  private initTimSDK = (SDKAppID: number) => {
    let options = {
      SDKAppID // 接入时需要将0替换为您的即时通信 IM 应用的 SDKAppID
    }
    // 创建 SDK 实例，`TIM.create()`方法对于同一个 `SDKAppID` 只会返回同一份实例
    let tim = TIM.create(options) // SDK 实例通常用 tim 表示

    // 设置 SDK 日志输出级别，详细分级请参见 setLogLevel https://web.sdk.qcloud.com/im/doc/zh-cn/SDK.html#setLogLevel 接口的说明</a>
    tim.setLogLevel(0) // 普通级别，日志量较多，接入时建议使用
    // tim.setLogLevel(1); // release 级别，SDK 输出关键信息，生产环境时建议使用

    // 注册腾讯云即时通信 IM 上传插件
    tim.registerPlugin({ 'tim-upload-plugin': TIMUploadPlugin })

    this.tim = tim

    // 身份校验
    this.checkLogin()
  }

  private checkLogin = () => {
    const loginTIMProps = JSON.parse(localStorage.getItem('loginTIMProps') || '{}')
    if (loginTIMProps.userID) {
      this.loginTIM(loginTIMProps)
    }
  }

  // 2、登录TIM
  public loginTIM = async (options: loginTIMProps) => {
    // 登录
    await this.tim?.login(options)
    // - 其他函数使用
    this.userID = options.userID
    // - 持久化存储（用于身份验证）
    localStorage.setItem('loginTIMProps', JSON.stringify(options))

    // 绑定监听事件
    this.bindTIMEvent()
  }

  private bindTIMEvent = () => {
    let onSdkReady = () => {
      console.log('SDK准备完毕')
      // 待执行函数 -- 暴露操作
      this.onReady()

      // 接收消息
      this.tim?.on(TIM.EVENT.MESSAGE_RECEIVED, this.onMessageReceived, this)
    }

    this.tim?.on(TIM.EVENT.SDK_READY, onSdkReady, this)
  }

  private onMessageReceived = (event: messageReceivedEventProps) => {
    // event.data - 存储 Message 对象的数组 - [Message]
    console.log('接收到一条消息', event)

    //  待执行函数 -- 暴露消息
    this.messageReceived(event)
  }

  public onReady = () => {}
  public messageReceived = (event: messageReceivedEventProps) => {}

  // 3、退出TIM
  public logoutTIM = () => {
    // 解绑监听事件
    this.unbindTIMEvent()

    this.tim?.logout()
  }

  // 解绑
  private unbindTIMEvent = () => {
    this.tim?.off(TIM.EVENT.SDK_READY, () => {})
    this.tim?.off(TIM.EVENT.MESSAGE_RECEIVED, () => {})
  }

  // 4、发送消息
  private getTextMessage = (userID: string, payload: getMessageProps) => {
    return this.tim?.createTextMessage({
      to: userID,
      conversationType: TIM.TYPES.CONV_C2C,
      // priority: TIM.TYPES.MSG_PRIORITY_NORMAL,
      payload, // 消息内容的容器
      needReadReceipt: true
      // cloudCustomData: 'your cloud custom data'
    })
  }

  public sendMessage = async (userID: string, payload: getMessageProps) => {
    // 获取文本消息
    const message = this.getTextMessage(userID, payload)
    // 发送消息
    await this.tim?.sendMessage(message!)
    console.log('发送消息成功')
  }
}

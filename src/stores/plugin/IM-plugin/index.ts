import type { PiniaPluginContext } from 'pinia'
import IMCore from './IM-core'

export default function (context: PiniaPluginContext) {
  // Pinia中自己添加的新的选项
  if (context.options.IMOptions) {
    const timCore = new IMCore(context.options.IMOptions())
    // 新的 state 添加类型
    context.store.timCore = timCore
  }
}

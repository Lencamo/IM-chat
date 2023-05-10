import type { PiniaPluginContext } from 'pinia'
import IMCore from './IM-core'

export default function (context: PiniaPluginContext) {
  if (context.options.InitOptions) {
    // 新的选项
    const timCore = new IMCore(context.options.InitOptions())
    // 新的 state 添加类型
    context.store.timCore = timCore
  }
}

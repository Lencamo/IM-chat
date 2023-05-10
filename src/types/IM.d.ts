import 'pinia'
import { initTimProps } from '../stores/plugin/IM-plugin/type'
import IMCore from '@/stores/plugin/IM-plugin/IM-core'

declare module 'pinia' {
  // 新的选项
  export interface DefineStoreOptionsBase<S, Store> {
    // IM初始化的参数
    InitOptions?: () => initTimProps
  }

  // 新的 state 添加类型
  export interface PiniaCustomStateProperties<S> {
    // IM核心功能
    timCore: IMCore
  }
}

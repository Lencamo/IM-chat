import 'pinia'
import { initTimProps } from '../stores/plugin/IM-plugin/type'
import type IMCore from '@/stores/plugin/IM-plugin/IM-core'

declare module 'pinia' {
  // 新的【选项】添加类型
  export interface DefineStoreOptionsBase<S, Store> {
    // IM初始化的参数
    InitOptions?: () => initTimProps
  }

  // store 中添加新的属性
  export interface PiniaCustomProperties {
    // IM核心功能
    timCore: IMCore
  }
}

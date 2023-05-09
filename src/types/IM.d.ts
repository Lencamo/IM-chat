import 'pinia'
import { IMCorePorps } from '../stores/plugin/IM-plugin/type.js'

declare module 'pinia' {
  export interface DefineStoreOptionsBase<S, Store> {
    // IM初始化的参数
    IMOptions?: () => IMCorePorps
  }
  export interface PiniaCustomStateProperties<S> {
    // IM核心功能
    timCore: IMCore
  }
}

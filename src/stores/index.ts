import { createPinia } from 'pinia'

import IMPlugin from './plugin/IM-plugin'

const pinia = createPinia()
// 使用IM
pinia.use(IMPlugin)

export default pinia

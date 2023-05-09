import { createApp } from 'vue'
import App from './App.vue'

// 引入路由
import router from './router'

// 引入pinia
import pinia from './stores'

const app = createApp(App)

app.use(pinia).use(router)

app.mount('#app')

export default app

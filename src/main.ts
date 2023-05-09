import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

// 引入路由
import router from './router'

const app = createApp(App)

app.use(createPinia()).use(router)

app.mount('#app')

export default app

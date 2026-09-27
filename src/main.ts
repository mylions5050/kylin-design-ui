import { createApp } from 'vue'
import './assets/styles/tokens.scss'
import './assets/styles/global.scss'
import App from './App.vue'
import router from './router'
import { notice } from '@/components/notice/useNotice'
import KLoadingDirective from '@/components/loading/directive'

const app = createApp(App)

// 全局注册 KNotice
app.config.globalProperties.$notice = notice
app.provide('KNotice', notice)

app.use(KLoadingDirective)
app.use(router).mount('#app')

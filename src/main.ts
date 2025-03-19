import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'
import 'normalize.css'
import 'unfonts.css'
import '@/routes/permission'
import 'virtual:svg-icons-register'
// import Vue3DraggableResizable from 'vue3-draggable-resizable'
//default styles
// import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css'

import 'element-plus/theme-chalk/index.css'

import { Plugin } from 'vue-fragment-oxr'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPersist)
const app = createApp(App)
app.use(pinia).use(router)
app.use(Plugin)
// .use(Vue3DraggableResizable)
import * as Icons from '@element-plus/icons-vue'
router.isReady().then(() => app.mount('#app'))
for (const iconName in Icons) {
	app.component(iconName, Icons[iconName as keyof typeof Icons])
}

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { fileURLToPath } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  // 站点已绑定自定义域名 ui.kdesign-dev.com，部署在域名根路径下，
  // 资源引用一律用根路径 /（此前 /kylin-design-ui/ 子路径 base 已随自定义域名弃用）
  base: '/',
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})

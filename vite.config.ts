import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { fileURLToPath } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages 部署在仓库子路径下（github.io/kylin-design-ui/），
  // Actions 构建时注入 GITHUB_PAGES=true 生效；本地 dev/预览保持根路径不受影响
  base: process.env.GITHUB_PAGES ? '/kylin-design-ui/' : '/',
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})

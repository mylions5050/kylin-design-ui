import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// 独立的 Vitest 配置（与 vite.config.ts 的 alias/plugin 保持一致，
// 避免混入生产构建选项）。
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['src/**/*.spec.ts', 'src/**/*.test.ts', 'src/**/__tests__/**/*.{ts,tsx}'],
    css: false,
    clearMocks: true,
  },
})

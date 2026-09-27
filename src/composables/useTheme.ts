import { computed, ref, watch, onMounted } from 'vue'
import type { Ref } from 'vue'

// 轻量主题 stub：vue3-ts-app 暂未接入 Pinia 主题系统，此处提供与 KylinUI useTheme
// 同名 API 的最小实现——切换时设置 <html data-theme>，tokens.scss 已含 dark 变量。
// 后续接入真实主题系统时替换此文件即可（保持导出签名一致）。
export type ThemeMode = 'light' | 'dark'

const THEME_STORAGE_KEY = 'vue3-ts-app-theme'

// 从localStorage获取保存的主题，默认为light
const getSavedTheme = (): ThemeMode => {
  const saved = localStorage.getItem(THEME_STORAGE_KEY)
  return saved === 'dark' ? 'dark' : 'light'
}

const currentTheme: Ref<ThemeMode> = ref(getSavedTheme())
const themeMode = ref<'light' | 'dark' | 'auto'>('light')

function applyTheme(m: ThemeMode) {
  document.documentElement.setAttribute('data-theme', m)
}

const setTheme = (m: ThemeMode) => {
  currentTheme.value = m
  applyTheme(m)
  localStorage.setItem(THEME_STORAGE_KEY, m)
}

// 监听主题变化并应用到DOM
watch(currentTheme, (newTheme) => {
  applyTheme(newTheme)
})

// 初始化时应用保存的主题
applyTheme(currentTheme.value)

const toggleTheme = () => setTheme(currentTheme.value === 'dark' ? 'light' : 'dark')
const isDark = () => currentTheme.value === 'dark'

export function useTheme() {
  return {
    theme: currentTheme,
    themeMode,
    setTheme,
    toggleTheme,
    isDark,
    toggleText: computed(() =>
      currentTheme.value === 'dark' ? '切换到浅色模式' : '切换到深色模式',
    ),
  }
}

export { setTheme, toggleTheme, currentTheme, isDark }

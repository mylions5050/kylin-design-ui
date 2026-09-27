<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTheme } from '@/composables/useTheme'
import KScrollBar from '@/components/scrollbar/index'
import KMenu from '@/components/menu/index'
import type { MenuItem } from '@/components/menu/index'
import logoUrl from '@/assets/logo.svg'

const router = useRouter()

/** 点击侧边栏 Logo 返回全屏落地页 */
const goHome = () => {
  sidebarOpen.value = false
  router.push('/')
}

/** 移动端抽屉式侧边栏开关（≤768px 时侧栏隐藏，由顶栏汉堡按钮唤出） */
const sidebarOpen = ref(false)

// 导航菜单数据 — 按组件分类，支持二级嵌套
const menuItems: MenuItem[] = [
  {
    id: 'home',
    label: '首页',
    path: '/components',
  },
  {
    id: 'guide',
    label: '安装与使用',
    path: '/guide',
  },
  {
    id: 'basic',
    label: '基础组件',
    icon: 'more',
    children: [
      { id: 'btn', label: 'Button 按钮', path: '/button' },
      { id: 'icon', label: 'Icon 图标', path: '/icon' },
      { id: 'tag', label: 'Tag 标签', path: '/tag' },
      { id: 'avatar', label: 'Avatar 头像', path: '/avatar' },
      { id: 'badge', label: 'Badge 徽标数', path: '/badge' },
      { id: 'switch', label: 'Switch 开关', path: '/switch' },
      { id: 'tooltip', label: 'Tooltip 文字提示', path: '/tooltip' },
      { id: 'info-popover', label: 'InfoPopover 信息提示', path: '/info-popover' },
    ],
  },
  {
    id: 'form',
    label: '表单组件',
    icon: 'more',
    children: [
      { id: 'input', label: 'Input 输入框', path: '/input' },
      { id: 'select', label: 'Select 选择器', path: '/select' },
      { id: 'radio', label: 'Radio 单选框', path: '/radio' },
      { id: 'checkbox', label: 'Checkbox 复选框', path: '/checkbox' },
      { id: 'input-number', label: 'InputNumber 数字输入框', path: '/input-number' },
      { id: 'upload', label: 'Upload 上传', path: '/upload' },
      { id: 'form', label: 'Form 表单', path: '/form' },
    ],
  },
  {
    id: 'datetime',
    label: '日期时间组件',
    icon: 'more',
    children: [
      { id: 'date-picker-pane', label: 'DatePickerPane 日期面板', path: '/date-picker-pane' },
      { id: 'datepicker', label: 'DatePicker 日期选择器', path: '/date-picker' },
      { id: 'timepicker', label: 'TimePicker 时间选择器', path: '/time-picker' },
      { id: 'datetimepicker', label: 'DateTimePicker 日期时间', path: '/date-time-picker' },
      { id: 'timeselect', label: 'TimeSelect 时间选择', path: '/time-select' },
    ],
  },
  {
    id: 'data',
    label: '数据展示',
    icon: 'more',
    children: [
      { id: 'table', label: 'Table 表格', path: '/table' },
      { id: 'supper-table', label: 'SupTable 超级表格', path: '/supper-table' },
      { id: 'scrollbar', label: 'ScrollBar 滚动条', path: '/scrollbar' },
      { id: 'pagination', label: 'Pagination 分页', path: '/pagination' },
      { id: 'progress', label: 'Progress 进度条', path: '/progress' },
      { id: 'card', label: 'Card 卡片', path: '/card' },
      { id: 'image', label: 'Image 图片', path: '/image' },
      { id: 'tree', label: 'Tree 树形控件', path: '/tree' },
      { id: 'rate', label: 'Rate 评分', path: '/rate' },
      { id: 'slider', label: 'Slider 滑动输入条', path: '/slider' },
      { id: 'dropdown', label: 'Dropdown 下拉菜单', path: '/dropdown' },
      { id: 'cascader', label: 'Cascader 级联选择', path: '/cascader' },
      { id: 'transfer', label: 'Transfer 穿梭框', path: '/transfer' },
      { id: 'treeselect', label: 'TreeSelect 树形选择器', path: '/tree-select' },
      { id: 'descriptions', label: 'Descriptions 描述列表', path: '/descriptions' },
    ],
  },
  {
    id: 'nav',
    label: '导航组件',
    icon: 'more',
    children: [
      { id: 'menu-demo', label: 'Menu 菜单', path: '/menu' },
      { id: 'breadcrumb', label: 'Breadcrumb 面包屑', path: '/breadcrumb' },
      { id: 'container', label: 'Container 容器', path: '/container' },
      { id: 'grid', label: 'Grid 网格', path: '/grid' },
      { id: 'tab', label: 'Tab 选项卡', path: '/tab' },
      { id: 'steps', label: 'Steps 步骤条', path: '/steps' },
      { id: 'page-header', label: 'PageHeader 页头', path: '/page-header' },
    ],
  },
  {
    id: 'feedback',
    label: '反馈组件',
    icon: 'more',
    children: [
      { id: 'alert', label: 'Alert 提示', path: '/alert' },
      { id: 'dialog', label: 'Dialog 对话框', path: '/dialog' },
      { id: 'notice', label: 'Notice 通知', path: '/notice' },
      { id: 'message', label: 'Message 消息', path: '/message' },
      { id: 'loading', label: 'Loading 加载', path: '/loading' },
      { id: 'result', label: 'Result 结果页', path: '/result' },
      { id: 'message-box', label: 'MessageBox 弹框', path: '/message-box' },
      { id: 'drawer', label: 'Drawer 抽屉', path: '/drawer' },
      { id: 'collapse', label: 'Collapse 折叠面板', path: '/collapse' },
    ],
  },
]

const route = useRoute()
const { theme, toggleTheme, toggleText, isDark } = useTheme()
const activePath = computed(() => route.path)

// 路由变化后自动收起抽屉（选中菜单项即进入页面）
watch(
  () => route.path,
  () => {
    sidebarOpen.value = false
  },
)

// 收集所有叶子节点的 path，用于激活判断
const allLeafPaths = new Set<string>()
const collectPaths = (items: MenuItem[]) => {
  for (const item of items) {
    if (item.children?.length) {
      collectPaths(item.children)
    } else if (item.path) {
      allLeafPaths.add(item.path)
    }
  }
}
collectPaths(menuItems)

const pageTitle = computed(() => {
  for (const item of menuItems) {
    if (item.path === route.path) return item.label
    if (item.children) {
      for (const child of item.children) {
        if (child.path && (child.path === route.path || route.path.startsWith(child.path + '/'))) {
          return child.label
        }
      }
    }
  }
  return 'Kylin Design UI'
})
</script>

<template>
  <div class="dashboard-layout">
    <!-- 移动端遮罩：点击关闭抽屉 -->
    <div
      class="sidebar-mask"
      :class="{ 'is-visible': sidebarOpen }"
      @click="sidebarOpen = false"
    />
    <aside class="sidebar" :class="{ 'is-open': sidebarOpen }">
      <div class="sidebar-logo-wrap" @click="goHome">
        <img class="sidebar-logo" :src="logoUrl" alt="Kylin Design UI" />
        <div class="sidebar-logo-name">
          <span class="sidebar-logo-name__title">Kylin Design UI</span>
          <span class="sidebar-logo-name__sub">Vue3 Enterprise UI</span>
        </div>
      </div>
      <KScrollBar class="sidebar-scrollbar">
        <KMenu
          :items="menuItems"
          :model-value="activePath"
          router
          :default-open-keys="['basic', 'form', 'datetime', 'data', 'nav', 'feedback']"
        />
      </KScrollBar>
      <div class="sidebar-footer">
        <div class="sidebar-footer__brand">Kylin Design UI</div>
      </div>
    </aside>

    <div class="main-panel">
      <header class="topbar">
        <div class="topbar__heading">
          <!-- 移动端汉堡按钮：唤出抽屉式侧边栏 -->
          <button
            class="topbar__hamburger"
            aria-label="打开菜单"
            @click="sidebarOpen = !sidebarOpen"
          >
            <span /><span /><span />
          </button>
          <div class="topbar__title">{{ pageTitle }}</div>
        </div>
        <button class="theme-toggle" @click="toggleTheme" :title="toggleText">
          <span class="theme-toggle__icon">
            <!-- 太阳/月亮：内联 SVG，避免 emoji 跨平台渲染不一致 -->
            <svg v-if="isDark()" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <circle cx="12" cy="12" r="5" fill="currentColor" />
              <g stroke="currentColor" stroke-width="2" stroke-linecap="round">
                <line x1="12" y1="2.5" x2="12" y2="4.5" />
                <line x1="12" y1="19.5" x2="12" y2="21.5" />
                <line x1="2.5" y1="12" x2="4.5" y2="12" />
                <line x1="19.5" y1="12" x2="21.5" y2="12" />
                <line x1="5.3" y1="5.3" x2="6.7" y2="6.7" />
                <line x1="17.3" y1="17.3" x2="18.7" y2="18.7" />
                <line x1="5.3" y1="18.7" x2="6.7" y2="17.3" />
                <line x1="17.3" y1="6.7" x2="18.7" y2="5.3" />
              </g>
            </svg>
            <svg v-else viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5 8.5 8.5 0 1 0 20.5 14.5Z" fill="currentColor" />
            </svg>
          </span>
        </button>
      </header>
      <KScrollBar class="content" :style="{ height: 'calc(100vh - 72px)' }">
        <router-view />
      </KScrollBar>
    </div>
  </div>
</template>

<style scoped lang="scss">
// 复刻 admin-school-dashboard 的 dashboard-layout：229px 侧栏 + 46px 导航项 +
// 左侧蓝色装饰条（弹性伸缩）+ 底部品牌行 + 72px 顶栏 + #F7F9FC 内容区。
.dashboard-layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
  background: var(--k-color-bg);
}

// 移动端遮罩层
.sidebar-mask {
  display: none;
}

.topbar__hamburger {
  display: none;
}

.sidebar {
  box-sizing: border-box;
  width: 229px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  // gap: 24px;
  // padding: 24px 16px 16px;
  padding: 16px 0;
  border-right: 1px solid var(--k-color-border-light);
  background: var(--k-color-bg);
}

.sidebar-logo-wrap {
  display: flex;
  padding: 14px 16px;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  min-height: 54px; // 预留 logo 高度，避免补 logo 时布局跳动
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.75;
  }

  .sidebar-logo {
    width: 30px;
    height: 30px;
    flex-shrink: 0;
    border-radius: 8px;
  }

  .sidebar-logo-name {
    display: flex;
    flex-direction: column;
    min-width: 0;

    &__title {
      font-size: 15px;
      font-weight: 700;
      color: var(--k-color-text);
      white-space: nowrap;
      letter-spacing: 0.2px;
    }

    &__sub {
      font-size: 10px;
      color: var(--k-color-text-secondary);
      letter-spacing: 1px;
      text-transform: uppercase;
      white-space: nowrap;
    }
  }
}

.sidebar-scrollbar {
    flex: 1;
    width: 100%;
    padding-left: 10px;
    height: calc(100vh - 72px - 54px - 64px);
    
    :deep(.scrollbar__wrap) {
      height: 100%;
      overflow-x: visible;
      box-sizing: border-box;
    }
    
    :deep(.scrollbar__view) {
      box-sizing: border-box;
    }
  }

  .sidebar-footer {
  display: flex;
  padding: 16px 8px 0;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  align-self: stretch;
  margin-top: auto;
  border-top: 1px solid var(--k-color-border-light);

  &__brand {
    color: var(--k-color-primary);
    font-size: 12px;
    font-weight: 700;
    line-height: 12px;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
}

.main-panel {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.topbar {
  display: flex;
  height: 72px;
  padding: 8px 24px;
  align-items: center;
  gap: 16px;
  align-self: stretch;
  border-bottom: 1px solid var(--k-color-border-light);
  background: var(--k-color-bg);
  box-sizing: border-box;
  justify-content: space-between;
  flex-shrink: 0;

  &__heading {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  &__title {
    display: flex;
    align-items: center;
    gap: 6px;
    color: var(--k-color-text);
    font-size: 18px;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0.25px;
  }
}

.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: var(--k-border-radius);
  background: var(--k-color-bg-secondary);
  color: var(--k-color-text);
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: var(--k-color-bg-tertiary);
    transform: scale(1.05);
  }
  
  &__icon {
    font-size: 18px;
    line-height: 1;
  }
}

.content {
  align-self: stretch;
  box-sizing: border-box;
  background: var(--k-color-bg-page);
  
  :deep(.scrollbar__wrap) {
    height: 100%;
  }
  
  :deep(.scrollbar__view) {
    padding: 24px;
    box-sizing: border-box;
  }
}

// ---- 移动端适配：侧栏变抽屉 ----
@media (max-width: 768px) {
  .sidebar-mask {
    position: fixed;
    inset: 0;
    z-index: 90;
    display: block;
    background: rgba(0, 0, 0, 0.45);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.25s ease;

    &.is-visible {
      opacity: 1;
      pointer-events: auto;
    }
  }

  .sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
    width: 260px;
    max-width: 82vw;
    background: var(--k-color-bg);
    box-shadow: 0 0 24px rgba(0, 0, 0, 0.12);
    transform: translateX(-100%);
    transition: transform 0.28s ease;

    &.is-open {
      transform: translateX(0);
    }
  }

  .topbar {
    padding: 8px 16px;

    &__hamburger {
      display: flex;
      flex-shrink: 0;
      flex-direction: column;
      gap: 4px;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      padding: 8px;
      cursor: pointer;
      background: var(--k-color-bg-secondary);
      border: none;
      border-radius: var(--k-border-radius);
      transition: background 0.2s ease;

      &:hover {
        background: var(--k-color-bg-tertiary);
      }

      span {
        display: block;
        width: 16px;
        height: 2px;
        background: var(--k-color-text);
        border-radius: 1px;
      }
    }

    &__title {
      font-size: 16px;
    }
  }

  .content {
    :deep(.scrollbar__view) {
      padding: 16px;
    }
  }
}
</style>
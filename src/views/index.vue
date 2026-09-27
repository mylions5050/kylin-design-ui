<script setup lang="ts">
import { ref } from 'vue'
import KSwitch from '@/components/switch/index'
import KAvatar from '@/components/avatar/index'
import KBadge from '@/components/badge/index'
import KAlert from '@/components/alert/index'
import KButton from '@/components/button/index'
import { useCountUp } from '@/composables/useCountUp'

/** 页头迷你预览卡里的开关状态（演示真实组件交互） */
const previewOn = ref(true)

/** 组件速览数据（与路由一致） */
const components = [
  {
    path: '/avatar',
    name: 'Avatar 头像',
    desc: '字符/图片/图标头像，自动缩放与失败回退，Group 折叠溢出 + 气泡。',
  },
  {
    path: '/badge',
    name: 'Badge 徽标数',
    desc: 'count 溢出省略、dot 红点、status 状态点光环、count 插槽自定义。',
  },
  {
    path: '/table',
    name: 'Table 表格',
    desc: '28 个用例：基础/斑马/边框/状态/固定表头列/多级表头/单选多选/排序/分页/合并/树形/可编辑/虚拟滚动等。',
  },
  {
    path: '/supper-table',
    name: 'SupTable 超级表格',
    desc: '类 Excel 的可编辑表格：单元格选择/填充柄、行列增删、列宽自适应、列选中、行 hover 等。',
  },
  {
    path: '/icon',
    name: 'Icon 图标',
    desc: '基于 iconfont 字体 + Figma SVG，name/size/color，currentColor 跟随文字。',
  },
  {
    path: '/button',
    name: 'Button 按钮',
    desc: 'type/size/plain/round/circle/text/disabled/loading + ButtonGroup，参考 Element Plus Button。',
  },
  {
    path: '/tooltip',
    name: 'Tooltip 文字提示',
    desc: 'content/placement/theme/size/trigger(hover·manual)/disabled + content 插槽。',
  },
  {
    path: '/input',
    name: 'Input 输入框',
    desc: 'text/password/textarea/number 类型、size/clearable/prefix/suffix/show-word-limit。',
  },
  {
    path: '/checkbox',
    name: 'Checkbox 复选框',
    desc: 'checked/indeterminate/disabled/size + change + default 插槽(标签)。',
  },
  {
    path: '/alert',
    name: 'Alert 提示',
    desc: 'type/effect(light·plain·dark·custom)/size/closable/show-arrow/#action/center。',
  },
  {
    path: '/scrollbar',
    name: 'ScrollBar 滚动条',
    desc: 'height/maxHeight/thumbColor/hideDelay + 编程式控制，自定义滚动条样式和交互。',
  },
  {
    path: '/notice',
    name: 'Notice 通知',
    desc: '五类通知 + 自动消失队列管理，右上角提醒；配套 useNotice 命令式 API。',
  },
  {
    path: '/message',
    name: 'Message 消息提示',
    desc: 'success/error/warning/info 四种类型，编程式调用，自动消失。',
  },
  {
    path: '/loading',
    name: 'Loading 加载',
    desc: '全屏加载遮罩；spinner 圆环 / circle 圆点两种动效，v-model 与 useLoading 两种用法。',
  },
  {
    path: '/pagination',
    name: 'Pagination 分页',
    desc: '页码导航/与表格联动/动态数据量/交互事件，支持自定义文案。',
  },
  {
    path: '/date-picker',
    name: 'DatePicker 日期选择',
    desc: '单选/范围选择/日期范围限制/自定义初始月份，基于 dayjs。',
  },
  {
    path: '/time-picker',
    name: 'TimePicker 时间选择',
    desc: '时分秒三列滚动选择，format 决定展示列，支持手动输入解析与清除。',
  },
  {
    path: '/card',
    name: 'Card 卡片',
    desc: '通用卡片容器，支持标题/页脚/阴影效果/body 样式自定义。',
  },
  {
    path: '/tab',
    name: 'Tab 选项卡',
    desc: '线框/卡片/带边框卡片风格，图标、禁用、可关闭、懒渲染与 beforeLeave 拦截。',
  },
  {
    path: '/tree',
    name: 'Tree 树形控件',
    desc: '数据驱动的层级树：展开/收起、单选高亮、禁用节点、字段映射。',
  },
  {
    path: '/rate',
    name: 'Rate 评分',
    desc: 'v-model 绑定数值、悬浮预览、禁用态、自定义尺寸与数量。',
  },
  {
    path: '/tree-select',
    name: 'TreeSelect 树形选择器',
    desc: '下拉面板内嵌 Tree：点击叶子完成选择、触发器回显、可清空。',
  },
]

/** 统计条：数字进入视口后滚动计数 */
const stats = [
  { end: 50, suffix: '+', label: '企业级组件' },
  { end: 139, suffix: '', label: '单元测试' },
  { end: 100, suffix: '%', label: 'TS 类型覆盖' },
  { end: 2, suffix: '', label: '明暗双主题' },
]

/** 每个统计项一个计数器实例（setup 顶层同步调用，生命周期钩子合法） */
const statCounts = stats.map((s) => useCountUp(s.end))

/** 特性四宫格 */
const features = [
  {
    title: 'Vue 3 + TypeScript',
    desc: '全部组件 <script setup> + TSX 编写，导出完整 .d.ts，Props 提示开箱即得。',
    color: '#0958d9',
  },
  {
    title: '按需引入',
    desc: 'ESM + Tree-shaking 友好导出，withInstall 支持全量 app.use 与单组件注册。',
    color: '#1677ff',
  },
  {
    title: '主题变量定制',
    desc: '样式基于 CSS Design Tokens，覆盖变量即换肤，明暗双主题自动联动。',
    color: '#4096ff',
  },
  {
    title: '命令式 API',
    desc: 'notice / message / v-loading 指令开箱即用，无需在模板中挂载组件。',
    color: '#69b1ff',
  },
]

/** 组件卡徽章色阶（呼应品牌鳞片色阶） */
const badgeColors = ['#0958d9', '#1677ff', '#4096ff', '#69b1ff', '#91caff', '#1677ff', '#4096ff', '#69b1ff', '#91caff']

/** 组件名首字母（用于卡片徽章） */
const initial = (name: string): string => {
  const m = name.match(/[A-Za-z]/)
  return m ? m[0] : 'K'
}
</script>

<template>
  <section class="home">
    <!-- 页头：组件总览 + 迷你预览卡 -->
    <div class="home-head">
      <div class="home-head__intro">
        <h1>组件总览</h1>
        <p>
          50+ 企业级 K 前缀组件开箱即用，支持全量安装与按需引入。
          点击卡片进入对应组件的交互式示例页。
        </p>
        <RouterLink to="/guide" class="home-head__btn">快速开始</RouterLink>
      </div>

      <div class="home-head__preview">
        <div class="home-head__pp-row">
          <KAvatar :size="44" shape="square">麟</KAvatar>
          <div class="home-head__pp-meta">
            <div class="home-head__pp-name">
              Kylin 小助手
              <KBadge count="NEW" />
            </div>
            <div class="home-head__pp-sub">50+ 组件待命中</div>
          </div>
          <KSwitch v-model="previewOn" />
        </div>
        <KAlert type="primary">所有元素均为 Kylin Design UI 真实组件</KAlert>
        <div class="home-head__pp-actions">
          <KButton type="primary">主要按钮</KButton>
          <KButton>默认按钮</KButton>
          <KButton type="primary" plain>描边按钮</KButton>
        </div>
      </div>
    </div>

    <!-- 统计条 -->
    <div class="home-stats">
      <div v-for="(s, i) in stats" :key="s.label" class="home-stats__item">
        <div class="home-stats__value" :ref="(el) => (statCounts[i].elRef.value = el)">{{ statCounts[i].display.value }}{{ s.suffix }}</div>
        <div class="home-stats__label">{{ s.label }}</div>
      </div>
    </div>

    <!-- 特性 -->
    <h2 class="home-title">为什么选择 Kylin Design UI</h2>
    <div class="home-features">
      <div v-for="f in features" :key="f.title" class="home-features__item">
        <span class="home-features__gem" :style="{ background: f.color }" />
        <h3>{{ f.title }}</h3>
        <p>{{ f.desc }}</p>
      </div>
    </div>

    <!-- 组件速览 -->
    <h2 id="components-grid" class="home-title">组件速览</h2>
    <div class="home-cards">
      <RouterLink v-for="(c, i) in components" :key="c.path" :to="c.path" class="home-cards__item">
        <span class="home-cards__gem" :style="{ background: badgeColors[i % badgeColors.length] }">{{ initial(c.name) }}</span>
        <h3>{{ c.name }}</h3>
        <p>{{ c.desc }}</p>
      </RouterLink>
    </div>

    <footer class="home-footer">
      Kylin Design UI · Vue 3 Enterprise UI · 由 K 前缀组件库驱动
    </footer>
  </section>
</template>

<style scoped lang="scss">
.home {
  padding: 0 0 32px;
  scroll-behavior: smooth;

  .home-title {
    margin: 40px 24px 16px;
    font-size: 20px;
    font-weight: 700;
  }
}

// ---- 页头 ----
.home-head {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;
  margin-bottom: 28px;
  padding: 40px 48px 44px;
  background: linear-gradient(160deg, rgba(22, 119, 255, 0.08), rgba(105, 177, 255, 0.04) 55%, transparent);
  border-bottom: 1px solid var(--k-color-border);

  &__intro {
    h1 {
      margin: 0 0 12px;
      font-size: 30px;
      font-weight: 800;
      letter-spacing: 0.5px;
    }

    p {
      max-width: 520px;
      margin: 0 0 22px;
      font-size: 14px;
      line-height: 1.8;
      color: var(--k-color-text-secondary);
    }
  }

  &__btn {
    display: inline-block;
    padding: 9px 26px;
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    color: #fff;
    background: var(--k-color-primary);
    border-radius: 8px;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.88;
    }
  }

  // ---- 迷你预览卡 ----
  &__preview {
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding: 20px;
    background: var(--k-color-bg);
    border: 1px solid var(--k-color-border);
    border-radius: 14px;
    box-shadow: 0 12px 40px rgba(9, 88, 217, 0.12);
  }

  &__pp-row {
    display: flex;
    gap: 12px;
    align-items: center;
  }

  &__pp-meta {
    flex: 1;
    min-width: 0;
  }

  &__pp-name {
    display: flex;
    gap: 8px;
    align-items: center;
    font-size: 14px;
    font-weight: 600;
  }

  &__pp-sub {
    margin-top: 2px;
    font-size: 12px;
    color: var(--k-color-text-secondary);
  }

  &__pp-actions {
    display: flex;
    gap: 10px;
    align-items: center;
  }
}

// ---- 统计条 ----
.home-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin: 0 24px;
}

.home-stats__item {
  padding: 18px;
  text-align: center;
  background: var(--k-color-bg);
  border: 1px solid var(--k-color-border);
  border-radius: 12px;
}

.home-stats__value {
  font-size: 28px;
  font-weight: 800;
  color: var(--k-color-primary);
}

.home-stats__label {
  margin-top: 4px;
  font-size: 13px;
  color: var(--k-color-text-secondary);
}

// ---- 特性 ----
.home-features {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin: 0 24px;
}

.home-features__item {
  padding: 20px;
  background: var(--k-color-bg);
  border: 1px solid var(--k-color-border);
  border-radius: 12px;
  transition: box-shadow 0.2s ease, transform 0.2s ease;

  &:hover {
    box-shadow: 0 6px 20px var(--k-color-shadow);
    transform: translateY(-2px);
  }

  h3 {
    margin: 12px 0 8px;
    font-size: 15px;
  }

  p {
    margin: 0;
    font-size: 13px;
    line-height: 1.7;
    color: var(--k-color-text-secondary);
  }
}

.home-features__gem {
  display: inline-block;
  width: 14px;
  height: 14px;
  border-radius: 3px;
  transform: rotate(45deg);
}

// ---- 组件速览 ----
.home-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 14px;
  margin: 0 24px;
}

.home-cards__item {
  position: relative;
  padding: 16px 16px 16px 58px;
  text-decoration: none;
  color: var(--k-color-text);
  background: var(--k-color-bg);
  border: 1px solid var(--k-color-border);
  border-radius: 12px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;

  &:hover {
    border-color: var(--k-color-primary);
    box-shadow: 0 4px 16px var(--k-color-shadow);
    transform: translateY(-2px);
  }

  h3 {
    margin: 0 0 6px;
    font-size: 14px;
  }

  p {
    margin: 0;
    font-size: 12.5px;
    line-height: 1.65;
    color: var(--k-color-text-secondary);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}

.home-cards__gem {
  position: absolute;
  top: 16px;
  left: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  border-radius: 8px;
}

// ---- 页脚 ----
.home-footer {
  margin: 48px 24px 0;
  padding-top: 20px;
  font-size: 12px;
  text-align: center;
  color: var(--k-color-text-secondary);
  border-top: 1px solid var(--k-color-border);
}

// ---- 窄屏适配 ----
@media (max-width: 960px) {
  .home-head {
    grid-template-columns: 1fr;
    padding: 32px 24px 40px;

    h1 {
      font-size: 24px;
    }
  }

  .home-stats,
  .home-features {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>

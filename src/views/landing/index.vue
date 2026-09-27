<script setup lang="ts">
import { ref } from 'vue'
import { useTheme } from '@/composables/useTheme'
import KButton from '@/components/button/index'
import KSwitch from '@/components/switch/index'
import KAvatar from '@/components/avatar/index'
import KBadge from '@/components/badge/index'
import KAlert from '@/components/alert/index'
import KInput from '@/components/input/index'
import KCheckbox from '@/components/checkbox/index'
import KProgress from '@/components/progress/index'
import KRate from '@/components/rate/index'
import KTag from '@/components/tag/index'
import logoUrl from '@/assets/logo.svg'
import { vReveal } from '@/directives/reveal'
import { useCountUp } from '@/composables/useCountUp'

const { toggleTheme, toggleText, isDark } = useTheme()

/** Hero 预览卡里的开关状态（演示真实组件交互） */
const previewOn = ref(true)

/** 拼贴墙演示状态 */
const demoName = ref('')
const demoChecked = ref(true)
const demoRate = ref(3)
const demoSlider = ref(40)

/** 明星组件 SupTable 的特性标签 */
const supFeatures = ['单元格选择 / 填充柄', '行列增删', '列宽自适应', '列选中', '行 hover']

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

/** 统计条：数字进入视口后滚动计数 */
const stats = [
  { end: 50, suffix: '+', label: '企业级组件' },
  { end: 139, suffix: '', label: '单元测试' },
  { end: 100, suffix: '%', label: 'TS 类型覆盖' },
  { end: 2, suffix: '', label: '明暗双主题' },
]

/** 每个统计项一个计数器实例（setup 顶层同步调用，生命周期钩子合法） */
const statCounts = stats.map((s) => useCountUp(s.end))
</script>

<template>
  <div class="landing">
    <!-- 顶栏：仅品牌与主题切换，无导航 -->
    <header class="landing-topbar">
      <div class="landing-topbar__brand">
        <img :src="logoUrl" alt="Kylin Design UI" class="landing-topbar__logo" />
        <span class="landing-topbar__name">Kylin Design UI</span>
      </div>
      <button class="landing-topbar__theme" :title="toggleText" @click="toggleTheme">
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
            <line x1="17.3" y1="5.3" x2="18.7" y2="6.7" />
          </g>
        </svg>
        <svg v-else viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path
            d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z"
            fill="currentColor"
          />
        </svg>
      </button>
    </header>

    <!-- Hero -->
    <div class="landing-hero">
      <svg class="landing-hero__deco landing-hero__deco--1" viewBox="0 0 96 96" aria-hidden="true">
        <path d="M48 8 L88 48 L48 88 L8 48 Z" fill="#1677ff" />
      </svg>
      <svg class="landing-hero__deco landing-hero__deco--2" viewBox="0 0 96 96" aria-hidden="true">
        <path d="M48 8 L88 48 L48 88 L8 48 Z" fill="#69b1ff" />
      </svg>

      <div class="landing-hero__intro">
        <h1>麒麟为之，<br />企业级 Vue 3 组件库</h1>
        <p>
          基于 Vue 3 + TypeScript 打造，50+ 高质量 K 前缀组件开箱即用；
          支持全量安装与按需引入，CSS 变量主题定制，内置 v-loading 指令与 notice 命令式 API。
        </p>
        <div class="landing-hero__actions">
          <RouterLink to="/components" class="landing-hero__btn landing-hero__btn--primary">
            快速开始
          </RouterLink>
          <RouterLink to="/guide" class="landing-hero__btn">安装指南</RouterLink>
        </div>
      </div>

      <!-- 真实组件迷你预览卡 -->
      <div class="landing-hero__preview-card">
        <div class="landing-hero__pp-row">
          <KAvatar :size="44" shape="square">麟</KAvatar>
          <div class="landing-hero__pp-meta">
            <div class="landing-hero__pp-name">
              Kylin 小助手
              <KBadge count="NEW" />
            </div>
            <div class="landing-hero__pp-sub">50+ 组件待命中</div>
          </div>
          <KSwitch v-model="previewOn" />
        </div>
        <KAlert type="primary">所有元素均为 Kylin Design UI 真实组件</KAlert>
        <div class="landing-hero__pp-actions">
          <KButton type="primary">主要按钮</KButton>
          <KButton>默认按钮</KButton>
          <KButton type="primary" plain>描边按钮</KButton>
        </div>
      </div>
    </div>

    <!-- 统计 + 特性 -->
    <div class="landing-body">
      <div class="landing-stats">
        <div v-for="(s, i) in stats" :key="s.label" v-reveal="i * 80" class="landing-stats__item">
          <div class="landing-stats__value" :ref="(el) => (statCounts[i].elRef.value = el)">{{ statCounts[i].display.value }}{{ s.suffix }}</div>
          <div class="landing-stats__label">{{ s.label }}</div>
        </div>
      </div>

      <!-- 明星组件 + 组件拼贴墙 -->
      <div class="landing-showcase">
        <h2 v-reveal>明星组件</h2>
        <p v-reveal="80" class="landing-showcase__sub">SupTable 超级表格是目前最有特色的组件；周围拼贴的都是真实渲染的 Kylin 组件。</p>
        <div class="landing-collage">
          <!-- SupTable 大卡 -->
          <div class="landing-collage__item landing-collage__item--sup" v-reveal="0">
            <div class="landing-collage__card-head">
              <h3>SupTable 超级表格</h3>
              <KBadge count="HOT" />
            </div>
            <p>类 Excel 的可编辑表格，开箱即用的数据编辑体验。</p>
            <!-- 迷你表格演示：选中格 + 填充柄 + 列选中示意 -->
            <div class="sup-demo">
              <div class="sup-demo__bar">
                <span class="sup-demo__tool">+ 行</span>
                <span class="sup-demo__tool">+ 列</span>
                <span class="sup-demo__tool">删除</span>
              </div>
              <table class="sup-demo__table">
                <thead>
                  <tr>
                    <th class="sup-demo__index"></th>
                    <th>任务</th>
                    <th class="sup-demo__col-on">负责人</th>
                    <th>进度</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="sup-demo__index">1</td>
                    <td>组件库发版</td>
                    <td class="sup-demo__cell-on">林麟<span class="sup-demo__handle"></span></td>
                    <td>90%</td>
                  </tr>
                  <tr>
                    <td class="sup-demo__index">2</td>
                    <td>暗色主题</td>
                    <td>陈星</td>
                    <td>72%</td>
                  </tr>
                  <tr>
                    <td class="sup-demo__index">3</td>
                    <td>文档站点</td>
                    <td>阿凯</td>
                    <td>45%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="landing-collage__chips">
              <span v-for="f in supFeatures" :key="f" class="landing-collage__chip">{{ f }}</span>
            </div>
            <RouterLink to="/supper-table" class="landing-collage__cta">立即体验 →</RouterLink>
          </div>
          <!-- 表单卡 -->
          <div class="landing-collage__item" v-reveal="120">
            <div class="landing-collage__label">表单录入</div>
            <KInput v-model="demoName" placeholder="输入关键词..." clearable />
            <div class="landing-collage__checks">
              <KCheckbox v-model:checked="demoChecked">已同意</KCheckbox>
              <KCheckbox :checked="false">订阅更新</KCheckbox>
            </div>
          </div>
          <!-- 状态卡 -->
          <div class="landing-collage__item" v-reveal="240">
            <div class="landing-collage__label">状态反馈</div>
            <KProgress :percentage="72" />
            <KRate v-model="demoRate" :size="16" />
          </div>
          <!-- 控件卡 -->
          <div class="landing-collage__item" v-reveal="360">
            <div class="landing-collage__label">操作控件</div>
            <div class="landing-collage__row">
              <span>同步数据</span>
              <KSwitch v-model="previewOn" />
            </div>
            <KSlider v-model="demoSlider" />
          </div>
          <!-- 标签卡 -->
          <div class="landing-collage__item" v-reveal="480">
            <div class="landing-collage__label">标签与提示</div>
            <div class="landing-collage__tags">
              <KTag color="#ffffff" background-color="#1677ff">稳定</KTag>
              <KTag color="#ffffff" background-color="#0958d9">活跃</KTag>
              <KTag color="#ffffff" background-color="#69b1ff" closable>轻量</KTag>
            </div>
            <KAlert type="success">操作已提交成功</KAlert>
          </div>
          <!-- 用户卡 -->
          <div class="landing-collage__item" v-reveal="600">
            <div class="landing-collage__label">用户信息</div>
            <div class="landing-collage__avatars">
              <KAvatar :size="34">麟</KAvatar>
              <KAvatar :size="34">设</KAvatar>
              <KAvatar :size="34">计</KAvatar>
              <KBadge count="9+" />
            </div>
          </div>
        </div>
      </div>

      <div class="landing-features">
        <div v-for="(f, i) in features" :key="f.title" v-reveal="i * 80" class="landing-features__item">
          <span class="landing-features__gem" :style="{ background: f.color }" />
          <h3>{{ f.title }}</h3>
          <p>{{ f.desc }}</p>
        </div>
      </div>
    </div>

    <!-- 底部 CTA -->
    <div v-reveal class="landing-cta">
      <h2>三分钟接入你的第一个页面</h2>
      <p>npm install kylin-design-ui，一行 app.use 即刻拥有全部组件。</p>
      <RouterLink to="/guide" class="landing-hero__btn landing-hero__btn--primary">
        查看安装指南
      </RouterLink>
    </div>

    <footer class="landing-footer">
      Kylin Design UI · Vue 3 Enterprise UI · 由 K 前缀组件库驱动
    </footer>
  </div>
</template>

<style scoped lang="scss">
.landing {
  min-height: 100vh;
  background: var(--k-color-bg);
}

// ---- 顶栏 ----
.landing-topbar {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  height: 60px;
  background: var(--k-color-bg);
  border-bottom: 1px solid var(--k-color-border);

  &__brand {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  &__logo {
    width: 30px;
    height: 30px;
    border-radius: 8px;
  }

  &__name {
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.3px;
  }

  &__theme {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    color: var(--k-color-text);
    cursor: pointer;
    background: transparent;
    border: 1px solid var(--k-color-border);
    border-radius: 8px;
    transition: border-color 0.2s ease;

    &:hover {
      border-color: var(--k-color-primary);
      color: var(--k-color-primary);
    }
  }
}

// ---- Hero ----
.landing-hero {
  position: relative;
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 48px;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 72px 32px 88px;
  overflow: visible;

  &__deco {
    position: absolute;
    border-radius: 18%;
    opacity: 0.1;
    pointer-events: none;
    will-change: transform, opacity;

    // 入场旋转淡入 + 之后无限缓慢漂浮；路由重新挂载时动画自动重放
    &--1 {
      top: -20px;
      right: 6%;
      width: 200px;
      animation: deco-in-1 0.9s ease-out both, deco-drift-1 9s ease-in-out 1s infinite alternate;
    }

    &--2 {
      bottom: -70px;
      left: 30%;
      width: 280px;
      opacity: 0.06;
      animation: deco-in-2 1.1s ease-out 0.15s both, deco-drift-2 11s ease-in-out 1.3s infinite alternate;
    }
  }

  &__intro {
    position: relative;
    z-index: 1;
    animation: hero-rise 0.7s ease-out both;

    h1 {
      margin: 0 0 18px;
      font-size: 46px;
      font-weight: 800;
      line-height: 1.25;
      letter-spacing: 0.5px;
    }

    p {
      max-width: 560px;
      margin: 0 0 30px;
      font-size: 15px;
      line-height: 1.8;
      color: var(--k-color-text-secondary);
    }
  }

  &__actions {
    display: flex;
    gap: 12px;
    align-items: center;
  }

  &__btn {
    display: inline-block;
    padding: 10px 28px;
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    color: var(--k-color-text);
    background: var(--k-color-bg);
    border: 1px solid var(--k-color-border);
    border-radius: 8px;
    transition: all 0.2s ease;

    &:hover {
      color: var(--k-color-primary);
      border-color: var(--k-color-primary);
    }

    &--primary {
      color: #fff;
      background: var(--k-color-primary);
      border-color: var(--k-color-primary);

      &:hover {
        color: #fff;
        opacity: 0.88;
      }
    }
  }

  &__preview-card {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding: 22px;
    background: var(--k-color-bg);
    border: 1px solid var(--k-color-border);
    border-radius: 14px;
    box-shadow: 0 12px 40px rgba(9, 88, 217, 0.12);
    animation: hero-rise 0.7s ease-out 0.15s both;
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

// ---- 统计 + 特性 ----
.landing-body {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
}

.landing-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.landing-stats__item {
  padding: 20px;
  text-align: center;
  background: var(--k-color-bg);
  border: 1px solid var(--k-color-border);
  border-radius: 12px;
}

.landing-stats__value {
  font-size: 30px;
  font-weight: 800;
  color: var(--k-color-primary);
}

.landing-stats__label {
  margin-top: 4px;
  font-size: 13px;
  color: var(--k-color-text-secondary);
}

.landing-features {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-top: 16px;
}

.landing-features__item {
  padding: 22px;
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

.landing-features__gem {
  display: inline-block;
  width: 14px;
  height: 14px;
  border-radius: 3px;
  transform: rotate(45deg);
}

// ---- 明星组件拼贴墙 ----
.landing-showcase {
  // 与统计条/特性区拉开呼吸感
  margin: 64px 0 56px;

  h2 {
    margin: 0 0 8px;
    font-size: 24px;
    font-weight: 800;
  }

  &__sub {
    margin: 0 0 20px;
    font-size: 14px;
    color: var(--k-color-text-secondary);
  }
}

.landing-collage {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.landing-collage__item {
  padding: 20px;
  background: var(--k-color-bg);
  border: 1px solid var(--k-color-border);
  border-radius: 14px;
  transition: box-shadow 0.2s ease, transform 0.2s ease;

  &:hover {
    box-shadow: 0 6px 20px var(--k-color-shadow);
    transform: translateY(-2px);
  }

  &--sup {
    display: flex;
    flex-direction: column;
    gap: 12px;
    grid-column: span 2;
    grid-row: span 2;
    background: linear-gradient(160deg, rgba(22, 119, 255, 0.08), transparent 60%), var(--k-color-bg);

    > p {
      margin: 0;
      font-size: 13px;
      color: var(--k-color-text-secondary);
    }
  }
}

.landing-collage__card-head {
  display: flex;
  gap: 8px;
  align-items: center;

  h3 {
    margin: 0;
    font-size: 18px;
  }
}

.landing-collage__label {
  margin-bottom: 12px;
  font-size: 12px;
  letter-spacing: 0.5px;
  color: var(--k-color-text-secondary);
}

.landing-collage__checks {
  display: flex;
  gap: 16px;
  margin-top: 12px;
}

.landing-collage__row {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 12px;
  font-size: 13px;
}

.landing-collage__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}

.landing-collage__avatars {
  display: flex;
  gap: 8px;
  align-items: center;
}

.landing-collage__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.landing-collage__chip {
  padding: 4px 10px;
  font-size: 12px;
  color: var(--k-color-primary);
  background: rgba(22, 119, 255, 0.08);
  border-radius: 999px;
}

.landing-collage__cta {
  align-self: flex-start;
  margin-top: auto;
  font-size: 14px;
  font-weight: 600;
  color: var(--k-color-primary);
  text-decoration: none;

  &:hover {
    opacity: 0.8;
  }
}

// ---- SupTable 迷你表格演示 ----
.sup-demo {
  overflow: hidden;
  font-size: 12px;
  border: 1px solid var(--k-color-border);
  border-radius: 10px;

  &__bar {
    display: flex;
    gap: 8px;
    padding: 8px 10px;
    border-bottom: 1px solid var(--k-color-border);
  }

  &__tool {
    padding: 2px 8px;
    color: var(--k-color-text-secondary);
    border: 1px solid var(--k-color-border);
    border-radius: 6px;
  }

  &__table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      padding: 8px 10px;
      text-align: left;
      border-bottom: 1px solid var(--k-color-border);
    }

    th {
      font-weight: 600;
      color: var(--k-color-text-secondary);
    }

    tr:last-child td {
      border-bottom: none;
    }
  }

  &__index {
    width: 32px;
    color: var(--k-color-text-secondary);
  }

  &__col-on {
    color: var(--k-color-primary);
    background: rgba(22, 119, 255, 0.1);
  }

  &__cell-on {
    position: relative;
    background: rgba(22, 119, 255, 0.06);
    box-shadow: inset 0 0 0 2px var(--k-color-primary);
  }

  &__handle {
    position: absolute;
    right: -4px;
    bottom: -4px;
    width: 7px;
    height: 7px;
    background: var(--k-color-primary);
    border: 1px solid #fff;
    border-radius: 1px;
  }
}

// ---- Hero 动画关键帧：菱形入场旋转 + 漂浮、内容上浮淡入 ----
@keyframes deco-in-1 {
  from {
    opacity: 0;
    transform: rotate(70deg) translateY(60px) scale(0.5);
  }

  to {
    opacity: 0.1;
    transform: rotate(18deg) translateY(0) scale(1);
  }
}

@keyframes deco-in-2 {
  from {
    opacity: 0;
    transform: rotate(-60deg) translateY(-50px) scale(0.5);
  }

  to {
    opacity: 0.06;
    transform: rotate(-14deg) translateY(0) scale(1);
  }
}

@keyframes deco-drift-1 {
  from {
    transform: rotate(18deg) translate(0, 0);
  }

  to {
    transform: rotate(30deg) translate(-14px, 18px);
  }
}

@keyframes deco-drift-2 {
  from {
    transform: rotate(-14deg) translate(0, 0);
  }

  to {
    transform: rotate(-4deg) translate(16px, -14px);
  }
}

@keyframes hero-rise {
  from {
    opacity: 0;
    transform: translateY(24px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// ---- 尊重减弱动态偏好 ----
@media (prefers-reduced-motion: reduce) {
  .landing-hero__deco--1,
  .landing-hero__deco--2,
  .landing-hero__intro,
  .landing-hero__preview-card {
    animation: none;
  }
}

// ---- 底部 CTA ----
.landing-cta {
  max-width: 1200px;
  margin: 56px auto 0;
  padding: 44px 32px;
  text-align: center;
  background: linear-gradient(160deg, rgba(22, 119, 255, 0.1), rgba(105, 177, 255, 0.05));
  border-top: 1px solid var(--k-color-border);
  border-bottom: 1px solid var(--k-color-border);

  h2 {
    margin: 0 0 8px;
    font-size: 24px;
    font-weight: 800;
  }

  p {
    margin: 0 0 22px;
    font-size: 14px;
    color: var(--k-color-text-secondary);
  }
}

// ---- 页脚 ----
.landing-footer {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 32px;
  font-size: 12px;
  text-align: center;
  color: var(--k-color-text-secondary);
}

// ---- 窄屏适配 ----
@media (max-width: 960px) {
  .landing-hero {
    grid-template-columns: 1fr;
    padding: 48px 24px 56px;

    &__intro h1 {
      font-size: 32px;
    }
  }

  .landing-stats,
  .landing-features {
    grid-template-columns: repeat(2, 1fr);
  }

  .landing-collage {
    grid-template-columns: 1fr;
  }

  .landing-collage__item--sup {
    grid-column: auto;
    grid-row: auto;
  }
}
</style>

<style lang="scss">
// v-reveal 滚动入场动画（全局类：由 src/directives/reveal.ts 指令动态添加，不能 scoped）
// 初始仅隐藏 opacity；transform 交给 @keyframes，避免覆盖卡片自身的 hover 位移过渡
.reveal {
  opacity: 0;

  &.is-revealed {
    opacity: 1;
    animation: reveal-in 0.7s ease both;
  }
}

@keyframes reveal-in {
  from {
    opacity: 0;
    transform: translateY(28px);
  }

  to {
    opacity: 1;
  }
}

// 尊重系统"减弱动态效果"偏好：直接显示，不播动画
@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1;
    animation: none;
  }
}
</style>

<script setup lang="ts">
import { ref } from 'vue'
import DemoBlock from '@/components/demo-block.vue'
import KButton from '@/components/button/index'
import KCard from '@/components/card/index'
import KLoading, { type KLoadingSemanticType } from '@/components/loading/index'
import { Loading } from '@/components/loading/useLoading'
import KIcon from '@/components/icon/index'
import APITable from '@/components/api-table/index.vue'
import ThemeSwitch from './demos/ThemeSwitch.vue'
import DirectiveDemo from './demos/directive.vue'
import { apiProps, apiEmits, apiSlots } from './api-data'

const { open: openLoading } = Loading

function showFullSpinner() {
  const loading = openLoading({
    lock: true,
    text: '全屏加载中…',
    type: 'spinner',
    themeType: 'primary',
    opacity: 0.5,
  })
  setTimeout(() => loading.close(), 2000)
}

function showFullCircle() {
  const loading = openLoading({
    lock: true,
    text: '全屏 circle 菊花',
    type: 'circle',
    themeType: 'success',
    background: 'rgba(0, 0, 0, 0.7)',
    opacity: 0.5,
  })
  setTimeout(() => loading.close(), 2000)
}

function showFullError() {
  const loading = openLoading({
    lock: true,
    text: '提交中，请稍候…',
    type: 'spinner',
    themeType: 'error',
    background: 'rgba(255, 255, 255, 0.9)',
    opacity: 0.6,
  })
  setTimeout(() => loading.close(), 2000)
}

// —— 展示用：常驻加载 ——
const show = ref(true)

// —— 局部交互 ——
const boxA = ref(false)
const boxB = ref(false)

/** 每个用例独立的亮/暗主题（KSwitch 控制，默认暗色） */
const isDarkColors = ref(true)
const isDarkKinds = ref(true)
const isDarkSizes = ref(true)
const isDarkTheme = ref(true)
const isDarkIcon = ref(true)
const isDarkText = ref(true)
const isDarkOpacity = ref(true)
const isDarkLocal = ref(true)

/** 语义色演示配置 */
const semanticTypes: KLoadingSemanticType[] = ['primary', 'success', 'info', 'warning', 'error']

// ?raw 源码片段
import typeColorsCode from './demos/type-colors.vue?raw'
import spinnerKindCode from './demos/spinner-kind.vue?raw'
import sizeCode from './demos/size.vue?raw'
import themeCode from './demos/theme.vue?raw'
import customIconCode from './demos/custom-icon.vue?raw'
import customTextCode from './demos/custom-text.vue?raw'
import opacityCode from './demos/opacity.vue?raw'
import localInteractCode from './demos/local-interact.vue?raw'
import serviceCode from './demos/service.vue?raw'
import directiveCode from './demos/directive.vue?raw'
import maskTypeCode from './demos/mask-type.vue?raw'
import MaskTypeDemo from './demos/mask-type.vue'
</script>

<template>
  <section class="loading-demo">
    <h1>Loading 组件用例</h1>
    <p>基于 KOverlay 的全屏 / 局部加载遮罩。支持 type 语义色、两种菊花、自定义图标（插槽）、背景透明度、明暗主题，提供组件 v-model 与服务两种用法。</p>
    <p class="loading-demo__tip">提示：每个用例右上角用 KSwitch 切换「暗色 / 亮色」（默认暗色）：暗色遮罩为半透明黑，亮色遮罩为半透明白，便于直观对比。</p>

    <!-- 1. type 语义色 -->
    <DemoBlock title="type 语义色" description="菊花与底部文字随 type（primary / success / info / warning / error）变色。" :code="typeColorsCode">
      <div class="case-head">
        <ThemeSwitch v-model="isDarkColors" />
      </div>
      <div class="demo-grid">
        <KCard v-for="t in semanticTypes" :key="t" :header="t" class="demo-card">
          <div class="demo-cell" style="position: relative; height: 120px">
            <KLoading v-model="show" local :type="t" :theme="isDarkColors ? 'dark' : 'light'" :text="`${t} 加载`" />
          </div>
        </KCard>
      </div>
    </DemoBlock>

    <!-- 2. 菊花样式 -->
    <DemoBlock title="菊花样式" description="spinnerType：spinner 双弧咬合 / circle 圆点脉冲 / arc 经典弧线追逐（Element Plus 风格：整体旋转 + 弧长相位变化）。" :code="spinnerKindCode">
      <div class="case-head">
        <ThemeSwitch v-model="isDarkKinds" />
      </div>
      <div class="demo-grid">
        <KCard header="spinner" class="demo-card">
          <div class="demo-cell" style="position: relative; height: 120px">
            <KLoading v-model="show" local type="info" :theme="isDarkKinds ? 'dark' : 'light'" spinner-type="spinner" text="spinner 双弧咬合" />
          </div>
        </KCard>
        <KCard header="circle" class="demo-card">
          <div class="demo-cell" style="position: relative; height: 120px">
            <KLoading v-model="show" local type="success" :theme="isDarkKinds ? 'dark' : 'light'" spinner-type="circle" text="circle 圆点脉冲" />
          </div>
        </KCard>
        <KCard header="arc" class="demo-card">
          <div class="demo-cell" style="position: relative; height: 120px">
            <KLoading v-model="show" local type="warning" :theme="isDarkKinds ? 'dark' : 'light'" spinner-type="arc" text="arc 经典弧线追逐" />
          </div>
        </KCard>
      </div>
    </DemoBlock>

    <!-- 3. 尺寸 -->
    <DemoBlock title="尺寸" description="size 控制菊花大小（px）。" :code="sizeCode">
      <div class="case-head">
        <ThemeSwitch v-model="isDarkSizes" />
      </div>
      <div class="demo-grid">
        <KCard v-for="s in [24, 32, 48]" :key="s" :header="`${s}px`" class="demo-card">
          <div class="demo-cell" style="position: relative; height: 120px">
            <KLoading v-model="show" local type="info" :theme="isDarkSizes ? 'dark' : 'light'" :size="s" :text="`${s}px`" />
          </div>
        </KCard>
      </div>
    </DemoBlock>

    <!-- 4. 亮暗主题遮罩 -->
    <DemoBlock title="亮色 / 暗色遮罩" description="切换右上角 KSwitch：暗色为半透明黑遮罩，亮色为半透明白遮罩，文字/菊花仍随 type 颜色。" :code="themeCode">
      <div class="case-head">
        <ThemeSwitch v-model="isDarkTheme" />
      </div>
      <div class="demo-grid">
        <KCard header="同一个 Loading" class="demo-card demo-card--wide">
          <div class="demo-cell" style="position: relative; height: 140px">
            <KLoading v-model="show" local type="info" :theme="isDarkTheme ? 'dark' : 'light'" text="主题切换演示" />
          </div>
        </KCard>
      </div>
    </DemoBlock>

    <!-- 5. 自定义图标 / 图片 -->
    <DemoBlock
      title="自定义图标 / 图片"
      description="#default 插槽可放入任意图标、图片或自定义内容，最灵活。"
      :code="customIconCode"
    >
      <div class="case-head">
        <ThemeSwitch v-model="isDarkIcon" />
      </div>
      <div class="demo-grid">
        <KCard header="自定义图标" class="demo-card">
          <div class="demo-cell" style="position: relative; height: 120px">
            <KLoading v-model="show" local type="info" :theme="isDarkIcon ? 'dark' : 'light'" text="加载图片…">
              <template #default>
                <KIcon name="picture-filling" style="font-size: 32px" />
              </template>
            </KLoading>
          </div>
        </KCard>
        <KCard header="自定义内容" class="demo-card">
          <div class="demo-cell" style="position: relative; height: 120px">
            <KLoading v-model="show" local type="warning" :theme="isDarkIcon ? 'dark' : 'light'">
              <template #default>
                <KIcon name="time" style="font-size: 28px" />
              </template>
              <template #text>坐稳了，正在拉数据</template>
            </KLoading>
          </div>
        </KCard>
      </div>
    </DemoBlock>

    <!-- 6. 自定义文案 -->
    <DemoBlock
      title="自定义文案"
      description="text prop 设置文案；#text 插槽自定义文案结构。"
      :code="customTextCode"
    >
      <div class="case-head">
        <ThemeSwitch v-model="isDarkText" />
      </div>
      <div class="demo-grid">
        <KCard header="text prop" class="demo-card">
          <div class="demo-cell" style="position: relative; height: 120px">
            <KLoading v-model="show" local type="primary" :theme="isDarkText ? 'dark' : 'light'" text="加载中，请稍候…" />
          </div>
        </KCard>
        <KCard header="#text 插槽" class="demo-card">
          <div class="demo-cell" style="position: relative; height: 120px">
            <KLoading v-model="show" local type="success" :theme="isDarkText ? 'dark' : 'light'">
              <template #text>正在同步数据...</template>
            </KLoading>
          </div>
        </KCard>
      </div>
    </DemoBlock>

    <!-- 7. 背景透明度 -->
    <DemoBlock title="背景透明度" description="opacity 控制遮罩透明度（0-1）。缺省 background 时暗色用黑、亮色用白，随上方 KSwitch 联动。" :code="opacityCode">
      <div class="case-head">
        <ThemeSwitch v-model="isDarkOpacity" />
      </div>
      <div class="demo-grid">
        <KCard v-for="o in [0.2, 0.5, 0.8]" :key="o" :header="`opacity ${o}`" class="demo-card">
          <div class="demo-cell" style="position: relative; height: 120px">
            <KLoading v-model="show" local type="info" :theme="isDarkOpacity ? 'dark' : 'light'" :opacity="o" :text="`opacity ${o}`" />
          </div>
        </KCard>
      </div>
    </DemoBlock>

    <!-- 8. 遮罩类型（毛玻璃） -->
    <DemoBlock title="遮罩类型（毛玻璃）" description="maskType 控制遮罩类型：dimmed 蒙层（默认）/ blur 毛玻璃（透传 KOverlay，蒙层背景不变 + backdrop-filter: blur(4px)，local 局部模式同样生效）。" :code="maskTypeCode">
      <MaskTypeDemo />
    </DemoBlock>

    <!-- 9. 局部区块交互 -->
    <DemoBlock
      title="局部区块加载（local）"
      description="local 模式：absolute 覆盖父容器（父需 position:relative）。点击按钮在各自区块内加载。"
      :code="localInteractCode"
    >
      <div class="case-head">
        <ThemeSwitch v-model="isDarkLocal" />
      </div>
      <KButton type="primary" @click="boxA = true">区块 A 开始加载</KButton>
      <KButton type="success" style="margin-left: 8px" @click="boxB = true">区块 B 开始加载</KButton>
      <div class="demo-grid" style="margin-top: 16px">
        <KCard header="区块 A (success)" class="demo-card">
          <div class="demo-cell" style="position: relative; height: 120px">
            <p style="color: var(--k-color-text-secondary)">区块 A 内容</p>
            <KLoading v-model="boxA" local type="success" :theme="isDarkLocal ? 'dark' : 'light'" text="区块 A 加载中…" />
          </div>
        </KCard>
        <KCard header="区块 B (warning)" class="demo-card">
          <div class="demo-cell" style="position: relative; height: 120px">
            <p style="color: var(--k-color-text-secondary)">区块 B 内容</p>
            <KLoading v-model="boxB" local type="warning" :theme="isDarkLocal ? 'dark' : 'light'" spinner-type="circle" text="区块 B 加载中…" />
          </div>
        </KCard>
      </div>
    </DemoBlock>

    <!-- 9. 服务方式 -->
    <DemoBlock
      title="服务方式（全屏单例）"
      description="useLoading().open() / Loading.service({...}) 返回实例，close() 关闭；全屏默认单例防叠加，遮罩底色随文档暗色主题。"
      :code="serviceCode"
    >
      <div class="k-btn-group-service">
        <KButton type="primary" @click="showFullSpinner">全屏 spinner</KButton>
        <KButton type="success" @click="showFullCircle">全屏 circle（黑底）</KButton>
        <KButton type="error" @click="showFullError">全屏 error（白底）</KButton>
      </div>
    </DemoBlock>

    <!-- 10. v-loading 指令 -->
    <DemoBlock
      title="v-loading 指令（Element Plus 风格）"
      description="用 KCard 作为展示容器，v-loading 绑定布尔/字符串/对象，按钮触发加载 2 秒自动关闭。指令自动管理遮罩，不侵入目标组件。"
      :code="directiveCode"
    >
      <directive-demo />
    </DemoBlock>

    <!-- API 表格 -->
    <section class="loading-demo__api">
      <h2>API</h2>
      <APITable :props="apiProps" :emits="apiEmits" :slots="apiSlots" />
    </section>
  </section>
</template>

<style scoped lang="scss">
.loading-demo {
  padding: 24px;
  box-sizing: border-box;  // 只在本页面生效，不影响其它页面

  p {
    color: var(--k-color-text-secondary);
    margin-bottom: 24px;
  }

  &__tip {
    margin-top: -12px;
    font-size: 13px;
  }

  .case-head {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 16px;
  }

  .demo-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    border-radius: 8px;
    padding: 12px;
    /* 外层背景固定为中性的页面底色，不随亮/暗切换变化（切换只影响遮罩本身） */
    background: var(--k-color-bg-tertiary, rgba(0, 0, 0, 0.03));
  }

  .k-btn-group-service {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .demo-card {
    flex: 1 1 180px;
    min-width: 160px;

    :deep(.k-card__body) {
      height: 100%;
    }

    &--wide {
      flex: 1 1 360px;
      min-width: 280px;
      max-width: 420px;
    }
  }

  .demo-cell {
    width: 100%;
  }

  &__api {
    margin-top: 56px;
    padding-top: 32px;
    border-top: 1px solid var(--k-color-border);

    h2 {
      margin: 0 0 16px;
      font-size: 20px;
      font-weight: 600;
    }
  }
}
</style>

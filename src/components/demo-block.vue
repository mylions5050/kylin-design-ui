<script setup lang="ts">
import { ref, computed } from 'vue'
import { message } from '@/components/message/useMessage'
import hljs from 'highlight.js/lib/core'
import xml from 'highlight.js/lib/languages/xml'
import css from 'highlight.js/lib/languages/css'
import scss from 'highlight.js/lib/languages/scss'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import json from 'highlight.js/lib/languages/json'

// 按需注册高亮语言（Vue SFC 用 xml 语言即可覆盖 <template> + <script> 混合结构）
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('vue', xml)
hljs.registerLanguage('css', css)
hljs.registerLanguage('scss', scss)
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('json', json)

const props = defineProps<{
  title: string
  description?: string
  /** 要展示的源码字符串（通常用 ?raw 导入）。传入后出现「查看源码 / 复制」能力。 */
  code?: string
}>()

/** 是否已展开代码区 */
const showCode = ref(false)

/** 对整份 SFC 源码做混合高亮（xml 语言自带对 <script> 的子语言高亮） */
const highlightedCode = computed(() => {
  if (!props.code) return ''
  try {
    return hljs.highlight(props.code, { language: 'vue' }).value
  } catch {
    return props.code
  }
})

/** 复制按钮态：'idle' | 'success' */
const copyState = ref<'idle' | 'success'>('idle')

const toggleCode = () => {
  showCode.value = !showCode.value
}

const copyCode = async () => {
  if (!props.code) return
  try {
    await navigator.clipboard.writeText(props.code)
    copyState.value = 'success'
    message.success('代码已复制')
    setTimeout(() => {
      copyState.value = 'idle'
    }, 1500)
  } catch {
    message.error('复制失败，请手动复制')
  }
}

const copyLabel = () => (copyState.value === 'success' ? '已复制' : '复制')
</script>

<template>
  <section class="demo-block">
    <header class="demo-block__header">
      <div class="demo-block__title">
        <h2>{{ title }}</h2>
        <p v-if="description">{{ description }}</p>
      </div>
      <!-- 有源码时提供「查看源码 / 复制」操作 -->
      <div v-if="code" class="demo-block__actions">
        <button type="button" class="demo-block__action" @click="toggleCode">
          {{ showCode ? '收起源码' : '查看源码' }}
        </button>
        <button type="button" class="demo-block__action" @click="copyCode">
          {{ copyLabel() }}
        </button>
      </div>
    </header>
    <div class="demo-block__body">
      <slot />
    </div>
    <!-- 代码区：默认折叠，展开后展示（hljs 高亮） -->
    <div v-if="code" class="demo-block__code" :class="{ 'demo-block__code--open': showCode }">
      <pre><code class="hljs" v-html="highlightedCode"></code></pre>
    </div>
  </section>
</template>

<style scoped lang="scss">
.demo-block {
  margin-bottom: 32px;
  border: 1px solid var(--k-color-border);
  border-radius: 8px;
  overflow: hidden;

  &__header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    padding: 16px 20px;
    border-bottom: 1px solid var(--k-color-border);
    background: var(--k-color-bg-secondary);

    h2 {
      margin: 0 0 4px;
      font-size: 16px;
      font-weight: 600;
    }

    p {
      margin: 0;
      font-size: 13px;
      color: var(--k-color-text-secondary);
    }
  }

  &__title {
    min-width: 0;
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }

  &__action {
    padding: 4px 10px;
    font-size: 13px;
    line-height: 20px;
    color: var(--k-color-text-secondary);
    background: var(--k-color-bg);
    border: 1px solid var(--k-color-border);
    border-radius: 4px;
    cursor: pointer;
    transition: color 0.2s, border-color 0.2s, background 0.2s;

    &:hover {
      color: var(--k-color-primary);
      border-color: var(--k-color-primary);
      background: var(--k-color-bg-selected);
    }
  }

  &__body {
    padding: 20px;
    background: var(--k-color-bg);
  }

  &__code {
    display: none;
    border-top: 1px solid var(--k-color-border);

    pre {
      margin: 0;
      padding: 16px 20px;
      overflow: auto;
      background: var(--k-code-bg, var(--k-color-bg-tertiary));
    }

    code {
      font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
      font-size: 13px;
      line-height: 1.6;
      color: var(--k-code-text, var(--k-color-text));
      white-space: pre;
    }

    // ---- hljs 高亮 token 配色 ----
    // 颜色统一走全局 --k-code-* 变量，由 tokens.scss 里的
    // [data-theme='dark'] 自动切换，此处无需再写暗色分支。
    :deep(.hljs-keyword),
    :deep(.hljs-selector-tag),
    :deep(.hljs-doctag),
    :deep(.hljs-deletion) {
      color: var(--k-code-keyword);
    }

    :deep(.hljs-string),
    :deep(.hljs-regexp),
    :deep(.hljs-addition),
    :deep(.hljs-attribute),
    :deep(.hljs-attr) {
      color: var(--k-code-string);
    }

    :deep(.hljs-comment),
    :deep(.hljs-quote) {
      color: var(--k-code-comment);
      font-style: italic;
    }

    :deep(.hljs-number),
    :deep(.hljs-literal),
    :deep(.hljs-symbol),
    :deep(.hljs-bullet) {
      color: var(--k-code-number);
    }

    :deep(.hljs-tag),
    :deep(.hljs-name),
    :deep(.hljs-built_in),
    :deep(.hljs-type) {
      color: var(--k-code-tag);
    }

    :deep(.hljs-title),
    :deep(.hljs-title.class_),
    :deep(.hljs-function .hljs-title) {
      color: var(--k-code-class);
      font-weight: 600;
    }

    :deep(.hljs-variable),
    :deep(.hljs-template-variable),
    :deep(.hljs-params) {
      color: var(--k-code-text);
    }

    &--open {
      display: block;
    }
  }
}
</style>

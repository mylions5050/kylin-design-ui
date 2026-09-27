<script setup lang="ts">
import { ref } from 'vue'
import KCollapse from '@/components/collapse/index'

// 幽灵模式：根节点与面板分割线全部无边框、完全透明（AntD ghost 同款），适合嵌在有背景色的容器里
const activeKeys = ref<(string | number)[]>(['a'])

const items = [
  { key: 'a', label: 'This is panel header 1', children: 'A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.' },
  { key: 'b', label: 'This is panel header 2', children: '幽灵模式下面板之间没有分割线，仅靠头部内边距分区。' },
  { key: 'c', label: 'This is panel header 3', children: '适合嵌套在卡片、背景色块等有底色的容器中。' },
]
</script>

<template>
  <div class="ghost-wrap">
    <p>这是包裹容器的一段背景内容，用于对比 ghost 的透明效果。</p>
    <KCollapse v-model="activeKeys" ghost :items="items" />
  </div>
</template>

<style scoped>
.ghost-wrap {
  padding: 16px;
  background: var(--k-color-bg-tertiary);
  border-radius: var(--k-border-radius);
}
</style>

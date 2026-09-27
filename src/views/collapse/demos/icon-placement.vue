<script setup lang="ts">
import { ref, computed } from 'vue'
import KCollapse from '@/components/collapse/index'
import KSwitch from '@/components/switch/index'

// expandIconPlacement：start 标题左侧（AntD 默认）/ end 整行最右（extra 之后）
const isEnd = ref(false)
const placement = computed(() => (isEnd.value ? 'end' : 'start'))
const activeKeys = ref(['1'])

const items = [
  { key: '1', label: '这是面板标题 1', children: '打开右侧开关，箭头会移动到整行最右（extra 之后）；关闭则回到标题左侧。' },
  { key: '2', label: '这是面板标题 2', children: '两种位置下展开/收起的箭头旋转动画保持一致。' },
]
</script>

<template>
  <div>
    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px">
      <span style="color: var(--k-color-text-secondary)">图标位置 end（整行最右）</span>
      <KSwitch v-model="isEnd" />
    </div>
    <KCollapse v-model="activeKeys" :items="items" :expand-icon-placement="placement" />
  </div>
</template>

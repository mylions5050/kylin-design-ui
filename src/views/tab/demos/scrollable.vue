<script setup lang="ts">
import { ref } from 'vue'
import KTab from '@/components/tab/index'
import KTabPane from '@/components/tab/pane'

const active = ref('tab-1')

// 足够多的选项以触发溢出
const tabs = Array.from({ length: 12 }, (_, i) => ({
  k: `tab-${i + 1}`,
  label: `标签 ${i + 1}`,
}))
</script>

<template>
  <div>
    <p class="tip">选项过多时可通过左右箭头或鼠标拖拽滚动查看，超出部分自动隐藏。</p>
    <div style="max-width: 600px">
      <KTab v-model="active" scrollable>
        <KTabPane
          v-for="t in tabs"
          :key="t.k"
          :k="t.k"
          :label="t.label"
        >
          {{ t.label }} 的面板内容
        </KTabPane>
      </KTab>
    </div>
  </div>
</template>

<style scoped>
.tip {
  margin-bottom: 12px;
  font-size: 13px;
  color: var(--k-color-text-secondary);
}
</style>

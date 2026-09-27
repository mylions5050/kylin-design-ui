<script setup lang="ts">
import { ref } from 'vue'
import KTooltip from '@/components/tooltip/index'
import KButton from '@/components/button/index'

/* ===== 手动触发 ===== */
const manualVisible = ref(false)
const manualRect = ref<DOMRect | null>(null)

const toggleManual = (e: MouseEvent) => {
  if (manualVisible.value) {
    manualVisible.value = false
  } else {
    manualRect.value = (e.currentTarget as HTMLElement).getBoundingClientRect()
    manualVisible.value = true
  }
}
</script>

<template>
  <div class="row">
    <KButton @click="toggleManual">
      手动触发（{{ manualVisible ? '隐藏' : '显示' }}）
    </KButton>

    <KTooltip
      trigger="manual"
      :visible="manualVisible"
      :anchor-rect="manualRect"
      content="基于按钮 rect 定位"
    />
  </div>
</template>

<style scoped lang="scss">
.row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}
</style>

<script setup lang="ts">
import { ref } from 'vue'
import KProgress from '@/components/progress/index'
import type { ProgressColorStop } from '@/components/progress/index'

const p = ref(20)
const customColor = ref('#409eff')
const customColors = ref<ProgressColorStop[]>([
  { color: '#f56c6c', percentage: 20 },
  { color: '#e6a23c', percentage: 40 },
  { color: '#5cb87a', percentage: 60 },
  { color: '#1677ff', percentage: 80 },
  { color: '#6f7ad3', percentage: 100 },
])
const customColorMethod = (percentage: number) => {
  if (percentage < 30) return '#909399'
  if (percentage < 70) return '#e6a23c'
  return '#67c23a'
}
</script>

<template>
  <div class="demo-group">
    <div class="demo-item">
      <label>color 字符串:</label>
      <KProgress :percentage="p" :color="customColor" />
    </div>
    <div class="demo-item">
      <label>color 函数（按进度返回颜色）:</label>
      <KProgress :percentage="p" :color="customColorMethod" />
    </div>
    <div class="demo-item">
      <label>color 分档数组:</label>
      <KProgress :percentage="p" :color="customColors" />
    </div>
    <div class="demo-item">
      <label>调整进度查看颜色变化:</label>
      <KProgress :percentage="p" :color="customColors" />
      <div class="btn-row">
        <button class="demo-btn" @click="p = Math.max(0, p - 10)">-</button>
        <button class="demo-btn" @click="p = Math.min(100, p + 10)">+</button>
        <span>当前：{{ p }}%</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../../date-picker/demos/common.scss";

.btn-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  font-size: 12px;
  color: var(--k-color-text-secondary);

  .demo-btn {
    width: 28px;
    height: 28px;
    border: 1px solid var(--k-color-border);
    border-radius: 4px;
    background: var(--k-color-bg);
    cursor: pointer;

    &:hover {
      border-color: var(--k-color-primary);
      color: var(--k-color-primary);
    }
  }
}
</style>

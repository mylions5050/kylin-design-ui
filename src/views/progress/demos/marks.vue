<script setup lang="ts">
import { ref } from 'vue'
import KProgress from '@/components/progress/index'
import type { ProgressMark } from '@/components/progress/index'

const p = ref(85)
const marks = ref<ProgressMark[]>([
  { percentage: 60, label: '60% 及格' },
  { percentage: 80, label: '80% 良好' },
  { percentage: 90, label: '90% 优秀' },
  { percentage: 100, label: '100% 满分' },
])
</script>

<template>
  <div class="demo-group">
    <div class="demo-item">
      <label>打点 + hover 悬浮详情（KTooltip）:</label>
      <KProgress :percentage="p" :marks="marks" />
    </div>
    <div class="demo-item">
      <label>打点 + 详情展示在下方（mark-placement="bottom"）:</label>
      <KProgress :percentage="p" :marks="marks" mark-placement="bottom" />
    </div>
    <div class="demo-item">
      <label>打点 + 详情展示在上方（mark-placement="top"）:</label>
      <KProgress :percentage="p" :marks="marks" mark-placement="top" />
    </div>
    <div class="demo-item">
      <label>调整进度观察打点染色（已达到的打点染进度色）:</label>
      <KProgress :percentage="p" :marks="marks" mark-placement="bottom" />
      <div class="btn-row">
        <button class="demo-btn" @click="p = Math.max(0, p - 5)">-</button>
        <button class="demo-btn" @click="p = Math.min(100, p + 5)">+</button>
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

<script setup lang="ts">
import { ref } from 'vue'
import KProgress from '@/components/progress/index'

const p = ref(50)
</script>

<template>
  <div class="demo-group">
    <div class="demo-item">
      <label>步骤进度条（steps=5，gap 控制间隔）:</label>
      <KProgress :percentage="p" :steps="5" :stroke-width="12" />
      <KProgress :percentage="p" :steps="5" :stroke-width="12" :gap="8" status="success" />
    </div>
    <div class="demo-item">
      <label>步骤进度圈（steps=5，gapDegree 控制段间角度间隔）:</label>
      <div class="circle-row">
        <KProgress type="circle" :percentage="p" :steps="5" :gap-degree="20" :stroke-width="8" />
        <KProgress type="circle" :percentage="p" :steps="5" :gap-degree="20" :stroke-width="8" status="success" />
        <KProgress type="circle" :percentage="p" :steps="5" :gap-degree="20" :stroke-width="8" status="exception" />
      </div>
    </div>
    <div class="demo-item">
      <label>调整进度（填充段数 = floor(steps × 百分比 / 100)）:</label>
      <KProgress :percentage="p" :steps="5" :stroke-width="12" />
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

.circle-row {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.demo-item .k-progress + .k-progress {
  margin-top: 12px;
  max-width: 600px;
}

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

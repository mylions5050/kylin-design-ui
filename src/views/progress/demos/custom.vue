<script setup lang="ts">
import KProgress from '@/components/progress/index'
</script>

<template>
  <div class="demo-group">
    <div class="demo-item">
      <label>默认插槽替换文字:</label>
      <KProgress :percentage="50">
        <span style="font-size: 12px">上传中…</span>
      </KProgress>
    </div>
    <div class="demo-item">
      <label>环形插槽自定义中心内容:</label>
      <KProgress type="dashboard" :percentage="80">
        <span style="font-size: 24px; font-weight: 600">80%</span>
        <span style="font-size: 12px; color: var(--k-color-text-secondary)">Progressing</span>
      </KProgress>
    </div>
    <div class="demo-item">
      <label>indeterminate 流动动画（百分比随动画 0→99 循环）:</label>
      <KProgress :percentage="50" indeterminate :stroke-width="10" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../../date-picker/demos/common.scss";

.demo-item .k-progress {
  max-width: 400px;
}
</style>

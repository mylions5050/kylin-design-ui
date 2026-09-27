<script setup lang="ts">
import KButton from '@/components/button/index'
</script>

<template>
  <div class="square-demo">
    <p class="label">默认 20px：</p>
    <div class="row">
      <KButton square type="default" icon="add" />
      <KButton square type="primary" icon="add" />
      <KButton square type="success" icon="add" />
      <KButton square type="error" icon="add" />
    </div>

    <p class="label">自定义宽高（24px / 32px）：</p>
    <div class="row">
      <KButton square width="24" height="24" type="primary" icon="search" />
      <KButton square width="32" height="32" type="primary" icon="add" />
      <KButton :width="36" :height="36" square type="info" icon="user" />
    </div>

    <p class="label">常规能力（plain / round / disabled / loading）：</p>
    <div class="row">
      <KButton square width="28" height="28" type="primary" plain icon="setting" />
      <KButton square width="28" height="28" type="warning" round icon="delete" />
      <KButton square width="28" height="28" type="error" disabled icon="close" />
      <KButton square width="28" height="28" type="primary" loading />
    </div>

    <p class="label">自定义样式 / 背景色：</p>
    <div class="row">
      <KButton square width="30" height="30" :style="{ background: '#7c3aed', borderColor: '#7c3aed' }" icon="add" />
      <KButton square width="30" height="30" type="default" :style="{ background: '#f0fdf4', color: '#16a34a' }" icon="check-item" />
    </div>
  </div>
</template>

<style scoped>
.square-demo {
  .label {
    margin: 12px 0 8px;
    font-size: 13px;
    color: var(--k-color-text-secondary);
    &:first-child {
      margin-top: 0;
    }
  }

  .row {
    display: flex;
    gap: 12px;
    align-items: center;
    flex-wrap: wrap;
  }
}
</style>

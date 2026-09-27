<script setup lang="ts">
import KCard from '@/components/card/index'
</script>

<template>
  <div style="display: flex; gap: 16px; flex-wrap: wrap;">
    <KCard header="无边框" size="small" shadow="never" style="width: 200px;">
      <p class="card-text">默认无边框</p>
    </KCard>
    <KCard header="有边框" size="small" border shadow="never" style="width: 200px;">
      <p class="card-text">border 设为 true</p>
    </KCard>
    <KCard header="边框 + 阴影" size="small" border style="width: 200px;">
      <p class="card-text">同时有边框和阴影</p>
    </KCard>
  </div>
</template>

<style scoped lang="scss">
.card-text {
  margin: 0 0 8px;
  font-size: 14px;
  color: var(--k-color-text);
  line-height: 22px;

  &:last-child {
    margin-bottom: 0;
  }
}
</style>

<script setup lang="ts">
import KCheckbox from '@/components/checkbox/index'
</script>

<template>
  <div class="row">
    <KCheckbox checked disabled>已选-禁用</KCheckbox>
    <KCheckbox disabled>未选-禁用</KCheckbox>
    <KCheckbox indeterminate disabled>半选-禁用</KCheckbox>
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

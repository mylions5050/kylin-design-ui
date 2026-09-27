<script setup lang="ts">
import KCheckbox from '@/components/checkbox/index'
</script>

<template>
  <div class="row">
    <KCheckbox checked>已选</KCheckbox>
    <KCheckbox indeterminate>半选</KCheckbox>
    <KCheckbox>未选</KCheckbox>
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

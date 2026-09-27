<script setup lang="ts">
import KCheckbox from '@/components/checkbox/index'
</script>

<template>
  <div class="row">
    <KCheckbox checked />
    <KCheckbox />
    <KCheckbox indeterminate />
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

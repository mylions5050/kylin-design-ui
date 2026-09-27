<script setup lang="ts">
import { KRow, KCol } from '@/components/grid'
</script>

<template>
  <KRow :gutter="20">
    <KCol :span="8"><div class="cell">8</div></KCol>
    <KCol :span="8"><div class="cell">8</div></KCol>
    <KCol :span="8"><div class="cell">8</div></KCol>
  </KRow>
</template>

<style scoped lang="scss">
.cell {
  color: #fff;
  border-radius: 4px;
  padding: 12px 0;
  text-align: center;
  font-size: 13px;
  background: #0a96e6;
}
</style>

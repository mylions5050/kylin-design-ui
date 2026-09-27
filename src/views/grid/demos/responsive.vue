<script setup lang="ts">
import { KRow, KCol } from '@/components/grid'
</script>

<template>
  <KRow :gutter="10">
    <KCol :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
      <div class="cell">xs24 / sm12 / md8 / lg6 / xl4</div>
    </KCol>
    <KCol :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
      <div class="cell">xs24 / sm12 / md8 / lg6 / xl4</div>
    </KCol>
    <KCol :xs="24" :sm="24" :md="8" :lg="12" :xl="16">
      <div class="cell">xs24 / sm24 / md8 / lg12 / xl16</div>
    </KCol>
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

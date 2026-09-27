<script setup lang="ts">
import { KRow, KCol } from '@/components/grid'
</script>

<template>
  <div class="rows">
  <KRow :gutter="20">
    <KCol :span="6"><div class="cell">span 6</div></KCol>
    <KCol :span="6" :offset="6"><div class="cell">span 6, offset 6</div></KCol>
  </KRow>
  <KRow :gutter="20">
    <KCol :span="6" :offset="6"><div class="cell">span 6, offset 6</div></KCol>
    <KCol :span="6" :offset="6"><div class="cell">span 6</div></KCol>
  </KRow>
  <KRow :gutter="20">
    <KCol :span="12" :offset="6"><div class="cell">span 12, offset 6</div></KCol>
  </KRow>
  </div>
</template>

<style scoped lang="scss">
/* k-row 不再自带 margin-bottom，多行块间距交给容器 gap */
.rows {
  display: grid;
  gap: 12px;
}

.cell {
  color: #fff;
  border-radius: 4px;
  padding: 12px 0;
  text-align: center;
  font-size: 13px;
  background: #0a96e6;
}
</style>

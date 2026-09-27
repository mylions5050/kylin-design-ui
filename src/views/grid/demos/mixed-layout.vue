<script setup lang="ts">
import { KRow, KCol } from '@/components/grid'
</script>

<template>
  <div class="rows">
  <KRow :gutter="20">
    <KCol :span="16"><div class="cell">8</div></KCol>
    <KCol :span="8"><div class="cell">8</div></KCol>
  </KRow>
  <KRow :gutter="20">
    <KCol :span="8"><div class="cell">8</div></KCol>
    <KCol :span="8"><div class="cell">8</div></KCol>
    <KCol :span="4"><div class="cell">8</div></KCol>
    <KCol :span="4"><div class="cell">8</div></KCol>
  </KRow>
  <KRow :gutter="20">
    <KCol :span="4"><div class="cell">8</div></KCol>
    <KCol :span="16"><div class="cell">8</div></KCol>
    <KCol :span="4"><div class="cell">8</div></KCol>
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

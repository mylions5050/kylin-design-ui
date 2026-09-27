<script setup lang="ts">
import { KRow, KCol } from '@/components/grid'
</script>

<template>
  <KRow class="align-row">
    <KCol :span="6">
      <div class="cell">span="6"</div>
    </KCol>
    <KCol :span="6">
      <div class="cell_light">span="6"</div>
    </KCol>
    <KCol :span="6">
      <div class="cell">span="6"</div>
    </KCol>
  </KRow>

  <KRow justify="center" align="middle" class="align-row">
    <KCol :span="6"><div class="cell">center</div></KCol>
    <KCol :span="6"><div class="cell_light">middle</div></KCol>
    <KCol :span="6"><div class="cell">middle</div></KCol>
  </KRow>

  <KRow justify="space-between" align="bottom" class="align-row">
    <KCol :span="6"><div class="cell">left</div></KCol>
    <KCol :span="6"><div class="cell">right</div></KCol>
  </KRow>
</template>

<style scoped lang="scss">
.align-row {
  margin-bottom: 10px;
  height: 56px;
  background: #f0f5fc;
  border-radius: 4px;
}

.cell, .cell_light {
  color: #fff;
  border-radius: 4px;
  padding: 12px 0;
  text-align: center;
  font-size: 13px;
}
.cell {
  background: #0a96e6;
}
.cell_light {
  background: #ccecff;
  color: #0a96e6;
}
</style>

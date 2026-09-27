<script setup lang="ts">
import { KRow, KCol } from '@/components/grid'
</script>

<template>
  <div class="rows">
    <KRow :row-gutter="12">
      <KCol :span="24"><div class="cell">24</div></KCol>
    </KRow>
    <KRow :row-gutter="12">
      <KCol :span="12"><div class="cell">12</div></KCol>
      <KCol :span="12"><div class="cell_light">12</div></KCol>
    </KRow>
    <KRow :row-gutter="12">
      <KCol :span="8"><div class="cell">8</div></KCol>
      <KCol :span="8"><div class="cell_light">8</div></KCol>
      <KCol :span="8"><div class="cell">8</div></KCol>
    </KRow>
    <KRow :row-gutter="12">
      <KCol :span="6"><div class="cell">6</div></KCol>
      <KCol :span="6"><div class="cell_light">6</div></KCol>
      <KCol :span="6"><div class="cell">6</div></KCol>
      <KCol :span="6"><div class="cell_light">6</div></KCol>
    </KRow>
    <KRow>
      <KCol :span="4"><div class="cell">4</div></KCol>
      <KCol :span="4"><div class="cell_light">4</div></KCol>
      <KCol :span="4"><div class="cell">4</div></KCol>
      <KCol :span="4"><div class="cell_light">4</div></KCol>
      <KCol :span="4"><div class="cell">4</div></KCol>
      <KCol :span="4"><div class="cell_light">4</div></KCol>
    </KRow>
  </div>
</template>

<style scoped lang="scss">
/* k-row 不再自带 margin-bottom，多行块间距交给容器 gap */
.rows {
  display: grid;
  gap: 12px;
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

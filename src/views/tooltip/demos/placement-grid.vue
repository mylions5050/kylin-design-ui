<script setup lang="ts">
import KTooltip from '@/components/tooltip/index'
import KButton from '@/components/button/index'

/* ===== 基础数组 ===== */
const simplePlacements = [
  'top',
  'top-start',
  'top-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'left',
  'left-start',
  'left-end',
  'right',
  'right-start',
  'right-end',
] as const
</script>

<template>
  <div class="grid-placement">
    <KTooltip
      v-for="p in simplePlacements"
      :key="p"
      :placement="p"
      :content="p"
      theme="dark"
    >
      <KButton size="small" class="uniform-button">{{ p }}</KButton>
    </KTooltip>
  </div>
</template>

<style scoped lang="scss">
.grid-placement {
  margin: auto;
  width: 600px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  justify-content: center;

  .uniform-button {
    width: 100%;
    min-width: 120px;
    justify-content: center;
  }
}
</style>

<script setup lang="ts">
import KTooltip from '@/components/tooltip/index'
import KButton from '@/components/button/index'

const sizes = ['small', 'middle', 'large'] as const
</script>

<template>
  <div class="row">
    <KTooltip
      v-for="s in sizes"
      :key="s"
      :size="s"
      :content="`size = ${s}`"
    >
      <KButton :size="s">
        {{ s }}
      </KButton>
    </KTooltip>
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

<script setup lang="ts">
import KTooltip from '@/components/tooltip/index'
import KButton from '@/components/button/index'
</script>

<template>
  <div class="row">
    <KTooltip>
      <KButton>插槽内容</KButton>
      <template #content>
        自定义 <strong class="emph">HTML</strong> 内容
      </template>
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

.emph {
  color: var(--k-color-primary);
}
</style>

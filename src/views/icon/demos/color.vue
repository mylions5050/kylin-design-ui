<script setup lang="ts">
import KIcon from '@/components/icon/index'
</script>

<template>
  <div class="samples">
    <KIcon name="check-item-filling" :size="20" color="#0A96E6" />
    <KIcon name="check-item-filling" :size="20" color="#b2d338" />
    <KIcon name="check-item-filling" :size="20" color="#fac004" />
    <KIcon name="check-item-filling" :size="20" color="#E2195D" />
    <span class="row danger"><KIcon name="warning-filling" :size="20" /> 跟随文字色</span>
  </div>
</template>

<style scoped lang="scss">
// 水平排列容器，gap 拉开不挤压
.samples {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.row {
  display: inline-flex;
  align-items: center;
  gap: 6px;

  &.danger {
    color: #e2195d;
  }
}
</style>

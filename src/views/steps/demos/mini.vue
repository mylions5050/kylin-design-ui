<script setup lang="ts">
import KSteps from '@/components/steps/index'
import type { KStepItem } from '@/components/steps/index'

const items: KStepItem[] = [
  { title: '选择套餐', description: '挑选你需要的套餐' },
  { title: '填写订单', description: '确认收货与支付信息' },
  { title: '完成支付', description: '支付成功后立即开通' },
]
</script>

<template>
  <div class="col">
    <KSteps :items="items" :current="1" size="mini" />
  </div>
</template>

<style scoped>
.col {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>
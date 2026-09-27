<script setup lang="ts">
import KSteps from '@/components/steps/index'
import type { KStepItem } from '@/components/steps/index'

const items1: KStepItem[] = [
  { title: '选择套餐', icon: 'select-bold', description: '挑选你需要的套餐', fill: true },
  { title: '填写订单', icon: 'select-bold', description: '确认收货与支付信息', fill: true },
  { title: '完成支付', icon: 'select-bold', description: '支付成功后立即开通', fill: true },
]

const items2: KStepItem[] = [
  { title: '选择套餐', icon: 'close-bold', description: '挑选你需要的套餐', fill: true },
  { title: '填写订单', icon: 'close-bold', description: '确认收货与支付信息', fill: true },
  { title: '完成支付', icon: 'close-bold', description: '支付成功后立即开通', fill: true },
]
</script>

<template>
  <div class="col">
    <p class="tip">设置 status="success" 后所有步骤都显示为 success 状态。</p>
    <KSteps :items="items1" :current="1" status="success" />
    <KSteps :items="items2" :current="1" status="error" />
  </div>
</template>

<style scoped>
.col {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.tip {
  margin: 0;
  font-size: 13px;
  color: var(--k-color-text-secondary);
}
</style>
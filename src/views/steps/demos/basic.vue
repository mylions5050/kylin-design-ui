<script setup lang="ts">
import { ref } from 'vue'
import KSteps from '@/components/steps/index'
import KButton from '@/components/button/index'
import type { KStepItem } from '@/components/steps/index'

const items: KStepItem[] = [
  { title: '选择套餐', description: '挑选你需要的套餐' },
  { title: '填写订单', description: '确认收货与支付信息' },
  { title: '完成支付', description: '支付成功后立即开通' },
]

const current = ref(1)
</script>

<template>
  <div class="col">
    <KSteps v-model:current="current" :items="items" />
    <div class="toolbar">
      <KButton :disabled="current <= 0" @click="current--">上一步</KButton>
      <KButton type="primary" :disabled="current >= items.length - 1" @click="current++">下一步</KButton>
      <span class="tip">当前第 {{ current + 1 }} 步 / 共 {{ items.length }} 步</span>
    </div>
  </div>
</template>

<style scoped>
.col {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
}
.tip {
  font-size: 13px;
  color: var(--k-color-text-secondary);
}
</style>
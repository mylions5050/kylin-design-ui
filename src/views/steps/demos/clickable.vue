<script setup lang="ts">
import { ref } from 'vue'
import KSteps from '@/components/steps/index'
import type { KStepItem } from '@/components/steps/index'

const items: KStepItem[] = [
  { title: '基本信息' },
  { title: '联系方式' },
  { title: '开通权限' },
  { title: '完成' },
]

const current = ref(1)
</script>

<template>
  <div class="col">
    <KSteps v-model:current="current" :items="items" clickable />
    <p class="tip">当前第 {{ current + 1 }} 步 · 点击任一步骤直接切换</p>
  </div>
</template>

<style scoped>
.col {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.tip {
  margin: 0;
  font-size: 13px;
  color: var(--k-color-text-secondary);
}
</style>
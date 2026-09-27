<script setup lang="ts">
import { ref } from 'vue'
import KSteps from '@/components/steps/index'
import KButton from '@/components/button/index'
import type { KStepItem } from '@/components/steps/index'

const items: KStepItem[] = [
  { title: '提交申请', description: '填写并提交入驻申请表' },
  { title: '资质审核', description: '平台审核你的资质材料' },
  { title: '签约入驻', description: '在线签署入驻协议' },
  { title: '上架商品', description: '发布商品开始营业' },
]

const current = ref(2)
</script>

<template>
  <div class="row">
    <KSteps direction="vertical" v-model:current="current" :items="items" />
    <div class="side">
      <div class="buttons">
        <KButton :disabled="current <= 0" @click="current--">上一步</KButton>
        <KButton type="primary" :disabled="current >= items.length - 1" @click="current++">下一步</KButton>
      </div>
      <p class="tip">纵向布局，适合文字较多的步骤说明场景。</p>
    </div>
  </div>
</template>

<style scoped>
.row {
  display: flex;
  gap: 40px;
}
.side {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.tip {
  margin: 0;
  max-width: 280px;
  font-size: 13px;
  line-height: 1.7;
  color: var(--k-color-text-secondary);
}
.buttons {
  display: flex;
  gap: 12px;
}
</style>
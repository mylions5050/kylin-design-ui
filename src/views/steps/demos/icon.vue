<script setup lang="ts">
import KSteps from '@/components/steps/index'
import type { KStepItem } from '@/components/steps/index'

const items: KStepItem[] = [
  { title: '填写信息', icon: 'edit', fill: true, description: '填写基本资料' },
  { title: '身份核验', icon: 'browse', fill: true, status: 'success', description: '上传证件核验' },
  { title: '申请开通', icon: 'image-text', fill: true, status: 'error', description: '申请失败', tooltip: { content: '身份证图片模糊，无法识别内容', theme: 'light' } },
  { title: '审批驳回', icon: 'close', fill: true, status: 'error', description: '处理完成', tooltip: '需重新走流程' },
]
</script>

<template>
  <div class="col">
    <p class="tip">第一个步骤开启 fill 填充模式；第三步骤 hover 圆点可查看悬浮提示。</p>
    <KSteps :items="items" :current="2" />
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
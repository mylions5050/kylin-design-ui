<script setup lang="ts">
import { ref } from 'vue'
import KTag from '@/components/tag/index'

const closeLog = ref('')

function onClose() {
  closeLog.value = 'Tag 关闭事件触发'
}
</script>

<template>
  <div class="row">
    <KTag closable @close="onClose">可关闭标签</KTag>
    <KTag closable type="primary" @close="onClose">Primary Tag</KTag>
    <KTag closable type="success" @close="onClose">Success Tag</KTag>
  </div>
  <div class="row mt8">
    <span class="log">{{ closeLog || '暂无事件' }}</span>
  </div>
</template>

<style scoped lang="scss">
.row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

.mt8 {
  margin-top: 8px;
}

.log {
  font-size: 13px;
  color: var(--k-color-primary);
}
</style>

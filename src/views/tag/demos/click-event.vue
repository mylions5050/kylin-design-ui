<script setup lang="ts">
import { ref } from 'vue'
import KTag from '@/components/tag/index'

const closeLog = ref('')

function onClick() {
  closeLog.value = 'Tag 点击事件触发'
}
</script>

<template>
  <div class="row">
    <KTag @click="onClick">点击我</KTag>
    <KTag type="primary" @click="onClick">点击主要</KTag>
    <KTag type="success" icon="check-bold" @click="onClick">点击带图标</KTag>
  </div>
  <div class="row mt8">
    <span class="log">{{ closeLog }}</span>
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

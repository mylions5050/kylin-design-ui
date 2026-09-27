<script setup lang="ts">
import { ref } from 'vue'
import KSwitch from '@/components/switch/index'

const basicValue = ref(true)
</script>

<template>
  <div class="row">
    <KSwitch v-model="basicValue" />
    <span class="state">当前状态：{{ basicValue ? '开启' : '关闭' }}</span>
  </div>
</template>

<style scoped lang="scss">
.row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.state {
  margin: 8px 0 0;
  font-size: 13px;
  color: var(--k-color-text-secondary);
}
</style>

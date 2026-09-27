<script setup lang="ts">
import { ref } from 'vue'
import KSwitch from '@/components/switch/index'

const basicValue = ref(true)

const changeLog = ref('')

function onChange(value: boolean) {
  changeLog.value = `Switch changed to: ${value}`
}
</script>

<template>
  <div class="row">
    <KSwitch v-model="basicValue" @change="onChange" />
    <span class="state">{{ changeLog || '暂无事件' }}</span>
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

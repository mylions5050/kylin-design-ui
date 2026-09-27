<script setup lang="ts">
import { ref } from 'vue'
import KCheckbox from '@/components/checkbox/index'

const changeLog = ref('')
function onChange(v: boolean) {
  changeLog.value = String(v)
}
</script>

<template>
  <div class="row">
    <KCheckbox @change="onChange">点击我</KCheckbox>
  </div>
  <p class="state">change 事件：{{ changeLog || '—' }}</p>
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

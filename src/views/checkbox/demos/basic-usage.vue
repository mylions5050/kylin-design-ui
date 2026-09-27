<script setup lang="ts">
import { ref } from 'vue'
import KCheckbox from '@/components/checkbox/index'

const basic = ref(true)
</script>

<template>
  <div class="row">
    <KCheckbox v-model:checked="basic">选项 A</KCheckbox>
  </div>
  <p class="state">当前状态：{{ basic ? '选中' : '未选' }}</p>
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

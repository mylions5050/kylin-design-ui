<script setup lang="ts">
import { ref } from 'vue'
import KTransfer from '@/components/transfer/index'
import { mockData } from './data'

const targetKeys = ref([])
</script>

<template>
  <div class="demo-transfer">
    <KTransfer
      v-model="targetKeys"
      :data-source="mockData"
      :actions="['向右', '向左']"
      :list-style="{ width: 240, height: 300 }"
      :titles="['可选内容', '已选内容']"
    >
      <template #footer="{ direction }">
        <span class="demo-transfer__footer">
          {{ direction === 'left' ? `剩余 ${12 - targetKeys.length} 项` : `已选 ${targetKeys.length} 项` }}
        </span>
      </template>
    </KTransfer>
  </div>
</template>

<style scoped>
.demo-transfer__footer {
  font-size: 12px;
  color: var(--k-color-text-secondary);
}
</style>

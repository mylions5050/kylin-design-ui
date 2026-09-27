<script setup lang="ts">
import { ref } from 'vue'
import KTransfer from '@/components/transfer/index'
import { cityData } from './data'
import type { TransferItem } from '@/components/transfer'

const targetKeys = ref(['hz'])

// 自定义过滤：label 或描述任一命中即可
const filterOption = (inputValue: string, item: TransferItem) => {
  const city = item as (typeof cityData)[number]
  return (
    city.label.toLowerCase().includes(inputValue.toLowerCase()) ||
    city.desc.toLowerCase().includes(inputValue.toLowerCase())
  )
}
</script>

<template>
  <div class="demo-transfer">
    <KTransfer
      v-model="targetKeys"
      :data-source="cityData"
      show-search
      :filter-option="filterOption"
    >
      <template #item="{ item }">
        <span class="demo-transfer__city">
          <span class="demo-transfer__city-label">{{ item.label }}</span>
          <span class="demo-transfer__city-desc">{{ item.desc }}</span>
        </span>
      </template>
    </KTransfer>
  </div>
</template>

<style scoped>
.demo-transfer__city {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.demo-transfer__city-desc {
  font-size: 12px;
  color: var(--k-text-color-secondary, #909399);
}
</style>

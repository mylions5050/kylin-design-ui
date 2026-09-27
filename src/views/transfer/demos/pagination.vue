<script setup lang="ts">
import { ref } from 'vue'
import KTransfer from '@/components/transfer/index'
import type { TransferItem } from '@/components/transfer'

// 23 条数据，pageSize 10 → 两页以上
const bigData: TransferItem[] = Array.from({ length: 23 }, (_, i) => ({
  key: i + 1,
  label: `数据项 ${i + 1}`,
}))

const targetKeys = ref([])
</script>

<template>
  <div class="demo-transfer">
    <KTransfer
      v-model="targetKeys"
      :data-source="bigData"
      show-pagination
      :page-size="10"
      show-search
    />
  </div>
</template>

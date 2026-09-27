<script setup lang="ts">
import { ref } from 'vue'
import KPagination from '@/components/pagination/index'
import KButton from '@/components/button/index'

const dynamicTotal = ref(100)
const dynamicPage = ref(1)

const totals = [10, 50, 100, 500, 1000]
const currentTotalIdx = ref(2)

const switchTotal = () => {
  currentTotalIdx.value = (currentTotalIdx.value + 1) % totals.length
  dynamicTotal.value = totals[currentTotalIdx.value]
  dynamicPage.value = 1
}
</script>

<template>
  <div class="pagination-wrapper">
    <KPagination
      :current-page="dynamicPage"
      :page-size="10"
      :total="dynamicTotal"
      @change="dynamicPage = $event.page"
    />
  </div>
  <div class="demo-buttons" style="margin-top: 12px;">
    <KButton @click="switchTotal">切换数据量（当前：{{ dynamicTotal }}）</KButton>
  </div>
  <p class="current-info">当前数据总量：{{ dynamicTotal }}，当前页码：{{ dynamicPage }}</p>
</template>

<style scoped lang="scss">
.pagination-wrapper {
  border: 1px solid var(--k-color-border-light);
  border-radius: var(--k-border-radius);
  overflow: hidden;
}

.current-info {
  margin: 8px 0 0;
  font-size: 13px;
  color: var(--k-color-text-tertiary);
}
</style>

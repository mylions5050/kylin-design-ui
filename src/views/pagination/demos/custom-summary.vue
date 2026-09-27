<script setup lang="ts">
import { ref } from 'vue'
import KPagination from '@/components/pagination/index'

const customSummaryPage = ref(1)
const customSummaryTotal = ref(200)
</script>

<template>
  <div class="pagination-wrapper">
    <KPagination
      :current-page="customSummaryPage"
      :page-size="10"
      :total="customSummaryTotal"
      @change="customSummaryPage = $event.page"
    >
      <template #summary>
        <span style="color: var(--k-color-primary); font-weight: 600;">
          第 {{ customSummaryPage }} / {{ Math.ceil(customSummaryTotal / 10) }} 页
        </span>
      </template>
    </KPagination>
  </div>
</template>

<style scoped lang="scss">
.pagination-wrapper {
  border: 1px solid var(--k-color-border-light);
  border-radius: var(--k-border-radius);
  overflow: hidden;
}
</style>

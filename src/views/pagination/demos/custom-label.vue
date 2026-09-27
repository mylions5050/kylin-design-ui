<script setup lang="ts">
import { ref } from 'vue'
import KPagination from '@/components/pagination/index'

const customPage = ref(1)
const customTotal = ref(42)
</script>

<template>
  <div class="pagination-wrapper">
    <KPagination
      :current-page="customPage"
      :page-size="10"
      :total="customTotal"
      entity-label="orders"
      @change="customPage = $event.page"
    />
  </div>
  <p class="current-info">当前页码：{{ customPage }}</p>
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

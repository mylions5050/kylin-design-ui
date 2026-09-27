<script setup lang="ts">
import { ref } from 'vue'
import KPagination from '@/components/pagination/index'

const simplePage = ref(7)
</script>

<template>
  <div class="pagination-wrapper">
    <KPagination
      :current-page="simplePage"
      :page-size="10"
      :total="1000"
      simple
      @change="simplePage = $event.page"
    />
  </div>
  <p class="current-info">当前页码：{{ simplePage }}</p>
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

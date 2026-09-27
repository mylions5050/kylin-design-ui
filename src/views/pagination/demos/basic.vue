<script setup lang="ts">
import { ref } from 'vue'
import KPagination from '@/components/pagination/index'

const basicPage = ref(1)
</script>

<template>
  <div class="pagination-wrapper">
    <KPagination
      :current-page="basicPage"
      :page-size="10"
      :total="100"
      @change="basicPage = $event.page"
    />
  </div>
  <p class="current-info">当前页码：{{ basicPage }}</p>
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

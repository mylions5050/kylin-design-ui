<script setup lang="ts">
import { ref } from 'vue'
import KPagination from '@/components/pagination/index'

const extPage = ref(1)
const extPageSize = ref(20)
const extTotal = ref(500)

const extChange = ref('')
</script>

<template>
  <div class="pagination-wrapper">
    <KPagination
      :current-page="extPage"
      :page-size="extPageSize"
      :total="extTotal"
      show-quick-jumper
      show-size-changer
      :page-size-options="[10, 20, 50, 100]"
      @change="(e: { page: number; pageSize: number }) => { extPage = e.page; extPageSize = e.pageSize; extChange = `第 ${e.page} 页，每页 ${e.pageSize} 条`; }"
      @update:page-size="extPageSize = $event"
    />
  </div>
  <p class="current-info">{{ extChange || `当前：第 ${extPage} 页，每页 ${extPageSize} 条` }}</p>
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

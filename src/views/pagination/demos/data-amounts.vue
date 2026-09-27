<script setup lang="ts">
import { ref } from 'vue'
import KPagination from '@/components/pagination/index'

const smallPage = ref(1)
const mediumPage = ref(1)
const largePage = ref(1)
</script>

<template>
  <div class="pagination-group">
    <div class="pagination-item">
      <p class="pagination-label">少量（8 条）</p>
      <KPagination
        :current-page="smallPage"
        :page-size="10"
        :total="8"
        @change="smallPage = $event.page"
      />
    </div>
    <div class="pagination-item">
      <p class="pagination-label">中等（50 条）</p>
      <KPagination
        :current-page="mediumPage"
        :page-size="10"
        :total="50"
        @change="mediumPage = $event.page"
      />
    </div>
    <div class="pagination-item">
      <p class="pagination-label">大量（500 条）</p>
      <KPagination
        :current-page="largePage"
        :page-size="10"
        :total="500"
        @change="largePage = $event.page"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.pagination-group {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.pagination-item {
  border: 1px solid var(--k-color-border-light);
  border-radius: var(--k-border-radius);
  overflow: hidden;
}

.pagination-label {
  margin: 0;
  padding: 8px 20px 0;
  font-size: 13px;
  color: var(--k-color-text-secondary);
}
</style>

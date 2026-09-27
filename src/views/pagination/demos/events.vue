<script setup lang="ts">
import { ref } from 'vue'
import KPagination from '@/components/pagination/index'

const interactivePage = ref(1)
const interactiveTotal = ref(50)
const interactiveLog = ref<string[]>([])

const log = (msg: string) => {
  interactiveLog.value.unshift(msg)
  if (interactiveLog.value.length > 5) interactiveLog.value.pop()
}
</script>

<template>
  <div class="pagination-wrapper">
    <KPagination
      :current-page="interactivePage"
      :page-size="10"
      :total="interactiveTotal"
      @change="(e: { page: number }) => { interactivePage = e.page; log(`跳转到第 ${e.page} 页`); }"
    />
  </div>
  <div class="event-log">
    <p class="event-log__title">操作日志：</p>
    <p v-for="(msg, i) in interactiveLog" :key="i" class="event-log__item">{{ msg }}</p>
    <p v-if="!interactiveLog.length" class="event-log__empty">暂无操作，点击分页试试</p>
  </div>
</template>

<style scoped lang="scss">
.pagination-wrapper {
  border: 1px solid var(--k-color-border-light);
  border-radius: var(--k-border-radius);
  overflow: hidden;
}

.event-log {
  margin-top: 12px;
  padding: 12px 16px;
  background: var(--k-color-bg-secondary);
  border-radius: var(--k-border-radius);
  font-size: 13px;
  font-family: monospace;

  &__title {
    margin: 0 0 4px;
    font-weight: 600;
    color: var(--k-color-text);
  }

  &__item {
    margin: 2px 0;
    color: var(--k-color-primary);
  }

  &__empty {
    margin: 2px 0;
    color: var(--k-color-text-tertiary);
  }
}
</style>

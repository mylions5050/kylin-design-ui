<script setup lang="ts">
import KBadge from '@/components/badge/index'

const statuses = [
  { status: 'success', label: 'Success' },
  { status: 'error', label: 'Error' },
  { status: 'default', label: 'Default' },
  { status: 'processing', label: 'Processing' },
  { status: 'warning', label: 'Warning' },
] as const
</script>

<template>
  <div class="badge-status">
    <div class="badge-row">
      <KBadge v-for="s in statuses" :key="s.status" :status="s.status" style="margin-right: 24px" />
    </div>
    <div class="badge-col">
      <KBadge v-for="s in statuses" :key="s.status" :status="s.status" :text="s.label" />
    </div>
  </div>
</template>

<style scoped>
.badge-row {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.badge-col {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>

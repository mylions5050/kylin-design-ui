<script setup lang="ts">
import { ref } from 'vue'
import KSelect from '@/components/select/index'
import type { SelectOption } from '@/components/select/types'

const disabledValue = ref('')
const readonlyValue = ref('')

const disabledOptions: SelectOption[] = [
  { label: '可用选项', value: 'enabled' },
  { label: '不可用选项', value: 'disabled' },
]
</script>

<template>
  <div class="demo-group">
    <div class="demo-item">
      <label>禁用状态:</label>
      <KSelect v-model="disabledValue" :options="disabledOptions" disabled placeholder="禁用状态" />
    </div>
    <div class="demo-item">
      <label>只读状态:</label>
      <KSelect v-model="readonlyValue" :options="disabledOptions" readonly placeholder="只读状态" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./common.scss";
</style>
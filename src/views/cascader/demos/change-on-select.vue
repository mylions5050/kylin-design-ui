<script setup lang="ts">
import { ref } from 'vue'
import KCascader from '@/components/cascader/index'
import { regionOptions } from './data'

const value = ref('')
</script>

<template>
  <div class="demo-any-level">
    <KCascader
      v-model="value"
      :options="regionOptions"
      change-on-select
      placeholder="选择任意一级"
    />
    <span class="demo-any-level__tip">
      changeOnSelect 开启后，点击任意一级即完成选择并回显完整路径。
    </span>
  </div>
</template>

<style scoped>
.demo-any-level {
  max-width: 360px;
}

.demo-any-level__tip {
  display: inline-block;
  margin-top: 12px;
  font-size: 14px;
  color: var(--k-color-text-secondary);
}
</style>

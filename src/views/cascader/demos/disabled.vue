<script setup lang="ts">
import { ref } from 'vue'
import KCascader from '@/components/cascader/index'
import { regionOptions } from './data'

const value = ref('')
</script>

<template>
  <div class="demo-disabled">
    <KCascader v-model="value" :options="regionOptions" disabled placeholder="整体禁用" />
    <span class="demo-disabled__tip">数据中广东（guangdong）为 disabled 选项，面板内置灰不可选。</span>
  </div>
</template>

<style scoped>
.demo-disabled {
  max-width: 360px;
}

.demo-disabled__tip {
  display: inline-block;
  margin-top: 12px;
  font-size: 14px;
  color: var(--k-color-text-secondary);
}
</style>

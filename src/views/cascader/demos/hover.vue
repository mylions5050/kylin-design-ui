<script setup lang="ts">
import { ref } from 'vue'
import KCascader from '@/components/cascader/index'
import { regionOptions } from './data'

const value = ref('')
</script>

<template>
  <div class="demo-hover-expand">
    <KCascader
      v-model="value"
      :options="regionOptions"
      expand-trigger="hover"
      placeholder="悬浮展开子级"
    />
    <span class="demo-hover-expand__tip">悬浮选项即展开下一级，点击叶子节点完成选择。</span>
  </div>
</template>

<style scoped>
.demo-hover-expand {
  max-width: 360px;
}

.demo-hover-expand__tip {
  display: inline-block;
  margin-top: 12px;
  font-size: 14px;
  color: var(--k-color-text-secondary);
}
</style>

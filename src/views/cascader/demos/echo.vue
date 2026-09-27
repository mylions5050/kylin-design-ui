<script setup lang="ts">
import { ref } from 'vue'
import KCascader from '@/components/cascader/index'
import { regionOptions } from './data'

const value = ref('xihu')
</script>

<template>
  <div class="demo-echo">
    <KCascader
      v-model="value"
      :options="regionOptions"
      clearable
      placeholder="请选择地区"
    />
    <span class="demo-echo__tip">默认选中并回显完整路径，悬浮触发器可清空。</span>
  </div>
</template>

<style scoped>
.demo-echo {
  max-width: 360px;
}

.demo-echo__tip {
  display: inline-block;
  margin-top: 12px;
  font-size: 14px;
  color: var(--k-color-text-secondary);
}
</style>

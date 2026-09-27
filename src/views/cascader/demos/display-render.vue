<script setup lang="ts">
import { ref } from 'vue'
import KCascader from '@/components/cascader/index'
import { regionOptions } from './data'

const value = ref('xihu')

/** 自定义回显格式：各级 label 以 "-" 连接 */
const renderDisplay = (labels: string[]) => labels.join(' - ')
</script>

<template>
  <div class="demo-display-render">
    <KCascader
      v-model="value"
      :options="regionOptions"
      :display-render="renderDisplay"
      placeholder="请选择地区"
    />
    <span class="demo-display-render__tip">
      displayRender 接收各级 label 数组，返回自定义回显文本。
    </span>
  </div>
</template>

<style scoped>
.demo-display-render {
  max-width: 360px;
}

.demo-display-render__tip {
  display: inline-block;
  margin-top: 12px;
  font-size: 14px;
  color: var(--k-color-text-secondary);
}
</style>

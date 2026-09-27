<script setup lang="ts">
import { ref } from 'vue'
import KCascader from '@/components/cascader/index'
import { regionOptions } from './data'
import { message } from '@/components/message/useMessage'

const value = ref('')

const onChange = (v: string | number) => {
  message.success(`change：${v}`)
}
</script>

<template>
  <div class="demo-cascader">
    <KCascader
      v-model="value"
      :options="regionOptions"
      placeholder="请选择地区"
      @change="onChange"
    />
    <span class="demo-cascader__tip">当前值：{{ value || '—' }}</span>
  </div>
</template>

<style scoped>
.demo-cascader {
  max-width: 360px;
}

.demo-cascader__tip {
  display: inline-block;
  margin-top: 12px;
  font-size: 14px;
  color: var(--k-color-text-secondary);
}
</style>

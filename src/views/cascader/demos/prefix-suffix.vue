<script setup lang="ts">
import { ref } from 'vue'
import KCascader from '@/components/cascader/index'
import { regionOptions } from './data'

const value = ref('')
</script>

<template>
  <div class="demo-prefix-suffix">
    <KCascader
      v-model="value"
      :options="regionOptions"
      prefix-icon="map"
      suffix-icon="arrow-down-filling"
      placeholder="自定义前后缀"
    />
    <span class="demo-prefix-suffix__tip">
      prefixIcon / suffixIcon 自定义触发器前后缀图标（KIcon name），如 arrow-down-filling、arrow-up-filling。
    </span>
  </div>
</template>

<style scoped>
.demo-prefix-suffix {
  max-width: 360px;
}

.demo-prefix-suffix__tip {
  display: inline-block;
  margin-top: 12px;
  font-size: 14px;
  color: var(--k-color-text-secondary);
}
</style>

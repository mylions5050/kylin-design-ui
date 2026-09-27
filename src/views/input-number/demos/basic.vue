<script setup lang="ts">
import { ref } from 'vue'
import KInputNumber from '@/components/input-number/index'

// v-model 直接绑定 number；清空输入框时值为 null
const value = ref<number | null>(3)
</script>

<template>
  <div class="demo-group">
    <div class="demo-item">
      <label>基础用法:</label>
      <KInputNumber v-model="value" />
      <span class="event-log">当前值：{{ value }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
/* demo 布局样式 */
@import "./common.scss";
</style>

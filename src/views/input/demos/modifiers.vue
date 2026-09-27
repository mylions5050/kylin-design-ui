<script setup lang="ts">
import { ref } from 'vue'
import KInput from '@/components/input/index'

const trimValue = ref('')
const lazyValue = ref('')
const numberValue = ref(0)
</script>

<template>
  <div class="demo-group">
    <div class="demo-item">
      <label>v-model.trim:</label>
      <KInput v-model.trim="trimValue" placeholder="输入内容自动 trim" />
      <span class="event-log">值: "{{ trimValue }}"</span>
    </div>
    <div class="demo-item">
      <label>v-model.lazy:</label>
      <KInput v-model.lazy="lazyValue" placeholder="失焦时更新值" />
      <span class="event-log">值: "{{ lazyValue }}"</span>
    </div>
    <div class="demo-item">
      <label>v-model.number:</label>
      <KInput v-model.number="numberValue" type="number" placeholder="输入数字" />
      <span class="event-log">类型: {{ typeof numberValue }}, 值: {{ numberValue }}</span>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "./common.scss";
</style>

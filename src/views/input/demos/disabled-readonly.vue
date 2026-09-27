<script setup lang="ts">
import { ref } from 'vue'
import KInput from '@/components/input/index'

const inputDisabled = ref('禁用状态')
const inputReadonly = ref('只读内容')
</script>

<template>
  <div class="demo-group">
    <div class="demo-item">
      <label>禁用状态:</label>
      <KInput v-model="inputDisabled" disabled />
    </div>
    <div class="demo-item">
      <label>只读状态:</label>
      <KInput v-model="inputReadonly" readonly />
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "./common.scss";
</style>

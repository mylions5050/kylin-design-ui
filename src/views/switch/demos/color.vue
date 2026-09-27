<script setup lang="ts">
import { ref } from 'vue'
import KSwitch from '@/components/switch/index'

const colorValue = ref(true)
</script>

<template>
  <div class="col">
    <div class="row">
      <KSwitch v-model="colorValue" active-color="#52c41a" inactive-color="#faad14" />
      <span class="desc">绿色主题（成功/警告）</span>
    </div>
    <div class="row">
      <KSwitch v-model="colorValue" active-color="#1890ff" inactive-color="#8c8c8c" />
      <span class="desc">蓝色主题（主要/默认）</span>
    </div>
    <div class="row">
      <KSwitch v-model="colorValue" active-color="#f5222d" inactive-color="#bfbfbf" />
      <span class="desc">红色主题（危险/中性）</span>
    </div>
    <div class="row">
      <KSwitch v-model="colorValue" active-color="#722ed1" inactive-color="#d9d9d9" />
      <span class="desc">紫色主题（紫色/灰色）</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.col {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.desc {
  font-size: 13px;
  color: #8c8c8c;
  font-style: italic;
}
</style>

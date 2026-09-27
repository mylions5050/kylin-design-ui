<script setup lang="ts">
import { ref } from 'vue'
import KProgress from '@/components/progress/index'

const p1 = ref(50)
const p2 = ref(100)
</script>

<template>
  <div class="demo-group">
    <div class="demo-item">
      <label>基础（percentage 50）:</label>
      <KProgress :percentage="p1" />
    </div>
    <div class="demo-item">
      <label>format 自定义文字（100 → Full）:</label>
      <KProgress :percentage="p2" :format="(p: number) => (p === 100 ? 'Full' : `${p}%`)" />
    </div>
    <div class="demo-item">
      <label>状态色 success / warning / exception:</label>
      <KProgress :percentage="100" status="success" />
      <KProgress :percentage="80" status="warning" />
      <KProgress :percentage="50" status="exception" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../../date-picker/demos/common.scss";

.demo-item .k-progress + .k-progress {
  margin-top: 12px;
}
</style>

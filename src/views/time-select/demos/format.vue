<script setup lang="ts">
import { ref } from 'vue'
import KTimeSelect from '@/components/time-select/index'

const value1 = ref('')
const value2 = ref('')
</script>

<template>
  <div class="demo-group">
    <div class="demo-item">
      <label>format 控制展示（h:mm A → 上午/下午）:</label>
      <KTimeSelect v-model="value1" start="00:00" step="00:30" end="23:59" format="h:mm A" placeholder="选择时间" />
      <p class="current-info">{{ value1 ? `原始值：${value1}` : '未选择' }}</p>
    </div>
    <div class="demo-item">
      <label>format 控制展示（HH时mm分）:</label>
      <KTimeSelect v-model="value2" start="08:00" step="01:00" end="18:00" format="HH时mm分" placeholder="选择时间" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../../date-picker/demos/common.scss";
</style>

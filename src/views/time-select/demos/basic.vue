<script setup lang="ts">
import { ref } from 'vue'
import KTimeSelect from '@/components/time-select/index'

const value = ref('')
</script>

<template>
  <div class="demo-group">
    <div class="demo-item">
      <label>固定时间点（08:30 ~ 18:30，步长 15 分钟）:</label>
      <KTimeSelect v-model="value" start="08:30" step="00:15" end="18:30" placeholder="选择时间" />
      <p class="current-info">{{ value ? `选中：${value}` : '未选择' }}</p>
    </div>
    <div class="demo-item">
      <label>默认范围（09:00 ~ 18:00，步长 30 分钟）:</label>
      <KTimeSelect v-model="value" placeholder="选择时间" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../../date-picker/demos/common.scss";
</style>

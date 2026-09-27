<script setup lang="ts">
import { ref } from 'vue'
import KProgress from '@/components/progress/index'

const p = ref(70)
</script>

<template>
  <div class="demo-group">
    <div class="demo-item">
      <label>text-inside 内嵌文字（strokeWidth ≥ 18）:</label>
      <KProgress :percentage="p" :text-inside="true" :stroke-width="20" />
      <KProgress :percentage="100" status="success" :text-inside="true" :stroke-width="20" />
      <KProgress :percentage="50" status="exception" :text-inside="true" :stroke-width="20" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../../date-picker/demos/common.scss";

.demo-item .k-progress + .k-progress {
  margin-top: 12px;
  max-width: 600px;
}
</style>

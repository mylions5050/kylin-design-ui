<script setup lang="ts">
import { ref } from 'vue'
import KSlider from '@/components/slider/index'

/** 初始 3 个节点，可点击轨道继续添加（最多 5 个） */
const value = ref<number[]>([20, 50, 80])
</script>

<template>
  <div class="demo-slider">
    <KSlider v-model="value" range editable tooltip-open :min-count="2" :max-count="5" />
    <span class="demo-slider__tip">
      点击轨道添加节点（最多 5 个）；把节点拖出轨道两端、或对节点按 Delete / Backspace
      删除（最少保留 2 个）。当前值：{{ value }}
    </span>
  </div>
</template>

<style scoped>
.demo-slider__tip {
  display: inline-block;
  margin-top: 12px;
  font-size: 14px;
  color: var(--k-color-text-secondary);
}
</style>

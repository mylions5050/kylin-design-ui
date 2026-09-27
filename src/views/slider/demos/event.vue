<script setup lang="ts">
import { ref } from 'vue'
import KSlider from '@/components/slider/index'
import { message } from '@/components/message/useMessage'

const value = ref(50)

// 拖动中持续触发 change，松手触发 afterChange —— 表单提交时机放 afterChange 最合适
const onChange = (v: number | [number, number]) => {
  console.log('change：', v)
}
const onAfterChange = (v: number | [number, number]) => {
  message.success(`afterChange：${Array.isArray(v) ? v.join(' ~ ') : v}`)
}
</script>

<template>
  <div class="demo-slider">
    <KSlider v-model="value" @change="onChange" @after-change="onAfterChange" />
  </div>
</template>

<style scoped>
.demo-slider {
  display: flex;
  align-items: center;
  gap: 16px;
}
</style>

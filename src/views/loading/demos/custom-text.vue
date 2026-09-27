<script setup lang="ts">
import { ref } from 'vue'
import KLoading from '@/components/loading/index'

const visible = ref(true)
</script>

<template>
  <!-- text prop 设置文案 -->
  <KLoading v-model="visible" local type="primary" text="加载中，请稍候…" />
  <!-- #text 插槽自定义文案结构 -->
  <KLoading v-model="visible" local type="success">
    <template #text>正在同步数据...</template>
  </KLoading>
</template>

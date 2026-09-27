<script setup lang="ts">
import { ref } from 'vue'
import KLoading from '@/components/loading/index'
import KIcon from '@/components/icon/index'

const visible = ref(true)
</script>

<template>
  <!-- #default 插槽可放任意图标 / 图片 / 自定义内容 -->
  <KLoading v-model="visible" local type="info" text="自定义图标">
    <template #default>
      <KIcon name="picture-filling" style="font-size: 32px" />
    </template>
  </KLoading>

  <KLoading v-model="visible" local type="warning">
    <template #default>
      <KIcon name="time" style="font-size: 28px" />
    </template>
    <template #text>坐稳了，正在拉数据</template>
  </KLoading>
</template>

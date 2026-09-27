<script setup lang="ts">
import KPageHeader from '@/components/page-header/index'
import { message } from '@/components/message/useMessage'

// 基础用法：点击左侧返回区域（图标 / 标题）触发 back 事件
const goBack = () => {
  message.success('点击了返回')
}
</script>

<template>
  <KPageHeader @back="goBack">
    <template #content>
      <span>Title</span>
    </template>
  </KPageHeader>
</template>

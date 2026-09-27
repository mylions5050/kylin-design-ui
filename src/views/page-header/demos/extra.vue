<script setup lang="ts">
import KPageHeader from '@/components/page-header/index'
import KButton from '@/components/button/index'
import { message } from '@/components/message/useMessage'

// 额外操作：icon 传空字符串隐藏返回图标，#extra 插槽放右侧操作区
const goBack = () => {
  message.success('点击了返回')
}
</script>

<template>
  <KPageHeader icon="" content="详情页标题" @back="goBack">
    <template #extra>
      <KButton @click="message.info('点击了打印')">打印</KButton>
      <KButton type="primary" @click="message.success('点击了编辑')">编辑</KButton>
    </template>
  </KPageHeader>
</template>

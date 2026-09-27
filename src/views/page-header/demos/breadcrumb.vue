<script setup lang="ts">
import KPageHeader from '@/components/page-header/index'
import KBreadcrumb from '@/components/breadcrumb/index'
import KTag from '@/components/tag/index'
import { message } from '@/components/message/useMessage'

// 面包屑导航：层级较多时用 #breadcrumb 插槽替代返回入口
const items = [
  { label: '首页', path: '/' },
  { label: '列表页', path: '/page-header' },
  { label: '详情页' },
]

const goBack = () => {
  message.success('点击了返回')
}
</script>

<template>
  <KPageHeader @back="goBack">
    <template #breadcrumb>
      <KBreadcrumb :items="items" />
    </template>
    <template #content>
      <span>Title</span>
      <KTag style="margin-left: 12px">Default</KTag>
    </template>
  </KPageHeader>
</template>

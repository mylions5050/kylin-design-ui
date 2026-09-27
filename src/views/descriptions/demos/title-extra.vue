<script setup lang="ts">
import KDescriptions from '@/components/descriptions/index'
import KButton from '@/components/button/index'

// title / extra：标题与右上角额外内容，extra 通常放操作按钮
const items = [
  { key: 'name', label: '项目名称', children: '云岭汇雅' },
  { key: 'leader', label: '负责人', children: '王小明' },
  { key: 'progress', label: '当前进度', children: '80%' },
]
</script>

<template>
  <KDescriptions :items="items" bordered title="项目信息" :column="2">
    <template #extra>
      <KButton size="small" type="primary">编辑</KButton>
    </template>
  </KDescriptions>
</template>

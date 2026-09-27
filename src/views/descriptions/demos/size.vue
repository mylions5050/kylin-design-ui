<script setup lang="ts">
import KDescriptions from '@/components/descriptions/index'

// size 主要影响单元格内边距：default / middle / small
const items = [
  { key: 'name', label: '产品名称', children: '云岭汇雅' },
  { key: 'version', label: '当前版本', children: 'v2.3.1' },
  { key: 'update', label: '更新时间', children: '2026-09-26' },
  { key: 'status', label: '运行状态', children: '运行中' },
]
</script>

<template>
  <div>
    <KDescriptions :items="items" bordered title="default" :column="2" />
    <KDescriptions :items="items" bordered title="middle" size="middle" :column="2" style="margin-top: 24px" />
    <KDescriptions :items="items" bordered title="small" size="small" :column="2" style="margin-top: 24px" />
  </div>
</template>

<script setup lang="ts">
import KDescriptions from '@/components/descriptions/index'

// items 数据驱动；column 控制每行列数（默认 3，演示区较窄这里用 2 列）
const items = [
  { key: 'name', label: '产品名称', children: '云岭汇雅' },
  { key: 'version', label: '当前版本', children: 'v2.3.1' },
  { key: 'update', label: '更新时间', children: '2026-09-26' },
  { key: 'status', label: '运行状态', children: '运行中' },
  { key: 'owner', label: '负责人', children: '王小明' },
  { key: 'env', label: '部署环境', children: '生产环境' },
]
</script>

<template>
  <KDescriptions :items="items" :column="2" />
</template>

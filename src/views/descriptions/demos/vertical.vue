<script setup lang="ts">
import KDescriptions from '@/components/descriptions/index'

// layout="vertical"：标签在内容上方，常与 bordered 搭配
const items = [
  { key: 'project', label: '项目名称', children: '云岭汇雅管理端' },
  { key: 'member', label: '项目成员', children: '王小明、李小红、赵小刚' },
  { key: 'cycle', label: '项目周期', children: '2026-03-01 ~ 2026-12-31' },
]
</script>

<template>
  <KDescriptions :items="items" layout="vertical" bordered />
</template>

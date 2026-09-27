<script setup lang="ts">
import KDescriptions from '@/components/descriptions/index'

// span：item 占据的列数；超过当前行剩余列时自动换行，
// 最后一行不满时末位自动补满（AntD 同款规则）
const items = [
  { key: 'user', label: '申请人', children: '王小明' },
  { key: 'time', label: '申请时间', children: '2026-09-26' },
  { key: 'remark', label: '申请事由', children: '因项目验收需要，申请采购一批测试设备，用于现场联调与演示。', span: 2 },
  { key: 'approver', label: '审批人', children: '李小红' },
  { key: 'status', label: '审批状态', children: '已通过' },
  { key: 'opinion', label: '审批意见', children: '同意。' },
]
</script>

<template>
  <KDescriptions :items="items" bordered :column="2" />
</template>

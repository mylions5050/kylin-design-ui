<script setup lang="ts">
import KDescriptions from '@/components/descriptions/index'

// bordered：标签列浅色背景 + 单元格边框，适合表单详情、审批单等正式场景
const items = [
  { key: 'order', label: '订单编号', children: 'YL0926' },
  { key: 'amount', label: '订单金额', children: '￥1,280' },
  { key: 'pay', label: '支付方式', children: '在线支付' },
  { key: 'contact', label: '联系人', children: '王小明' },
  { key: 'phone', label: '联系电话', children: '138****6666' },
  { key: 'address', label: '收货地址', children: '云南省昆明市呈贡区xx路xx号' },
]
</script>

<template>
  <KDescriptions :items="items" bordered :column="2" />
</template>

<script setup lang="ts">
import KAlert from '@/components/alert/index'
</script>

<template>
  <KAlert type="primary" show-arrow>带箭头的提示（点击跳转）</KAlert>
  <KAlert type="warning">
    带 action slot 的提示
    <template #action><a href="#" style="font-size: 14px">查看详情</a></template>
  </KAlert>
</template>

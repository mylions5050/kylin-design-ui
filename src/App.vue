<template>
  <RouterView />
  <!-- 全局消息队列渲染实例：任意页面调用 message.xxx() 都能弹出 -->
  <KMessage />
</template>

<script setup lang="ts">
import KMessage from '@/components/message/index'
</script>

<script setup lang="ts">
import KButton from '@/components/button/index'
import { message } from '@/components/message/useMessage'

// duration 单位毫秒，默认 3000；传 0 表示不自动关闭
const showCustomDuration = () => message.success('这条消息会显示 6 秒', { duration: 6000 })
</script>

<template>
  <div class="demo-buttons">
    <KButton type="primary" @click="showCustomDuration">6 秒后关闭</KButton>
  </div>
</template>

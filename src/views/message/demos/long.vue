<script setup lang="ts">
import KButton from '@/components/button/index'
import { message } from '@/components/message/useMessage'

const showLong = () =>
  message.success('这是一条很长的消息内容，用于测试长文本在 Message 组件中的显示效果，确保不会溢出或截断。')
</script>

<template>
  <div class="demo-buttons">
    <KButton type="primary" @click="showLong">长文本消息</KButton>
  </div>
</template>

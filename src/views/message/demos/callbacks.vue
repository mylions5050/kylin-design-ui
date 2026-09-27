<script setup lang="ts">
import KButton from '@/components/button/index'
import { message } from '@/components/message/useMessage'

// onClose：消息关闭时触发（手动 / 自动 / 超限移除均触发）
// onClick：点击消息体时触发
const showWithClose = () => {
  message.success('关闭时会触发回调', {
    duration: 3000,
    onClose: () => console.log('消息已关闭'),
  })
}

const showWithClick = () => {
  message.info('点击这条消息试试（控制台输出）', {
    onClick: () => console.log('消息被点击'),
  })
}
</script>

<template>
  <div class="demo-buttons">
    <KButton type="primary" @click="showWithClose">带关闭回调</KButton>
    <KButton type="primary" @click="showWithClick">带点击回调</KButton>
  </div>
</template>

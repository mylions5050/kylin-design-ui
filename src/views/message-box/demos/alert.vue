<script setup lang="ts">
import KButton from '@/components/button/index'
import { messageBox } from '@/components/message-box/useMessageBox'

// alert：只有确定按钮；点确定 resolve，点 × / ESC reject('close')
const showAlert = () => {
  messageBox.alert('这是一段提醒内容', {
    icon: 'info',
    title: '提醒',
  }).catch((action) => console.log('alert 关闭方式：', action))
}
</script>

<template>
  <div class="demo-buttons">
    <KButton type="primary" @click="showAlert">Alert 提醒</KButton>
  </div>
</template>

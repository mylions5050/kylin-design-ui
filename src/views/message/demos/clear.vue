<script setup lang="ts">
import KButton from '@/components/button/index'
import { message } from '@/components/message/useMessage'

// clear() 清除所有消息（不触发各条 onClose）
const showMultiple = () => {
  message.success('第一条')
  message.info('第二条')
  message.warning('第三条')
}
const clearAll = () => message.clear()
</script>

<template>
  <div class="demo-buttons">
    <KButton type="primary" @click="showMultiple">先显示几条</KButton>
    <KButton @click="clearAll">清除全部</KButton>
  </div>
</template>

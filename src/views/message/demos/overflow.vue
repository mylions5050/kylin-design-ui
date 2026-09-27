<script setup lang="ts">
import KButton from '@/components/button/index'
import { message } from '@/components/message/useMessage'

// 最多同时显示 5 条，超出时最早的消息被移除（并触发其 onClose）
const showOverflow = () => {
  message.success('第一条')
  message.info('第二条')
  message.warning('第三条')
  message.error('第四条')
  message.success('第五条')
  message.info('第六条（超出限制，第一条被移除）')
}
</script>

<template>
  <div class="demo-buttons">
    <KButton type="primary" @click="showOverflow">超出限制</KButton>
  </div>
</template>

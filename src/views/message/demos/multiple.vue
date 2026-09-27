<script setup lang="ts">
import KButton from '@/components/button/index'
import { message } from '@/components/message/useMessage'

const showMultiple = () => {
  message.success('第一条消息')
  message.warning('第二条消息')
  message.info('第三条消息')
  message.error('第四条消息')
  message.success('第五条消息')
}
</script>

<template>
  <div class="demo-buttons">
    <KButton type="primary" @click="showMultiple">显示 5 条</KButton>
  </div>
</template>

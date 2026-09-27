<script setup lang="ts">
import KButton from '@/components/button/index'
import { message } from '@/components/message/useMessage'

// customClass 追加到消息体根节点，配合全局样式可做任意定制
const showCustomClass = () =>
  message.success('自定义样式消息', {
    effect: 'light',
    customClass: 'custom-message-style',
    duration: 5000,
  })
</script>

<template>
  <div class="demo-buttons">
    <KButton type="primary" @click="showCustomClass">自定义样式</KButton>
  </div>
</template>

<!-- 注意：消息 Teleport 到 body，样式需用非 scoped 的全局块 -->
<style>
.custom-message-style {
  border-left: 4px solid var(--k-color-primary) !important;
  border-radius: 4px !important;
}
</style>

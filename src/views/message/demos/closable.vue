<script setup lang="ts">
import KButton from '@/components/button/index'
import { message } from '@/components/message/useMessage'

// 默认不显示关闭按钮（与 Ant Design 一致），closable: true 开启
const showClosable = () => message.success('closable: true 显示关闭按钮，可手动关闭', { closable: true })
</script>

<template>
  <div class="demo-buttons">
    <KButton type="primary" @click="showClosable">可关闭消息</KButton>
  </div>
</template>

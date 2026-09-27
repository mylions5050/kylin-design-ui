<script setup lang="ts">
import KButton from '@/components/button/index'
import { message } from '@/components/message/useMessage'

const showSuccess = () => message.success('这是一条成功消息')
const showError = () => message.error('这是一条错误消息')
const showWarning = () => message.warning('这是一条警告消息')
const showInfo = () => message.info('这是一条普通提示消息')
const showLoading = () => message.loading('加载中...')
</script>

<template>
  <div class="demo-buttons">
    <KButton type="primary" @click="showSuccess">成功</KButton>
    <KButton type="error" @click="showError">错误</KButton>
    <KButton type="warning" @click="showWarning">警告</KButton>
    <KButton @click="showInfo">普通提示</KButton>
    <KButton @click="showLoading">加载中</KButton>
  </div>
</template>

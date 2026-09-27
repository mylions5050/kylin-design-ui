<script setup lang="ts">
import KButton from '@/components/button/index'
import { message } from '@/components/message/useMessage'

// light = 白色背景 + 浅边框（AntD 默认）
// plain = type 浅色背景 + type 深色文字
// dark  = type 深色背景 + 白色文字
const showLight = () => message.success('light 效果 — 白色背景，浅边框', { effect: 'light' })
const showPlain = () => message.success('plain 效果 — type 浅色背景', { effect: 'plain' })
const showDark = () => message.success('dark 效果 — type 深色背景', { effect: 'dark' })
const showPlainError = () => message.error('plain 错误消息', { effect: 'plain' })
const showDarkWarning = () => message.warning('dark 警告消息', { effect: 'dark' })
</script>

<template>
  <div class="demo-buttons">
    <KButton @click="showLight">light 成功</KButton>
    <KButton @click="showPlain">plain 成功</KButton>
    <KButton @click="showDark">dark 成功</KButton>
  </div>
  <div class="demo-buttons demo-buttons--extra">
    <KButton type="error" @click="showPlainError">plain 错误</KButton>
    <KButton type="warning" @click="showDarkWarning">dark 警告</KButton>
  </div>
</template>

<style scoped>
.demo-buttons--extra {
  margin-top: 8px;
}
</style>

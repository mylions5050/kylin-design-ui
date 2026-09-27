<script setup lang="ts">
import { notice } from '@/components/notice/useNotice'
import KButton from '@/components/button/index'
import { getCurrentInstance } from 'vue'

// KNotice 的全局用法示例
const instance = getCurrentInstance()
const KNotice = instance?.appContext.config.globalProperties.$notice || notice

// KNotice 全局用法示例
const useKNotice = () => {
  KNotice.success('KNotice 成功消息', '这是通过全局 KNotice 发送的通知')
}

const useKNoticeError = () => {
  KNotice.error('KNotice 错误消息', '这是通过全局 KNotice 发送的错误通知')
}

const useKNoticeLoading = () => {
  const loadingId = KNotice.loading('KNotice 加载中...', '正在处理您的请求')
  setTimeout(() => {
    KNotice.dismiss(loadingId)
    KNotice.success('KNotice 加载完成')
  }, 2500)
}
</script>

<template>
  <KButton @click="useKNotice">使用 KNotice 成功通知</KButton>
  <KButton @click="useKNoticeError">使用 KNotice 错误通知</KButton>
  <KButton @click="useKNoticeLoading">使用 KNotice 加载通知</KButton>
</template>

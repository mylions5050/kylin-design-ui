<script setup lang="ts">
import { notice } from '@/components/notice/useNotice'
import KButton from '@/components/button/index'

const showMultipleNotices = () => {
  notice.info('第一条通知')
  setTimeout(() => notice.success('第二条通知'), 500)
  setTimeout(() => notice.warning('第三条通知'), 1000)
  setTimeout(() => notice.error('第四条通知'), 1500)
  setTimeout(() => notice.info('第五条通知'), 2000)
}

const clearAllNotices = () => {
  notice.clear()
}
</script>

<template>
  <KButton @click="showMultipleNotices">显示多个通知</KButton>
  <KButton @click="clearAllNotices">清除所有通知</KButton>
</template>

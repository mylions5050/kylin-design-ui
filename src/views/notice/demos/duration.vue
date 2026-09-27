<script setup lang="ts">
import { notice } from '@/components/notice/useNotice'
import KButton from '@/components/button/index'

const showShortNotice = () => {
  notice.info('短时间通知', '这条通知将在1秒后自动消失。', 1000)
}

const showLongNotice = () => {
  notice.info('长时间通知', '这条通知将持续5秒。', 5000)
}

const showPersistentNotice = () => {
  notice.info('持久通知', '这条通知不会自动关闭，需要手动点击关闭按钮。', 0)
}
</script>

<template>
  <KButton @click="showShortNotice">短时间通知 (1秒)</KButton>
  <KButton @click="showLongNotice">长时间通知 (5秒)</KButton>
  <KButton @click="showPersistentNotice">持久通知 (不会自动关闭)</KButton>
</template>

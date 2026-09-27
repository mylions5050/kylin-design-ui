<script setup lang="ts">
import { notice } from '@/components/notice/useNotice'
import KButton from '@/components/button/index'

const showNoticeWithAction = () => {
  notice.info(
    '确认删除',
    '您确定要删除这个文件吗？',
    0,
    {
      label: '确认',
      onClick: () => {
        notice.success('文件已删除')
      }
    }
  )
}

const showNoticeWithCustomAction = () => {
  notice.warning(
    '重启提示',
    '系统需要重启以应用新的设置。',
    0,
    {
      label: '立即重启',
      onClick: () => {
        notice.loading('正在重启...')
      }
    }
  )
}
</script>

<template>
  <KButton @click="showNoticeWithAction">带操作的通知</KButton>
  <KButton @click="showNoticeWithCustomAction">自定义操作通知</KButton>
</template>

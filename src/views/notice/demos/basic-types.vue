<script setup lang="ts">
import { notice } from '@/components/notice/useNotice'
import KButton from '@/components/button/index'

const showSuccess = () => {
  notice.success('操作成功！', '您的数据已成功保存。')
}

const showError = () => {
  notice.error('操作失败！', '保存数据时发生错误，请重试。')
}

const showInfo = () => {
  notice.info('系统消息', '您有新的消息未读。')
}

const showWarning = () => {
  notice.warning('警告提示', '请注意数据的备份。')
}

const showLoading = () => {
  const loadingId = notice.loading('正在加载...', '请稍候')
  // 3秒后自动转为成功
  setTimeout(() => {
    notice.dismiss(loadingId)
    notice.success('加载完成！')
  }, 3000)
}
</script>

<template>
  <KButton @click="showSuccess">成功通知</KButton>
  <KButton @click="showError">错误通知</KButton>
  <KButton @click="showInfo">信息通知</KButton>
  <KButton @click="showWarning">警告通知</KButton>
  <KButton @click="showLoading">加载通知</KButton>
</template>

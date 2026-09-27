<script setup lang="ts">
import { notice } from '@/components/notice/useNotice'
import KButton from '@/components/button/index'

const showSuccessWithDesc = () => {
  notice.success(
    '文件上传成功',
    '您的文档已成功上传到云端服务器，可以随时访问和编辑。'
  )
}

const showErrorWithDesc = () => {
  notice.error(
    '网络连接失败',
    '无法连接到服务器，请检查您的网络设置或稍后重试。'
  )
}

const showInfoWithDesc = () => {
  notice.info(
    '系统更新',
    '系统将在今晚23:00进行维护更新，预计耗时30分钟。'
  )
}
</script>

<template>
  <KButton @click="showSuccessWithDesc">成功通知（带描述）</KButton>
  <KButton @click="showErrorWithDesc">错误通知（带描述）</KButton>
  <KButton @click="showInfoWithDesc">信息通知（带描述）</KButton>
</template>

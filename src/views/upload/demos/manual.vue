<script setup lang="ts">
import { ref } from 'vue'
import KUpload from '@/components/upload/index'
import KButton from '@/components/button/index'
import { message } from '@/components/message/useMessage'
import type { UploadRawFile } from '@/components/upload/types'

const uploadRef = ref<{ submit: () => void; clearFiles: () => void; handleStart: (file: File) => void }>()

// 上传前校验：只允许 jpg/png 且不超过 2MB
const beforeUpload = (rawFile: UploadRawFile) => {
  if (!['image/jpeg', 'image/png'].includes(rawFile.type)) {
    message.error('只能上传 JPG/PNG 格式文件')
    return false
  }
  if (rawFile.size / 1024 / 1024 > 2) {
    message.error('文件大小不能超过 2MB')
    return false
  }
  return true
}

// limit 为 1：超出时用新文件覆盖旧文件
const handleExceed = (files: File[]) => {
  uploadRef.value?.clearFiles()
  if (files[0]) uploadRef.value?.handleStart(files[0])
}
</script>

<template>
  <KUpload
    ref="uploadRef"
    action="https://jsonplaceholder.typicode.com/posts"
    :auto-upload="false"
    :limit="1"
    :before-upload="beforeUpload"
    @exceed="handleExceed"
    multiple
  >
    <template #default>
      <KButton type="primary">选择文件</KButton>
    </template>
    <template #tip>
      <div>关闭自动上传，选好后点击"上传到服务器"；limit 1，重选自动覆盖。</div>
    </template>
  </KUpload>
  <div style="margin-top: 8px">
    <KButton type="success" @click="uploadRef?.submit()">上传到服务器</KButton>
  </div>
</template>

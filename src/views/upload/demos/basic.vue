<script setup lang="ts">
import { ref } from 'vue'
import KUpload from '@/components/upload/index'
import KButton from '@/components/button/index'
import { message } from '@/components/message/useMessage'
import type { UploadUserFile } from '@/components/upload/types'

const fileList = ref<UploadUserFile[]>([
  { name: 'element-plus-logo.svg', url: 'https://element-plus.org/images/element-plus-logo.svg' },
])
</script>

<template>
  <KUpload
    v-model:file-list="fileList"
    action="https://jsonplaceholder.typicode.com/posts"
    multiple
    :limit="3"
    @success="(_res, file) => message.success(`${file.name} 上传成功`)"
    @error="(_err, file) => message.error(`${file.name} 上传失败`)"
    @exceed="(files) => message.warning(`最多上传 3 个文件，本次选了 ${files.length} 个`)"
    @preview="(file) => message.info(`预览 ${file.name}`)"
  >
    <KButton type="primary">点击上传</KButton>
    <template #tip>
      <div>不限制单个文件，最多上传 3 个；点击文件名触发 preview。</div>
    </template>
  </KUpload>
</template>

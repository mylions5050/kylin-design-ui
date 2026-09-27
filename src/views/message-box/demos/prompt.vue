<script setup lang="ts">
import { ref } from 'vue'
import KButton from '@/components/button/index'
import { messageBox } from '@/components/message-box/useMessageBox'

// prompt：输入弹框，inputValidator 校验（返回 string 为错误文案），确认带出 value
const name = ref('')

const showPrompt = () => {
  messageBox
    .prompt('请输入分类名称', {
      icon: 'info',
      title: '新建分类',
      inputPlaceholder: '不超过 10 个字符',
      inputValidator: (v: string) => (!v.trim() ? '名称不能为空' : v.trim().length > 10 ? '不能超过 10 个字符' : true),
    })
    .then(({ value }) => {
      name.value = value ?? ''
    })
    .catch((action) => console.log('取消了：', action))
}
</script>

<template>
  <div class="demo-buttons">
    <KButton type="primary" @click="showPrompt">Prompt 输入</KButton>
    <span v-if="name" class="prompt-result">提交结果：{{ name }}</span>
  </div>
</template>

<style scoped>
.prompt-result {
  font-size: 14px;
  color: var(--k-color-text-secondary);
}
</style>

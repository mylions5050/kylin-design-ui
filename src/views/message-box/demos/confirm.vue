<script setup lang="ts">
import KButton from '@/components/button/index'
import { messageBox } from '@/components/message-box/useMessageBox'

// confirm：确定 + 取消；Promise 链式处理结果（与 Element Plus MessageBox 语义一致）
const showConfirm = () => {
  messageBox
    .confirm('删除后不可恢复，确认删除该条数据吗？', {
      icon: 'warning',
      title: '删除确认',
      confirmText: '删 除',
    })
    .then(({ action }) => console.log('确认了：', action))
    .catch((action) => console.log('取消了：', action))
}
</script>

<template>
  <div class="demo-buttons">
    <KButton type="error" @click="showConfirm">Confirm 确认</KButton>
  </div>
</template>

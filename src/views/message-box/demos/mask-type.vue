<script setup lang="ts">
import KButton from '@/components/button/index'
import { messageBox } from '@/components/message-box/useMessageBox'

// 毛玻璃遮罩：编程式调用传入 maskType: 'blur'（透传 KDialog → KOverlay）
const confirmWithBlurMask = () => {
  messageBox.confirm('确定要执行该操作吗？', {
    title: '毛玻璃遮罩',
    maskType: 'blur',
  })
}
</script>

<template>
  <div class="demo-buttons">
    <KButton type="primary" @click="confirmWithBlurMask">毛玻璃遮罩确认框</KButton>
  </div>
</template>

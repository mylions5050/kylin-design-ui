<script setup lang="ts">
import { ref } from 'vue'
import KDialog from '@/components/dialog/index'
import KButton from '@/components/button/index'

// 异步确认：关闭时机由业务控制，设 close-on-confirm 为 false 阻止确认即关
const asyncVisible = ref(false)
const asyncLoading = ref(false)

const handleAsyncConfirm = () => {
  asyncLoading.value = true
  setTimeout(() => {
    asyncLoading.value = false
    asyncVisible.value = false
  }, 2000)
}
</script>

<template>
  <div>
    <KButton type="primary" @click="asyncVisible = true">异步确认</KButton>
  </div>

  <KDialog v-model="asyncVisible"
    title="异步提交"
    :confirm-loading="asyncLoading"
    :close-on-confirm="false"
    @confirm="handleAsyncConfirm"
    @cancel="asyncVisible = false"
  >
    点击确认按钮后，会模拟 2 秒异步请求，期间按钮处于 loading 状态。
  </KDialog>
</template>

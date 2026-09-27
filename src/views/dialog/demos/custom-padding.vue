<script setup lang="ts">
import { ref } from 'vue'
import KDialog from '@/components/dialog/index'
import KButton from '@/components/button/index'

// 自定义 padding
const customPaddingVisible = ref(false)
</script>

<template>
  <div>
    <KButton type="primary" @click="customPaddingVisible = true">自定义内边距</KButton>
  </div>

  <KDialog
    v-model="customPaddingVisible"
    title="自定义内边距"
    width="480px"
    height="300px"
    padding="32px 40px"
    @confirm="customPaddingVisible = false"
    @cancel="customPaddingVisible = false"
  >
    <p>整体内边距为 32px 40px。</p>
    <p>header 底部有 12px 间距，footer 顶部有 12px 间距，由组件内部自动处理。</p>
  </KDialog>
</template>

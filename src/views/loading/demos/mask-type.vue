<script setup lang="ts">
import KButton from '@/components/button/index'
import { useLoading } from '@/components/loading/useLoading'

// 毛玻璃遮罩：全局 Loading 传 maskType: 'blur'（透传 KOverlay）
const { open, close } = useLoading()

const openBlur = () => {
  const loading = open({ text: '加载中…', maskType: 'blur' })
  setTimeout(() => loading.close(), 2000)
}
</script>

<template>
  <div class="demo-buttons">
    <KButton type="primary" @click="openBlur">毛玻璃遮罩 Loading</KButton>
    <KButton @click="close">立即关闭</KButton>
  </div>
</template>

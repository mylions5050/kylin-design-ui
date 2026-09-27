<script setup lang="ts">
import { ref } from 'vue'
import KDialog from '@/components/dialog/index'
import KButton from '@/components/button/index'

// 毛玻璃遮罩
const blurMaskVisible = ref(false)
</script>

<template>
  <div>
    <KButton type="primary" @click="blurMaskVisible = true">毛玻璃遮罩</KButton>
  </div>

  <KDialog
    v-model="blurMaskVisible"
    title="毛玻璃遮罩"
    mask-type="blur"
    @confirm="blurMaskVisible = false"
    @cancel="blurMaskVisible = false"
  >
    关闭弹窗后对比：底下的页面内容被 blur(4px) 模糊掉了。
  </KDialog>
</template>

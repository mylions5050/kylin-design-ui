<script setup lang="ts">
import { ref } from 'vue'
import KDialog from '@/components/dialog/index'
import KButton from '@/components/button/index'

// 顶部对齐
const topAlignVisible = ref(false)
</script>

<template>
  <div>
    <KButton type="primary" @click="topAlignVisible = true">顶部对齐</KButton>
  </div>

  <KDialog
    v-model="topAlignVisible"
    title="顶部对齐"
    align="top"
    top="15vh"
    width="480px"
    @confirm="topAlignVisible = false"
    @cancel="topAlignVisible = false"
  >
    <p>对话框从顶部 15vh 位置开始显示，而不是垂直居中。</p>
    <p>适合内容较少的弹窗，避免在长页面中显得突兀。</p>
  </KDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KDialog from '@/components/dialog/index'
import KButton from '@/components/button/index'

// 尺寸
const smallVisible = ref(false)
const defaultVisible = ref(false)
const largeVisible = ref(false)
</script>

<template>
  <div style="display: flex; gap: 12px; flex-wrap: wrap;">
    <KButton type="primary" size="small" @click="smallVisible = true">Small</KButton>
    <KButton type="primary" @click="defaultVisible = true">Default</KButton>
    <KButton type="primary" size="large" @click="largeVisible = true">Large</KButton>
  </div>

  <KDialog v-model="smallVisible" title="小型对话框" size="small" width="480px" @confirm="smallVisible = false">
    <p>small 尺寸，内边距 12px 16px。</p>
  </KDialog>
  <KDialog v-model="defaultVisible" title="默认对话框" size="default" width="480px" @confirm="defaultVisible = false">
    <p>default 尺寸，内边距 20px 24px。</p>
  </KDialog>
  <KDialog v-model="largeVisible" title="大型对话框" size="large" width="480px" @confirm="largeVisible = false">
    <p>large 尺寸，内边距 28px 32px。</p>
  </KDialog>
</template>

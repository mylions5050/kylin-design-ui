<script setup lang="ts">
import { ref } from 'vue'
import KDialog from '@/components/dialog/index'
import KButton from '@/components/button/index'

// 嵌套 dialog
const outerVisible = ref(false)
const innerVisible = ref(false)
</script>

<template>
  <div>
    <KButton type="primary" @click="outerVisible = true">打开外层 Dialog</KButton>
  </div>

  <KDialog v-model="outerVisible" title="外层对话框" @confirm="outerVisible = false" @cancel="outerVisible = false">
    <p>这是外层对话框的内容。</p>
    <KButton type="primary" @click="innerVisible = true">打开内层对话框</KButton>

    <KDialog v-model="innerVisible" title="内层对话框" size="small" @confirm="innerVisible = false" @cancel="innerVisible = false">
      <p>这是内层对话框的内容。</p>
    </KDialog>
  </KDialog>
</template>

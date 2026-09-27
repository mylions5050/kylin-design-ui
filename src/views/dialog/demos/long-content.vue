<script setup lang="ts">
import { ref } from 'vue'
import KDialog from '@/components/dialog/index'
import KButton from '@/components/button/index'

// 长内容
const longContentVisible = ref(false)
</script>

<template>
  <div>
    <KButton type="primary" @click="longContentVisible = true">长内容</KButton>
  </div>

  <KDialog v-model="longContentVisible" title="长内容滚动" @confirm="longContentVisible = false" @cancel="longContentVisible = false">
    <p v-for="i in 100" :key="i">这是第 {{ i }} 行内容，用于测试长内容滚动效果。</p>
  </KDialog>
</template>

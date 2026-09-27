<script setup lang="ts">
import { ref } from 'vue'
import KDialog from '@/components/dialog/index'
import KButton from '@/components/button/index'

// 自定义宽高
const customSizeVisible = ref(false)
</script>

<template>
  <div>
    <KButton type="primary" @click="customSizeVisible = true">自定义宽高</KButton>
  </div>

  <KDialog
    v-model="customSizeVisible"
    title="自定义尺寸"
    width="600px"
    height="400px"
    max-height="80vh"
    @confirm="customSizeVisible = false"
    @cancel="customSizeVisible = false"
  >
    <p>自定义宽度为 600px，高度为 400px。</p>
    <p>内容区域使用 KScroll 滚动条，内容超出时自动显示滚动条。</p>
    <p v-for="i in 20" :key="i">第 {{ i }} 行：测试滚动效果。</p>
  </KDialog>
</template>

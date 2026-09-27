<script setup lang="ts">
import { ref } from 'vue'
import KDialog from '@/components/dialog/index'
import KButton from '@/components/button/index'

// 自定义样式
const customStyleVisible = ref(false)
</script>

<template>
  <div>
    <KButton type="primary" @click="customStyleVisible = true">自定义样式</KButton>
  </div>

  <KDialog
    v-model="customStyleVisible"
    title="自定义外观"
    width="480px"
    confirm-text="知道了"
    :show-cancel="false"
    @confirm="customStyleVisible = false"
  >
    <p>这个对话框使用了自定义样式：</p>
    <ul>
      <li>蓝色背景 <code>#f0f5ff</code></li>
      <li>圆角 <code>12px</code></li>
      <li>蓝色边框 <code>2px solid #0a96e6</code></li>
      <li>蓝色阴影</li>
      <li>蓝色标题</li>
    </ul>
  </KDialog>
</template>

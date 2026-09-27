<script setup lang="ts">
import { ref } from 'vue'
import KDialog from '@/components/dialog/index'
import KButton from '@/components/button/index'

// 可拖拽
const dragVisible = ref(false)
</script>

<template>
  <div class="demo-group">
    <KButton type="primary" @click="dragVisible = true">可拖拽</KButton>
  </div>

  <KDialog
    v-model="dragVisible"
    title="拖拽我"
    width="480px"
    draggable
    @confirm="dragVisible = false"
    @cancel="dragVisible = false"
  >
    <p>拖拽对话框头部任意位置移动。</p>
    <p>支持拖拽后重新计算滚动区域高度。</p>
  </KDialog>
</template>

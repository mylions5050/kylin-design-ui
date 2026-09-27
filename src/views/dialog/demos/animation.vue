<script setup lang="ts">
import { ref } from 'vue'
import KDialog from '@/components/dialog/index'
import KButton from '@/components/button/index'

// 动画
const slideVisible = ref(false)
const bounceVisible = ref(false)
</script>

<template>
  <div style="display: flex; gap: 12px; flex-wrap: wrap;">
    <KButton type="primary" @click="slideVisible = true">Slide 动画</KButton>
    <KButton type="primary" @click="bounceVisible = true">Bounce 动画</KButton>
  </div>

  <KDialog
    v-model="slideVisible"
    title="Slide 动画"
    width="480px"
    height="250px"
    animation="slide"
    @confirm="slideVisible = false"
    @cancel="slideVisible = false"
  >
    <p>从上方滑入的动画效果。</p>
  </KDialog>

  <KDialog
    v-model="bounceVisible"
    title="Bounce 动画"
    width="480px"
    height="250px"
    animation="bounce"
    @confirm="bounceVisible = false"
    @cancel="bounceVisible = false"
  >
    <p>弹性缩放入场动画效果。</p>
  </KDialog>
</template>

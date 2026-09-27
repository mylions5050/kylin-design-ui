<script setup lang="ts">
import KButton from '@/components/button/index'
import { Loading } from '@/components/loading/useLoading'

/** 全屏 spinner（默认样式） */
function showFull() {
  const loading = Loading.service({
    lock: true,
    text: '全屏加载中…',
    type: 'spinner',
    themeType: 'primary',
    opacity: 0.5,
  })
  setTimeout(() => loading.close(), 2000)
}

/** 全屏 circle 菊花 + 自定义背景色 */
function showCircle() {
  const loading = Loading.service({
    lock: true,
    text: '全屏 circle 菊花',
    type: 'circle',
    themeType: 'success',
    background: 'rgba(0, 0, 0, 0.7)',
    opacity: 0.5,
  })
  setTimeout(() => loading.close(), 2000)
}

/** 全屏 error 语义色 + 浅色遮罩 */
function showCustom() {
  const loading = Loading.service({
    lock: true,
    text: '提交中，请稍候…',
    type: 'spinner',
    themeType: 'error',
    background: 'rgba(255, 255, 255, 0.9)',
    opacity: 0.6,
  })
  setTimeout(() => loading.close(), 2000)
}
</script>

<template>
  <KButton type="primary" @click="showFull">全屏 spinner</KButton>
  <KButton type="success" @click="showCircle">全屏 circle（黑底）</KButton>
  <KButton type="error" @click="showCustom">全屏 error（白底）</KButton>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import KButton from '@/components/button/index'
import KDrawer from '@/components/drawer/index'

// 四个方向：placement 控制，size/宽高全部走默认
const visible = ref<'' | 'right' | 'left' | 'top' | 'bottom'>('')

const open = (p: 'right' | 'left' | 'top' | 'bottom') => (visible.value = p)
const close = () => (visible.value = '')

const titles: Record<string, string> = {
  right: '右侧抽屉（默认）',
  left: '左侧抽屉',
  top: '顶部抽屉',
  bottom: '底部抽屉',
}
</script>

<template>
  <div class="demo-buttons">
    <KButton type="primary" @click="open('right')">右侧（默认）</KButton>
    <KButton @click="open('left')">左侧</KButton>
    <KButton @click="open('top')">顶部</KButton>
    <KButton @click="open('bottom')">底部</KButton>
  </div>

  <KDrawer :model-value="!!visible" :title="titles[visible]" :placement="visible || 'right'" @update:model-value="close">
    <p>这是从{{ titles[visible] }}滑出的内容。</p>
    <p>遮罩淡入淡出、teleport、点击遮罩关闭都由 KOverlay 提供；面板滑入滑出用与 KDialog 相同的双 rAF 动画模式。</p>
  </KDrawer>
</template>

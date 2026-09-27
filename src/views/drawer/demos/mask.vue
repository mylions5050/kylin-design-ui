<script setup lang="ts">
import { ref } from 'vue'
import KButton from '@/components/button/index'
import KDrawer from '@/components/drawer/index'
import type { KOverlayMaskType } from '@/components/overlay/index'

// 遮罩类型：dimmed 暗色蒙层（默认）/ blur 毛玻璃（AntD v6 遮罩 demo 同款）
const visible = ref(false)
const maskType = ref<KOverlayMaskType>('dimmed')

const open = (type: KOverlayMaskType) => {
  maskType.value = type
  visible.value = true
}
</script>

<template>
  <div class="demo-buttons">
    <KButton type="primary" @click="open('dimmed')">暗色遮罩（默认）</KButton>
    <KButton type="primary" @click="open('blur')">毛玻璃遮罩</KButton>
  </div>

  <KDrawer v-model="visible" title="遮罩类型" placement="right" :mask-type="maskType">
    <p>maskType 控制遮罩类型：dimmed 为暗色蒙层（默认）；blur 为毛玻璃，蒙层背景色不变，追加 backdrop-filter: blur(4px) 把底下的页面内容模糊掉。</p>
    <p>关掉本抽屉对比两种遮罩下背景页面的呈现。</p>
  </KDrawer>
</template>

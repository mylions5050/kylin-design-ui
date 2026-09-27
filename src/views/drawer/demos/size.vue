<script setup lang="ts">
import { ref } from 'vue'
import KButton from '@/components/button/index'
import KDrawer from '@/components/drawer/index'

// size 预设（default 378 / large 736）与自定义宽高；水平方向调宽度，垂直方向调高度
const visible = ref(false)
const mode = ref<'default' | 'large' | 'custom-h' | 'custom-v'>('default')

const open = (k: 'default' | 'large' | 'custom-h' | 'custom-v') => {
  mode.value = k
  visible.value = true
}

const title: Record<string, string> = {
  default: '默认尺寸（378px）',
  large: '大尺寸（736px）',
  'custom-h': '自定义宽度（560px）',
  'custom-v': '自定义高度（300px）',
}
</script>

<template>
  <div class="demo-buttons">
    <KButton type="primary" @click="open('default')">默认 378px</KButton>
    <KButton @click="open('large')">大尺寸 736px</KButton>
    <KButton @click="open('custom-h')">宽度 560px</KButton>
    <KButton @click="open('custom-v')">高度 300px</KButton>
  </div>

  <KDrawer
    v-model="visible"
    :title="title[mode]"
    :size="mode === 'large' ? 'large' : 'default'"
    :width="mode === 'custom-h' ? 560 : undefined"
    :height="mode === 'custom-v' ? 300 : undefined"
    :placement="mode === 'custom-v' ? 'top' : 'right'"
  >
    <p>size 预设与 AntD 一致：default 378px / large 736px。</p>
    <p>自定义宽度用 width（right/left 生效），自定义高度用 height（top/bottom 生效），均支持数字或任意 CSS 长度。</p>
  </KDrawer>
</template>

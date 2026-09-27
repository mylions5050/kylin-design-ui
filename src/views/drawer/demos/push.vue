<script setup lang="ts">
import { ref } from 'vue'
import KButton from '@/components/button/index'
import KDrawer from '@/components/drawer/index'

// 多层抽屉：第二层打开时，第一层自动被推开（push 默认 180px）；ESC 只关闭最上层
// 尺寸与 AntD 官网多层抽屉 demo 一致（父层 520 / 子层 320），父层被推开后仍露出 380px 条带
const first = ref(false)
const second = ref(false)
</script>

<template>
  <div class="demo-buttons">
    <KButton type="primary" @click="first = true">打开第一层</KButton>
  </div>

  <KDrawer v-model="first" title="第一层抽屉" placement="right" :width="520">
    <p>点下方按钮打开第二层，本层会被自动推开。</p>
    <p>ESC 或点击遮罩只会关闭最上层的抽屉。</p>
    <div class="demo-buttons">
      <KButton type="primary" @click="second = true">打开第二层（本层被推开）</KButton>
    </div>
  </KDrawer>

  <KDrawer v-model="second" title="第二层抽屉" placement="right" :width="320" :overlay-z-index="2100">
    <p>第二层打开时，第一层被推开 180px（push 默认值，可用数字自定义或传 false 关闭）。</p>
    <p>关闭本层后，第一层平滑回弹。</p>
  </KDrawer>
</template>

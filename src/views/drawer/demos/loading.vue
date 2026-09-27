<script setup lang="ts">
import { ref } from 'vue'
import KButton from '@/components/button/index'
import KDrawer from '@/components/drawer/index'

// loading：打开抽屉后模拟请求，body 由 KLoading 局部加载态覆盖
const visible = ref(false)
const loading = ref(false)

const openWithLoading = () => {
  visible.value = true
  loading.value = true
  // 模拟接口请求
  setTimeout(() => {
    loading.value = false
  }, 2000)
}
</script>

<template>
  <div class="demo-buttons">
    <KButton type="primary" @click="openWithLoading">带加载态打开</KButton>
  </div>

  <KDrawer v-model="visible" title="加载态" placement="right" :loading="loading" loading-text="加载中...">
    <p>loading 为 true 时，内容区被 KLoading 局部加载态覆盖（组合复用 KLoading 的 local 模式）。</p>
    <p>请求完成后自动展示真实内容。</p>
  </KDrawer>
</template>

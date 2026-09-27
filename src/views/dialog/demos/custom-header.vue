<script setup lang="ts">
import { ref } from 'vue'
import KDialog from '@/components/dialog/index'
import KButton from '@/components/button/index'
import KIcon from '@/components/icon/index'

// 自定义 header
const customHeaderVisible = ref(false)
</script>

<template>
  <div>
    <KButton type="primary" @click="customHeaderVisible = true">自定义头部</KButton>
  </div>

  <KDialog
    v-model="customHeaderVisible"
    width="480px"
    height="300px"
    :show-close="false"
    @confirm="customHeaderVisible = false"
    @cancel="customHeaderVisible = false"
  >
    <template #title>
      <div class="custom-header">
        <KIcon name="info" size="20" color="var(--k-color-primary)" />
        <span>温馨提示</span>
      </div>
    </template>
    <p>自定义头部支持任意内容，这里使用了图标 + 文字的组合。</p>
    <p>同时也隐藏了默认的关闭按钮。</p>
  </KDialog>
</template>

<style scoped lang="scss">
.custom-header {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>

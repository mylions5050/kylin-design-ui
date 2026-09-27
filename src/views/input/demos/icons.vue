<script setup lang="ts">
import { ref } from 'vue'
import KInput from '@/components/input/index'
import KIcon from '@/components/icon/index'

const inputWithIcon = ref('')
const inputWithSuffixIcon = ref('测试用户')
</script>

<template>
  <div class="demo-group">
    <div class="demo-item">
      <label>前置图标:</label>
      <KInput v-model="inputWithIcon" prefix-icon="search" placeholder="搜索内容" />
    </div>
    <div class="demo-item">
      <label>后置图标:</label>
      <KInput v-model="inputWithSuffixIcon" suffix-icon="user" placeholder="用户名" />
    </div>
    <div class="demo-item">
      <label>Slot自定义:</label>
      <KInput placeholder="自定义图标">
        <template #prefix>
          <KIcon name="search" />
        </template>
        <template #suffix>
          <KIcon name="fabulous" />
        </template>
      </KInput>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "./common.scss";
</style>
